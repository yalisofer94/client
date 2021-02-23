import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GamesIcon from '@material-ui/icons/Games';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import {useHistory} from "react-router-dom";
import MenuItem from '@material-ui/core/MenuItem';
import Axios from "axios";
import Button from '@material-ui/core/Button';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function PersistentDrawerLeft(props) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

const randEmoji = () => {
    const emojis = ['🍔','🍕','🌶','🍩','🌭','🥨','🥦', '🍜', '🍿', '🥡','🍱','🍉','🍍','🥙','🍝' ];
    return `BiteMe ${emojis[Math.floor(Math.random() * (emojis.length - 1) + 1)]}`;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logout = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "https://bite-me-app1.herokuapp.com/api/login/",
  }).then((res) => {
      if(res.data === "logged out?"){
          localStorage.clear()
          window.location = '/';
      }
      else{ 
          alert("Error occurred!")
    }});
  }
  const addGamePath = () => {
    history.push({pathname: '/addGame'});
  }
  const deleteGame = () => {
    history.push({pathname: '/gamesView'});
  }
  const PlayGamePath = () => {
    history.push({pathname: '/game'});
  }

  return (
    <div className={classes.root}>
        <CssBaseline />
        <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap style={{ width: '100%'}}>
            <Toolbar 
            >
            <Typography variant="h6" className={classes.title}>
                {randEmoji()}
            </Typography>
            <Typography variant="h6" className={classes.title}>
                Hello, {props.username}!
            </Typography>
            <Button style={{position: 'absolute', right: '0px'}} onClick = {logout} color="inherit">Logout</Button>
            </Toolbar>
        </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
        <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>  
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </div>
        <Divider />
        <List>
        <MenuItem onClick={PlayGamePath}><GamesIcon/><ListItemText>Play Game</ListItemText></MenuItem> 
        { props.admin && <MenuItem onClick={addGamePath}><AddIcon/><ListItemText>Create Game</ListItemText></MenuItem> }
        { props.admin && <MenuItem onClick={deleteGame}><EditIcon/><ListItemText>Delete Game</ListItemText></MenuItem> }
        </List>
        </Drawer>
    </div>
  );
}
