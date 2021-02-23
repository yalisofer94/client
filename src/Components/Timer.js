import { useState, useEffect } from 'react';
import {useTimer} from 'react-timer-hook';
import { duration } from '@material-ui/core';
import {useHistory} from "react-router-dom";
import React from 'react';

function MyTimer({ expiryTimestamp}) {
  const {
      seconds,
      minutes
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
  
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{fontSize: '100px'}}>
          <span>{minutes}</span>:<span>{seconds}</span>
        </div>
      </div>
    );
  }

  export default function setTime({duration}) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + (!duration ? 60: (60 * duration)));
    return (
      <div>
        <MyTimer  expiryTimestamp={time} />
      </div>
    );
  }

