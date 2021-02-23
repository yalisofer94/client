import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import ReactRouter from '../Router/router';
import UserContext from '../UserContext';
import Footer from "./Footer";
import Logo from './Logo'
const App = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(0);
  const value = { userName , setUserName, userId, setUserId};
  
  return (
    <div>
      <UserContext.Provider value = {value}>
        <Logo/>
        <ReactRouter/>
        <Footer/>
      </UserContext.Provider>
    </div>
  )
}
export default App;