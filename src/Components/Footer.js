import React, { Component } from "react";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import "./App.css";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

const styles = theme => ({
  footer: {
    backgroundColor: "#8CD1F6",
    color: "white",
    position: "absolute",
    left: "0",
    bottom: "1",
    height: "18vh",
    width: "100vw"
}});

class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.footer}>
        <Grid container className="bg-footer">
            <Grid item md={2}></Grid>
              <Grid item md={3}>
                <div className="footer-top">
                  <h3>BiteMe 🍔 🥦</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <a href="#">BiteMe Careers</a>
                    </li>
                    <li>
                      <a href="#">Kosher Website</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                    <li>
                      <a href="#">FAQ'S</a>
                    </li>
                    <li>
                      <a href="#">How It Works?</a>
                    </li>
                  </ul>
                </div>
                </Grid>
                <Grid item md={2}></Grid>
              
              <Grid item md={3}>
                <div className="footer-top">
                  <h3>Connect 📞</h3>
                </div>
                <div className="footer-list">
                  <ul className="social">
                    <li>
                      <a href="#">
                        <InstagramIcon/>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <FacebookIcon/>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <TwitterIcon/>
                      </a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <span>03-6432223, Tel-Aviv</span>
                    </li>
                    <li>
                      <span>info@BiteMe.com</span>
                    </li>
                  </ul>
                </div>
                </Grid>
                <Grid item md={2}></Grid>
          </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);