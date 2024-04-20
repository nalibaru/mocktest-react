import React from 'react';
import './index.css';
import { useDispatch } from 'react-redux';
import { setCurrentQuestionIndex } from '../../redux/mocktestslice';

function Displaypalette({ totalCount,mocktestdataactual,currentIndex})
{
    const dispatch = useDispatch();
    const message = totalCount.noofquestions;
    const numbers = Array.from({ length: message }, (_, i) => i + 1);
    
    const clickQuestion = (index) => {
       console.log("currentIndex" + index);
       dispatch(setCurrentQuestionIndex(index));
   }
    
  return (
      <div id="subdisplay-palette">
    <div className="number-buttons">
      {mocktestdataactual.length > 0 && numbers.map((number,index) => {
       const matchingObj = mocktestdataactual.find(obj => obj.question_id === index);
          const buttonId = matchingObj.class_details !== 'unviewed' ? matchingObj.class_details : index === currentIndex ? 'visited' : 'unviewed';
          const isCurrent = index === currentIndex;
       return (
           <button onClick={() => clickQuestion(index)}  className={buttonId}   id={isCurrent ? `visiting` : index} key={index} >
       {number}
     </button> 
     );
      })}
          </div>
          <div className="palette-box">
              <div className="palettediv">
              <button  className="visited" data-tooltip="Visited" > 1
                  </button><label>Visiting</label></div>
                  <div className="palettediv">
              <button  className="unviewed" data-tooltip="Not Visited" > 1
                  </button><label>Not Visited</label></div>
                  <div className="palettediv">
              <button  className="marked" data-tooltip="Marked for review"> 1
                  </button><label>Marked for review</label></div>
                  <div className="palettediv">
              <button  className="unanswered" data-tooltip="Not Answered"> 1
                  </button><label>Not Answered</label></div>
                  <div className="palettediv">
              <button  className="answered" data-tooltip="Answered"> 1
                  </button><label>Answered</label></div>
                  <div className="palettediv">
              <button  className="answeredandreview" data-tooltip="Answered and review"> 1
                  </button><label>Answered and review</label></div>
                  <div className="palettediv">
              <button  className="unansweredandreview" data-tooltip="Not Answered and review"> 1
         </button><label>Not Answered and review</label></div>
          </div>
    </div>
  );
}

export default Displaypalette;