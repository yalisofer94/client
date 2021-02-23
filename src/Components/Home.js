import React, { Component, useContext , componentDidMount} from "react";
import MapContainer from './Map';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PersistentDrawerLeft from './Navbar';
import Axios from "axios";
import CardsListing from './CardsListing';
import "./App.css";

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
          inputField : "",
          rests_data: [],
          username: localStorage.userName,
          userid : localStorage.userId,
          admin: localStorage.isAdmin,
          lng: 34.7818 ,
          lat: 32.0853
        }
      
        this.logout = this.logout.bind(this);
        this.sendRest = this.sendRest.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSelectClick = this.handleSelectClick.bind(this);
    }

    logout = () => {
      Axios({
        method: "GET",
        withCredentials: true,
        url: "https://bite-me-app1.herokuapp.com/api/user/logout",
    }).then((res) => {
        if(res.data.msg === "User logged-out"){
            window.location = '/login';
        }
        else{ 
            window.location = '/';
        } 
    });
    }

    handleChange(event) {
      this.setState({inputField: event.target.value});
    }

    handleDeleteClick = (e) => {
      const newRests = this.state.rests_data.filter(
        (rest) => rest.place_id !== e
      );
      this.setState({
        rests_data: newRests
    })
    };

    handleSelectClick = (e) => {
      const rest = this.state.rests_data.filter((rest) => rest.place_id === e);
      if(rest !== null){
        Axios({
          method: "POST",
          withCredentials: false,
          url: `https://bite-me-app1.herokuapp.com/api/order`,
              data: {
                user_id: localStorage.userId,
                restaurant_id: rest[0].place_id,
                restaurant_name: rest[0].name,
              },
        }).then((res)=> {
            const { history } = this.props;
            const answer = res.data;
            if(answer == "user already ordered")
              alert("You've already ordered!")
              if(history) history.push('/home');
            if(answer == "Successfully added to existing order")
              alert("The order successfully added to the existing group order!")
              if(history) history.push('/selectSuccess');
            if(answer == "Successfully created new order")
              alert("The order successfully added! You are hungry for sure, you are the first person in the team to order!🍽🍴")
              if(history) history.push('/selectSuccess');
        }).catch((err) => {
            console.log(err);
        })
      } else {
        console.log("Issue occurred while trying to send the selected restaurant!");
      }
    }

    sendRest = (e) => {
      if (this.state.rests_data.length < 4) {
      Axios({
        method: "GET",
        withCredentials: false,
        url: `https://bite-me-app1.herokuapp.com/api/restaurantAPI?restName=${this.state.inputField}` //`https://bite-me-app1.herokuapp.com/api/restaurantAPI?restName=${this.state.inputField}`,
    }).then((res) => {
        if(res.status === 200 && res.data.candidates[0].opening_hours.open_now !== null){
            const lat = res.data.candidates[0].geometry.location.lat;
            const lng = res.data.candidates[0].geometry.location.lng;
            this.setState({
              lat: res.data.candidates[0].geometry.location.lat,
              lng: res.data.candidates[0].geometry.location.lng
          })
            let myArr= [...this.state.rests_data]
              myArr.push(res.data.candidates[0])
              this.setState({
                rests_data: myArr
            })
        }
        else{ 
            alert("Something wrong happened! \nStatus - ", res.status);
        }
        
    }).catch((err) => {
      alert(`You've entered a bad restaurant name, '${this.state.inputField}' does not exist 😖, try again!`);
    });
    }else {
      alert("The maximum number of restaurants are 4! 😇");
    }}

      render() {
          return(
              <>
              <PersistentDrawerLeft admin={this.state.admin} username={this.state.username}/>
              <div className="home-content">
              <Grid container alignItems="center" justify="center" spacing={0} direction="column">
              <Grid item xl></Grid>
              <Grid item xl={8}>
                <h1 style={{marginTop: '5%', color:'#FDF8F5'}}><strong>FULFILL YOUR DESIRE</strong></h1>
                  <Grid>
                    <form style={{justifyContent: 'center', textAlign: 'center'}}> 
                      <input type="text" style={{backgroundColor:'white', width: '70%', height: '40px', marginTop: '3%', borderRadius:'15px', paddingLeft: '2%'}} onChange={this.handleChange}  placeholder="  Enter restaurant..." />
                      <Button onClick={this.sendRest} variant="contained" color="primary" style={{width:'10%', height:'40px', marginLeft: '0.9%', borderRadius:'15px'}}><b>Search</b></Button>
                      {this.state.rests_data.length === 0 && (<h2 style={{ paddingTop: 10, textAlign: 'center', color: '#FDF8F5' }}>No Restaurants to show</h2>)} 
                      <CardsListing rests={this.state.rests_data} onDelete={this.handleDeleteClick} onSelect={this.handleSelectClick}/>
                    </form>
                  </Grid>
              </Grid>
            </Grid>
            </div>
          <MapContainer lat={this.state.lat} lng={this.state.lng}/>
              <Grid style={{paddingTop:'0.3%'}}>
              <h1 style={{justifyContent: 'center', textAlign: 'center'}}>LET THE FUN BEGIN</h1>
              </Grid>
          </>
          )
    }
}

export default Home;