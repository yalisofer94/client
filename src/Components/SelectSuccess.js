import React , {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import PersistentDrawerLeft from './Navbar';
import {useHistory} from "react-router-dom";
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import "./App.css";


class SelectSuccess extends Component {
  constructor(props){
    super(props);
    this.homeBtn = this.homeBtn.bind(this);
  }

  homeBtn = () => {
    const { history } = this.props;
    if(history) history.push('/home');
  }

    render() {
      return (
        <div className="component-emoji-results">
        <PersistentDrawerLeft admin={localStorage.isAdmin} username={localStorage.userName}/>
        <Grid container alignItems="center" justify="center" spacing={0} direction="column" style={{height:'100%'}}>
         <h1>We Got Your Request!</h1>
         <span>
          <h2>Results will receive shortly</h2>
          <Button onClick={this.homeBtn} variant="contained"  style={{marginLeft: "40%", fontSize: "large", borderRadius: '15px'}}><HomeIcon/>Home</Button>
         </span>
         </Grid>
        </div>
      );
    }
  }

  export default SelectSuccess;