import React, { useState, useEffect } from "react";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "./App.css";

const useStyles = makeStyles({
    root: {
      minWidth: '30px',
      maxHeight: '40%',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  export default function RestaurantCard({data, onDelete, onSelect}) {
    const address = data.formatted_address;
    const name = data.name;
    const hours = data.opening_hours.open_now;
    const id = data.place_id;
    const icon = data.icon;
    const rating = data.rating;
    const [savedId, setId] = React.useState('');
    const classes = useStyles();

    function handleSelect() {
      onSelect(id)
    }

    function handleDelete() {
      onDelete(id)
    }
    return(
    <>
    <Card style={{marginTop: '3%',marginLeft:'1%', width:'190px', display:'inline-block', background: '#C7C1F3', borderRadius:'15px', border: '1px #001f3f solid'}}>
    <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Address: {address}
        </Typography>
        <Typography variant="h5" component="h2">
        {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Open: {hours ? ' Yes' : ' No'}<br/>
        Rating: {rating}
        </Typography> 
        <div>
          <img src={icon} />
        </div>
     </CardContent>
     <CardActions style={{justifyContent:'center', alignContent:'center'}}>
        <Button size="large" color="primary" onClick={handleSelect}>select</Button>
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
    </>
  )
}
