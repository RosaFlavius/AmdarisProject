import './App.css';
import axios from "axios"
import React from 'react';
import Home from './Pages/Home';
import ListOfProducts from './Pages/ListOfProducts';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

//   const getUser = () => {
//     axios.get("https://localhost:7177/api/User").then(
//       res =>{
//         console.log(res);
//       }
//     )
// }
  return (
    // <div className="App">

    //   <button onClick={getUser}>Get users</button>
    // </div>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products" element={<ListOfProducts/>}/>
      </Routes>
    </Router>
    
  
  );
}

export default App;
