import React, { useEffect, useState,useCallback } from "react";
import { useSelector } from 'react-redux';

function TodaySchedule() {
    const [finalData, setFinalData] = useState([]);
    const actualData = useSelector((state) => state.timetable.data);
    const presentDay = useSelector((state) => state.timetable.currentDay);

    const SimulateStatusbasedOnCurrentTime = useCallback(() => {
        setFinalData((currentData) => {
            return currentData.map((element) => {
                const currentTimeString = formatTime(new Date()).slice(0, 11); 
                const courseTime = element.time; 
                const diff = calculateTimeDifference(currentTimeString, courseTime);
                if (diff === 0) {
                    return { ...element, message: 'Starting now' };
                } else if (diff < 0) {
                    return { ...element, message: 'over' };
                } else {
                    const hours = Math.floor(diff / 60);
                    const minutes = diff % 60;
                    const timeString = `${hours > 0 ? hours + ' hour(s) ' : ''}${minutes} minute(s)`;
                    return { ...element, message: `Going to happen in ${timeString}` };
                }
            });
        });
    }, [calculateTimeDifference,convertTo24HourFormat]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Your fetch logic...
                const currentDay = presentDay;
                const filteredData = actualData.filter(item => item.day === currentDay);
                setFinalData(filteredData);
                SimulateStatusbasedOnCurrentTime();
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [actualData,presentDay,SimulateStatusbasedOnCurrentTime]); 
    

    const formatTime = (date) => {
        return date.toLocaleTimeString();
    };

    function convertTo24HourFormat(time,type) {
        const [timePart, modifier] = time.split(' ');
        let [hours, minutes] = [];
        if (type === 'course')
        {
             [hours, minutes] = timePart.split('.').map(Number); 
        }
        else {
             [hours, minutes] = timePart.split(':').map(Number);
        }
        if (hours === 12) {
            hours = modifier.toUpperCase() === 'AM' ? 0 : 12;
        } else if (modifier.toUpperCase() === 'PM') {
            hours += 12;
        }
        return { hours, minutes };
    } 
    
    function calculateTimeDifference(currenttime1, coursetime2) {
        let { hours: currenthours1, minutes: currentminutes1 } = convertTo24HourFormat(currenttime1,"current");
        let { hours: coursehours2, minutes: courseminutes2 } = convertTo24HourFormat(coursetime2, "course");
        console.log("currenthours1" + currenthours1);
        console.log("currentminutes1" + currentminutes1);
        console.log("coursehours2" + coursehours2);
        console.log("courseminutes2" + courseminutes2);
        if (courseminutes2 === '' || courseminutes2 === undefined)
        {
            courseminutes2 = 0;
        }
        let diff =  (coursehours2 * 60 + courseminutes2) - (currenthours1 * 60 + currentminutes1);
        return diff;
    }

    return (
        <div className="timerschedule">
            <hr />
            <h3>Today's Schedule</h3>
            <hr />
            {finalData.map((element, index) => (
                <div key={index} className='timerset'>
                    <p>Subject : {element.subject}</p>
                    <p>Time : {element.time}</p>
                    <p className="status">Status : {element.message}</p>
                </div>
            ))}
        </div>
    );
}

export default TodaySchedule;