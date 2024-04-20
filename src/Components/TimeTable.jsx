import React , {useEffect }  from 'react';
import './index.css';
import { useDispatch,useSelector } from 'react-redux';
import { setTimeTableData } from '../redux/timeslice';
function Timetable() {
    const timetableData = useSelector((state) => state.timetable.data);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
          try {
            const url = `http://localhost:3001/api/timetable/get/all`;
            const response = await fetch(url); 
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json(); 
            dispatch(setTimeTableData(data));
            highlightTodayColumn();
          } catch (err) {
            console.error("Failed to fetch data:", err);
          }
        };
        fetchData();
      }, []); 

  const highlightTodayColumn = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = daysOfWeek[today.getDay()]; 

    const cols = document.querySelectorAll('#weeklySchedule th');
    let targetColIndex = -1;

    
    cols.forEach((col, index) => {
      if (col.textContent === dayName) {
        targetColIndex = index;
      }
    });

    if (targetColIndex !== -1) {
      const rows = document.querySelectorAll('#weeklySchedule tr');
      rows.forEach(row => {
        const cell = row.cells[targetColIndex];
        if (cell) {
          cell.classList.add('today');
        }
      });
    }
  };
    

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const uniqueSubjects = [...new Set(timetableData.map(item => item.subject))];
    return (
        <div id="header-timer">
        <h2>Weekly Timetable</h2>
        {timetableData && timetableData.length > 0 ? (
            <table id="weeklySchedule">
                <thead>
                    <tr>
                        <th>Day/Subject</th>
                        {daysOfWeek.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {uniqueSubjects.sort().map((subject) => (
                        <tr key={subject}>
                            <td>{subject}</td>
                            {daysOfWeek.map(day => {
                                const entry = timetableData.find(item => item.day === day && item.subject === subject);
                                return <td key={day}>{entry ? entry.time : ''}</td>;
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>Loading data...</p>
        )}
    </div>
  );
}

export default Timetable;