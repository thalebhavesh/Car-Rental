import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavigationBar from './component/navbar/NavigationBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Model from './component/Model/Model';
import Home from './Pages/Home';
import About from './component/About/About';
import Contact from './component/Contact/Contact';
import CarRegistration from './component/BookCars/CarRegistration';
import ShowData from './component/ShowData/ShowData';

function App() {
 
  return (
    <Router>
    <div className="App">
    <NavigationBar  />
    <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="models" element={<Model/>} />
        <Route path="about" element={<About/>} />
        <Route path="contact" element={<Contact/>} />
        <Route path="/registercar" element={<CarRegistration />}/>
        <Route path="/showdata" element={<ShowData />} />
      </Routes>
  
  </div>
  </Router>
  );
}

export default App;
