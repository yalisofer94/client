import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Axios from "axios";
import PersistentDrawerLeft from './Navbar';
import "./App.css";

const GameForm = () => {
    let num = 0;
    let quest = "";
    let anst1 = "";
    let anst2 = "";
    let anst3 = "";
    let anst4 = "";
    let btnValue = "";
    const [currentStep, setCurrentStep] = useState(0);
    const [question1, setQuestion1] = useState('');
    const [ready, setReady] = useState(false);
    const [answer11, setAnswer11] = useState('');
    const [answer12, setAnswer12] = useState('');
    const [answer13, setAnswer13] = useState('');
    const [answer14, setAnswer14] = useState('');

    const [choose11, setChoose11] = useState(false);
    const [choose12, setChoose12] = useState(false);
    const [choose13, setChoose13] = useState(false);
    const [choose14, setChoose14] = useState(false);
    // Button value state
    const [buttonValue1, setButtonValue1] = useState("");
    // Game duration state
    const [durationss, setDuration] = useState(0);

    // Game state
    const [questionNum1, setQuestionNum1] = useState({});
    const [questionNum2, setQuestionNum2] = useState({});
    const [questionNum3, setQuestionNum3] = useState({});
    const [questionNum4, setQuestionNum4] = useState({});
    const [questionNum5, setQuestionNum5] = useState({});


    const gameForEntry = [];

    async function sendForm(e) {
        const game = {
            duration: durationss,
            game: [questionNum1, questionNum2, questionNum3, questionNum4, questionNum5],
        };

        console.log(game);
        Axios({
            method: "POST",
            data: {
                game: game
            },
            withCredentials: true,
            url: "https://bite-me-app1.herokuapp.com/api/game",
        }).then((res) => {
            if (res.status === 200) {
                window.location = '/home';
            }
        }).catch(err => console.log(err));
    }

    const inputChange = (info) => {
        let { name, value, value1 } = info.target;
        console.log(name, value, value1);
        console.log(this.state);
    }

    // Entering duration (First step) 
    const durationClick = (e) => {
        setDuration(num);
        setCurrentStep(currentStep + 1);
    }

    async function checkRadioButtons(e) {
        if (btnValue !== '' && quest !== '' && anst1 !== '' && anst2 !== '' && anst3 !== '' && anst4 !== '') {
            console.log("In checkRadioButtons - ", btnValue.length, "C".length, quest, anst1, anst2, anst3, anst4)
            setButtonValue1(btnValue);
            setChoose11(btnValue == "A");
            setChoose12(btnValue == "B");
            setChoose13(btnValue == "C");
            setChoose14(btnValue == "D");
            setQuestion1(quest);
            setAnswer11(anst1);
            setAnswer12(anst2);
            setAnswer13(anst3);
            setAnswer14(anst4);
            console.log("In CheckRadioButtons1 - ", buttonValue1, question1, answer11, answer12, answer13, answer14);
            setReady(true);
        } else { console.log("Trying to enter empty strings!") }
        return;
    };

    async function onClickQuestion() {
        await checkRadioButtons();
        if (ready) {
            if (question1 && answer11 && answer12 && answer13 && answer14) {

                const q = {
                    question: question1,
                    options: [
                        {
                            answer: answer11,
                            isCorrect: choose11
                        },
                        {
                            answer: answer12,
                            isCorrect: choose12
                        },
                        {
                            answer: answer13,
                            isCorrect: choose13
                        },
                        {
                            answer: answer14,
                            isCorrect: choose14
                        }]
                }

                if (currentStep === 1) {
                    setQuestionNum1(q);
                    setCurrentStep(currentStep + 1);
                }
                if (currentStep === 2) {
                    setQuestionNum2(q);
                    setCurrentStep(currentStep + 1);
                }
                if (currentStep === 3) {
                    setQuestionNum3(q);
                    setCurrentStep(currentStep + 1);
                }
                if (currentStep === 4) {
                    setQuestionNum4(q);
                    setCurrentStep(currentStep + 1);
                }
                if (currentStep === 5) {
                    setQuestionNum5(q);
                    setCurrentStep(currentStep + 1);
                }
                console.log(questionNum1, questionNum2, questionNum3, questionNum4, questionNum5);

                setReady(false);
            } else {
                alert("Fill all field!");
            };
        }
    }

    const Step0 = (props) => {
        if (currentStep !== 0) {
            return null
        }
        return (
            <>
                <div style={{ height: '400px', marginTop: '30%' }}>
                    <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                        <label style={{color: 'white',   fontSize: '20px' }}>Game Duration: </label>
                        <form >
                            <TextField container  alignItems="center" justify="center" spacing={0} direction="column"
                                id="filled-number"
                                label="minutes"
                                type="number"
                                style={{backgroundColor: 'white', width: '100%' }}
                                onChange={(e) => num = e.target.value}
                                inputProps={{ min: "5", max: "15", step: "1" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="filled"
                            />
                            <Button variant="contained" color="primary" onClick={durationClick} style={{ width: '10%', height: '40px', marginBottom: '10%', marginLeft: '24%', marginTop: '10%', borderRadius: '15px' }}><b>NEXT</b></Button>
                        </form>
                    </Grid>
                </div>
            </>
        )
    }

    const Step1 = (props) => {

        if (currentStep !== 1) {
            return null
        }
        return (
            <div style={{ height: '400px' }}>
                <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                    <form>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Question {currentStep}: </label>
                        <TextField type="text" name='question1' onChange={(e) => quest = e.target.value} style={{ backgroundColor: 'white', width: '80%', height: '25px' }} placeholder="Highest building in the world.." />
                        <div style={{ marginTop: '3%' }}>
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer A: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} name='answer1' onChange={(e) => anst1 = e.target.value} placeholder="text" />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer B: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst2 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer C: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst3 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer D: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst4 = e.target.value} />
                        </div>
                        <FormControl style={{ backgroundColor: 'white', marginTop: '1%' }} component="fieldset">
                            <InputLabel  id="Gender">Answer{currentStep}</InputLabel>
                            <Select
                                labelId="Gender"
                                id="Gender"
                                defaultValue={"A"}
                                onChange={e => btnValue = e.target.value}
                                fullWidth
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <MenuItem value={"D"}>D</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={onClickQuestion} style={{ alignContent: 'center', width: '10%', height: '40px', marginBottom: '10%', borderRadius: '15px', marginTop: '8%' }}><b>NEXT</b></Button>
                    </form>
                </Grid>
            </div>
        )
    }
    const Step2 = (props) => {
        if (currentStep !== 2) {
            return null
        }
        return (
            <div style={{ height: '400px' }}>
                <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                    <form>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Question {currentStep}: </label>
                        <TextField type="text" name='question1' onChange={(e) => quest = e.target.value} style={{ backgroundColor: 'white', width: '80%', height: '25px' }} placeholder="Highest building in the world.." />
                        <div style={{ marginTop: '3%' }}>
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer A: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} name='answer1' onChange={(e) => anst1 = e.target.value} placeholder="text" />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer B: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst2 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer C: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst3 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer D: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst4 = e.target.value} />
                        </div>
                        <FormControl style={{backgroundColor: 'white', marginTop: '1%' }} component="fieldset">
                            <InputLabel id="Gender">Answer{currentStep}</InputLabel>
                            <Select
                                labelId="Gender"
                                id="Gender"
                                defaultValue={"A"}
                                onChange={e => btnValue = e.target.value}
                                fullWidth
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <MenuItem value={"D"}>D</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={onClickQuestion} style={{ alignContent: 'center', width: '10%', height: '40px', marginBottom: '10%', borderRadius: '15px', marginTop: '8%' }}><b>NEXT</b></Button>
                    </form>
                </Grid>
            </div>
        )
    }
    const Step3 = (props) => {
        if (currentStep !== 3) {
            return null
        }
        return (
            <div style={{ height: '400px' }}>
                <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                    <form>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Question {currentStep}: </label>
                        <TextField type="text" name='question1' onChange={(e) => quest = e.target.value} style={{ backgroundColor: 'white', width: '80%', height: '25px' }} placeholder="Highest building in the world.." />
                        <div style={{ marginTop: '3%' }}>
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer A: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} name='answer1' onChange={(e) => anst1 = e.target.value} placeholder="text" />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer B: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst2 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer C: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst3 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer D: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst4 = e.target.value} />
                        </div>
                        <FormControl style={{backgroundColor: 'white', marginTop: '1%' }} component="fieldset">
                            <InputLabel id="Gender">Answer{currentStep}</InputLabel>
                            <Select
                                labelId="Gender"
                                id="Gender"
                                defaultValue={"A"}
                                onChange={e => btnValue = e.target.value}
                                fullWidth
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <MenuItem value={"D"}>D</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={onClickQuestion} style={{ alignContent: 'center', width: '10%', height: '40px', marginBottom: '10%', borderRadius: '15px', marginTop: '8%' }}><b>NEXT</b></Button>
                    </form>
                </Grid>
            </div>
        )
    }

    const Step4 = (props) => {
        if (currentStep !== 4) {
            return null
        }
        return (
            <div style={{ height: '400px' }}>
                <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                    <form>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Question {currentStep}: </label>
                        <TextField type="text" name='question1' onChange={(e) => quest = e.target.value} style={{ backgroundColor: 'white', width: '80%', height: '25px' }} placeholder="Highest building in the world.." />
                        <div style={{ marginTop: '3%' }}>
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer A: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} name='answer1' onChange={(e) => anst1 = e.target.value} placeholder="text" />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer B: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst2 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer C: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst3 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer D: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst4 = e.target.value} />
                        </div>
                        <FormControl style={{backgroundColor: 'white', marginTop: '1%' }} component="fieldset">
                            <InputLabel id="Gender">Answer{currentStep}</InputLabel>
                            <Select
                                labelId="Gender"
                                id="Gender"
                                defaultValue={"A"}
                                onChange={e => btnValue = e.target.value}
                                fullWidth
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <MenuItem value={"D"}>D</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={onClickQuestion} style={{ alignContent: 'center', width: '10%', height: '40px', marginBottom: '10%', borderRadius: '15px', marginTop: '8%' }}><b>NEXT</b></Button>
                    </form>
                </Grid>
            </div>
        )
    }

    const Step5 = (props) => {
        if (currentStep !== 5) {
            return null
        }
        return (
            <div style={{ height: '400px' }}>
                <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                    <form>
                        <label style={{color: 'white', fontWeight: 'bold'}}>Question {currentStep}: </label>
                        <TextField type="text" name='question1' onChange={(e) => quest = e.target.value} style={{ backgroundColor: 'white', width: '80%', height: '25px' }} placeholder="Highest building in the world.." />
                        <div style={{ marginTop: '3%' }}>
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer A: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} name='answer1' onChange={(e) => anst1 = e.target.value} placeholder="text" />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer B: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst2 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer C: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst3 = e.target.value} />
                            <label style={{color: 'white', fontWeight: 'bold'}}>Answer D: </label>
                            <TextField style={{backgroundColor: 'white', height: '25px' }} placeholder="text" onChange={(e) => anst4 = e.target.value} />
                        </div>
                        <FormControl style={{backgroundColor: 'white', marginTop: '1%' }} component="fieldset">
                            <InputLabel id="Gender">Answer{currentStep}</InputLabel>
                            <Select
                                labelId="Gender"
                                id="Gender"
                                defaultValue={"A"}
                                onChange={e => btnValue = e.target.value}
                                fullWidth
                            >
                                <MenuItem value={"A"}>A</MenuItem>
                                <MenuItem value={"B"}>B</MenuItem>
                                <MenuItem value={"C"}>C</MenuItem>
                                <MenuItem value={"D"}>D</MenuItem>
                            </Select>
                        </FormControl>
                        <Button variant="contained" color="primary" onClick={onClickQuestion} style={{ alignContent: 'center', width: '10%', height: '40px', marginBottom: '10%', borderRadius: '15px', marginTop: '8%' }}><b>NEXT</b></Button>
                    </form>
                </Grid>
            </div>
        )
    }

    const Step6 = (props) => {
        if (currentStep !== 6) {
            return null
        }
        return (
            <>
                <div style={{ height: '400px' }}>
                    <Button variant="contained" color="primary" onClick={sendForm} style={{ alignContent: 'center', width: '10%', height: '40px', marginBottom: '10%', borderRadius: '15px', top: '10%' }}><b>CREATE</b></Button>
                </div>
            </>
        )
    }
    return (
        <>
           <PersistentDrawerLeft admin={localStorage.isAdmin} username={localStorage.userName}/>
            <div className="home-content" >
                <Grid container alignItems="center" justify="center" spacing={0} direction="column">
                    <h1 style={{color: "white", paddingBottom:'2%', marginTop: '3%'}}>Add New Game</h1>
                    <form>
                        <Step0
                            currentStep={currentStep}
                        />
                        <Step1
                            currentStep={currentStep}
                            handleChange={inputChange}
                        />
                        <Step2
                            currentStep={currentStep}
                            handleChange={inputChange}
                        />
                        <Step3
                            currentStep={currentStep}
                            handleChange={inputChange}
                        />
                        <Step4
                            currentStep={currentStep}
                            handleChange={inputChange}
                        />
                        <Step5
                            currentStep={currentStep}
                            handleChange={inputChange}
                        />
                        <Step6
                            currentStep={currentStep}
                            handleChange={inputChange}
                        />
                    </form>
                </Grid>
            </div>
        </>
    );
}


export default GameForm;