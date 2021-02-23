import React, {useContext, useEffect} from 'react';
import {Route} from 'react-router-dom';
import Login from './../Components/LogIn';
import Home from './../Components/Home';
import Game from './../Components/Game';
import Register from './../Components/Register';
import SelectSuccess from './../Components/SelectSuccess';
import GameForm3 from './../Components/GameForm3';
import GamesListing from './../Components/GamesList';
import DeleteSuccess from './../Components/DeleteSuccess';

const ReactRouter = () => {
    return(
        <>
            <Route exact path='/' component={Login}/>
            <Route path='/home' component={Home}/>
            <Route path='/selectSuccess' component={SelectSuccess}/>
            <Route path='/DeleteSuccess' component={DeleteSuccess}/>
            <Route path='/register' component={Register}/>
            <Route path='/addGame' component={GameForm3}/>
            <Route path='/game/' component={Game}/>
            <Route path='/gamesView' component={GamesListing}/>
        </>
    )
}

export default ReactRouter;