import React from "react";
import { useState, useEffect } from 'react';
import PersistentDrawerLeft from './Navbar';
import MyTimer from "./Timer";
import Axios from 'axios';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import {useHistory} from "react-router-dom";
import "./App.css";

export default function Game() {
  const history = useHistory();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    async function bringGame() {
      const res = await Axios.get(`https://bite-me-app1.herokuapp.com/api/game/`);
      const games = res?.data?.game;
      setDuration(res?.data?.duration);
      setDatas(games);
      setLoading(false); 
    }
    bringGame();
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < datas.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      // sending game score + userId to backend
      Axios({
        method: "POST",
        withCredentials: false,
        url: `https://bite-me-app1.herokuapp.com/api/order/userScores`,
            data: {
              user_id: localStorage.userId,
              score: score,
            },
      }).then((res)=> {})
      .catch((err) => {console.log(err)})
    }
  };

  const Home = () => {
    // history.push('/home');
    if(history) history.push('/home');
  };


  return (
    <>
      {!duration ? <h2 style={{textAlign: 'center', fontSize: '50px'}}>Loading</h2> :
        <>
          <PersistentDrawerLeft admin={localStorage.isAdmin} username={localStorage.userName}/>
          <div style={{background: '#bdeaee'}}>
            <h2 style={{ textAlign: 'center', fontSize: '70px'}}>Time left<MyTimer onChange={duration} duration={duration} /></h2>
            <div className="game-pic">
            <Grid container alignItems="center" justify="center" spacing={0} direction="column" style={{height:'100%'}}>                        
            <div className='app'>
              {loading ? <h2>Loading</h2> :
                <div style={{textAlign: 'center', fontSize: '20px', width: '600px', marginBottom: '3%'}}>
                  {showScore ? (
                    <div className='score-section'>
                      You scored {score} out of {datas.length}
                      <Button variant="contained" onClick={Home} style={{marginLeft: "40%", fontSize: "large", borderRadius: '15px'}}><HomeIcon/>Home</Button>
                    </div>
                      ) : (
                      <>
                          <div className='question-section'>
                            <div className='question-count'>
                              <span>Question {currentQuestion + 1}/</span>{datas.length}
                            </div>
                            <div className='question-text'>{datas[currentQuestion].question}</div>
                          </div>
                          <div className='answer-section'>
                            {datas[currentQuestion].options.map((option, i) => (
                            <button className='ans_button' key={i} onClick={() => handleAnswerOptionClick(option.isCorrect)}>{option.answer}</button>
                            ))}
                          </div>
                      </>
                    )}
                </div>
              }
            </div>
          </Grid>
          </div>
        </div>
      </>
      }
    </>
  );
}