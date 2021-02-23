import React, { useState, useEffect } from "react";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import "./App.css";


const useStyles = makeStyles({
    root: {
      minWidth: '30px',
      maxHeight: '40%',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  // TODO THE CARD THING
//   const sendChosenRestaurant = () => {
//     Axios
//         .post('')
//         .then((response) => {console.log(response); res.json(response.data);})
//         .catch(err => console.log(`Error is: ${err}`));
// }

  export default function GamesCard({data, onDelete}) {
    // console.log("The data",data);
    // console.log("this", data._id);
    const gameId = data._id;
    const id = data.id;
    const question = data.game[0].question;


  
    const classes = useStyles();


    function handleDelete() {
      alert(`You just Deleted Game ${id}`);
      onDelete(id)
    }
    return(
    <>
    <Card style={{marginTop: '3%',marginLeft:'1%', width:'250px', display:'inline-block', background: '#C7C1F3', borderRadius:'15px', border: '1px #001f3f solid'}}>
    <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        Game ID: {id}
        </Typography>
        <Typography variant="h5" component="h2">
        Question:  {question}
        </Typography>
     </CardContent>
     <CardActions style={{justifyContent:'center', alignContent:'center'}}>
        {/* <Button size="large" color="primary" onClick={handleSelect}>select</Button> */}
        <IconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
    </>
  )
}
