import React from "react";
import './index.css';
import Timetable from "./TimeTable";
import TodaySchedule from "./TodaySchedule";
function TimeTableMain()
{
    return (
        <div className="main-time">
            <Timetable />
            <TodaySchedule />
        </div>
    )
}

export default TimeTableMain;