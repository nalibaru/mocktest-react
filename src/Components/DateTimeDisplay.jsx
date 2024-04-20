import React, { useState, useEffect } from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { setCurrentDay } from '../redux/timeslice';
const DateTimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date());
            dispatch(setCurrentDay(currentDateTime.toLocaleDateString(undefined, { weekday: 'long' })));
        }, 1000);
        return () => clearInterval(timer);
    }, [])
    
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString();
    };

    return (
        <div className="timerdisplay">
            <h3>Current Date and Time</h3>
            <p>Date: {formatDate(currentDateTime)}</p>
            <p>Day: {currentDateTime.toLocaleDateString(undefined, { weekday: 'long' })}</p>
            <p>Time: {formatTime(currentDateTime)}</p>
        </div>
    );
};

export default DateTimeDisplay;