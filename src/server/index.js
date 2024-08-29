const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize SQLite database
const dbPath = path.resolve(__dirname, 'carrental.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    carType TEXT,
    pickUp TEXT,
    dropOff TEXT,
    pickTime TEXT,
    dropTime TEXT,
    carImg TEXT,
    name TEXT,
    lastName TEXT,
    phone TEXT,
    age INTEGER,
    email TEXT,
    address TEXT,
    city TEXT,
    zipcode TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    imagePath TEXT,
    details_id INTEGER,
    FOREIGN KEY(details_id) REFERENCES car_details(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS car_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    price INTEGER,
    seats TEXT,
    fuel TEXT
  )`);

});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('image'), (req, res) => {
  const { name, price, seats, fuel } = req.body;
  const imagePath = `/uploads/${req.file.filename}`;

  db.run(`INSERT INTO car_details (price, seats, fuel) VALUES (?, ?, ?)`, [price, seats, fuel], function(err) {
    if (err) {
      console.error('Error storing data:', err);
      return res.status(500).json({ message: 'Error storing data' });
    }
    const details_id = this.lastID;

    const stmt = db.prepare(`INSERT INTO cars (name, imagePath, details_id) VALUES (?, ?, ?)`);
    stmt.run(name, imagePath, details_id, (err) => {
      if (err) {
        console.error('Error storing data:', err);
        res.status(500).json({ message: 'Error storing data' });
      } else {
        res.status(200).json({ message: 'Car added successfully' });
      }
    });
    stmt.finalize();
  });
});

app.get('/cars', (req, res) => {
  db.all(`SELECT cars.id, cars.name, cars.imagePath, car_details.price, car_details.seats, car_details.fuel 
          FROM cars 
          JOIN car_details ON cars.details_id = car_details.id`, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get('/cars', (req, res) => {
  db.all(`SELECT * FROM cars`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get('/data', (req, res) => {
  const query = `
    SELECT bookings.id, bookings.carType, bookings.pickUp, bookings.dropOff, bookings.pickTime, bookings.dropTime,
           bookings.name, bookings.lastName, bookings.phone, bookings.age, bookings.email, bookings.address, bookings.city, bookings.zipcode,
           cars.name AS carName, cars.imagePath,
           car_details.price, car_details.seats, car_details.fuel
    FROM bookings
    JOIN cars ON bookings.carType = cars.name
    JOIN car_details ON cars.details_id = car_details.id;
  `;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ message: 'Error fetching data' });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.post('/bookcar', (req, res) => {
  const {
    carType, pickUp, dropOff, pickTime, dropTime, carImg,
    name, lastName, phone, age, email, address, city, zipcode
  } = req.body;

  const stmt = db.prepare(`INSERT INTO bookings (
    carType, pickUp, dropOff, pickTime, dropTime, carImg,
    name, lastName, phone, age, email, address, city, zipcode
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

  stmt.run(
    carType, pickUp, dropOff, pickTime, dropTime, carImg,
    name, lastName, phone, age, email, address, city, zipcode,
    (err) => {
      if (err) {
        res.status(500).json({ message: 'Error storing data' });
      } else {
        res.status(200).json({ message: 'Booking confirmed' });
      }
    }
  );

  stmt.finalize();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
