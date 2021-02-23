import React ,{ useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import GoogleLogin from 'react-google-login';
import UserContext from '../UserContext';
import {useHistory} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import "./App.css";

function Login() {
    const history = useHistory();
    const {userName, setUserName, userId, setUserId} = useContext(UserContext);
  
    React.useEffect(() => {
      const savedId = String(localStorage.getItem(userId) || '');
      const savedName = String (localStorage.getItem(userName) || '');
      setUserName(savedName);
      setUserId(savedId);
    }, [])
    
    useEffect(() => {
      if(userName !== '' && userId !== 0){
        let path = '/home';
        history.push({
          pathname: path,
          userId: localStorage.getItem(userId),
          userName: userName
        });
      }}, [userName, userId]);

      const handleLogin = async googleData => {
        const res = await fetch("https://bite-me-app1.herokuapp.com/api/login", {
            method: "POST",
            body: JSON.stringify({
            token: googleData.tokenId,
          }),
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        if(res.status === 200){
          if(data === "User don't exist"){
            history.push({
              pathname: '/register'
            });
          } else {
            setUserName(data.username);
            setUserId(data.id);
            localStorage.setItem("userId", data.id)
            localStorage.setItem("userName", data.username)
            localStorage.setItem("isAdmin", data.admin)
          }
        } else {
          alert("Some error occurred");
        }
      }
      
        return(
            <div>
                    <div className="home-content">
                        <Grid container alignItems="center" justify="center" spacing={0} direction="column" style={{height:'100%'}}>
                            <div  style={{alignContent: 'center', justifyContent: 'center'}}>
                            <h1 style={{marginBottom:'25%', color:'#FDF8F5'}}>Login Your Account</h1>
                            <div style={{marginLeft: "37%", marginTop:'0.5%',justifyContent: 'center'}}>    
                            <GoogleLogin
                            clientId='102550194646-3l50npk3904rspfubhe612nttft9nt36.apps.googleusercontent.com'
                            buttonText="Log in with Google"
                            onSuccess={handleLogin}
                            onFailure={handleLogin}
                            cookiePolicy={'single_host_origin'}
                            />
                            </div>
                            </div>
                            <NavLink to='/register'>
                              <Button>register</Button>
                              {/* <a style={{marginTop:'1%', color:'black', fontSize:'15px'}}>Want to <strong>Register?</strong></a> */}
                            </NavLink>
                        </Grid>
                    </div>
            </div>    
        )
}

 export default Login;