import React, { useEffect, useState } from 'react';
import './index.css';
import Editor from '../Editor';
import { updateMockTestDetails,updateMarksDetails,updateDescAnswersMap } from '../../redux/mocktestslice';
import { useSelector, useDispatch } from 'react-redux';
import ButtonComponent from "./ButtonComponent";
import ProgressBar from "./ProgressBar";
import { regexValues, splitValuesAndFindDifference } from '../../services/descQuestion'; 
import debounce from 'lodash.debounce';
import Displaypalette from './DisplayPalette';

const getMarksforDesc = (mocktestdataactual, noofquestions, dispatch) => {
  let descAnswersMap = {};
  for (let i = 0; i <noofquestions; i++)
  { 
    const data = mocktestdataactual[i];
    let descanswer = {}
   
    if (data && data.type === "desc" && data?.my_choice) {
      console.log("type is desc");
      console.log("my_choice" + data.my_choice);
      console.log("correct_answer" + data.correct_answer);
      const regexTags = /<p[^>]*?>\s*<br\s*\/?>\s*<\/p\s*?>/gi;
      const answer = data.my_choice;
      const choiceanswer = answer.replace(regexTags, '');
      const studentanswer = regexValues(choiceanswer);
      const actualanswer = regexValues(data.correct_answer);
      const actualMarks = splitValuesAndFindDifference(studentanswer, actualanswer);
      const updateddata = {
        ...data,
        marks: actualMarks
      };
       descanswer = {
        qid: i,
        answer: choiceanswer,
        marks: actualMarks,
        length : choiceanswer.length
      }
     
      dispatch(updateMockTestDetails(updateddata));
      descAnswersMap[i] = descanswer;
    }
  }
  
  dispatch(updateDescAnswersMap(descAnswersMap));
};


function DynamicQuestionDisplay({question}) {
  const totalCount = useSelector((state) => state.mocktest.totalCount);
  const currentQuestionIndex = useSelector((state) => state.mocktest.currentQuestionIndex);
  const mocktestdataactual = useSelector((state) => state.mocktest.questions);
  const dispatch = useDispatch();
  const { question_name, type, correct_answer, ...choices } = question;
  const [currentChoice, setCurrentChoice] = useState("");
  const [editorHtml, setEditorChange] = useState("");
  const [valueProgress, setProgressValue] = useState(0);
  const [classTestDetails, setClassTestDetails] = useState("visited");
  const choiceKeys = type === "mcq" ? Object.keys(choices).filter(key => key.startsWith('choice_')) : [];

  useEffect(() => {
    if (mocktestdataactual && typeof mocktestdataactual === 'object' && Object.keys(mocktestdataactual).length > 0) {
      const datachoice = mocktestdataactual[currentQuestionIndex];
      console.log("coming here in child");
      if (datachoice)
      {
        if (datachoice.type === "mcq")
        {
        const currentChoice = datachoice?.my_choice ?? ""; 
        setCurrentChoice(currentChoice);
        }
        const classDetails = datachoice?.class_details ?? "visited";
        setClassTestDetails(classDetails); 
      } 
    }
  }, [currentQuestionIndex,mocktestdataactual])

  useEffect(() => {
    console.log("currentIndex" + currentQuestionIndex);
    const datachoice = mocktestdataactual[currentQuestionIndex];
    if (datachoice && datachoice.type === "desc" && datachoice.my_choice) {
      const descchoice = datachoice.my_choice;
      setEditorChange(descchoice);
    } else {
      setEditorChange("");
    }
  }, [currentQuestionIndex]); // Empty dependency array to run the effect only once

  useEffect(() => {
    console.log("coming here in child11");
    findProgress();
    setMarkDetailsMethod();
  }); 
  

  const handleQuestionChange = (e) => {
    const data = mocktestdataactual[currentQuestionIndex]; 
    const currentChoice = e.target.value;
    let marks = 0;
    setCurrentChoice(currentChoice);
    const classDetailsfromInitial = data?.class_details ?? classTestDetails;
    const classDetails = findClass(classDetailsfromInitial);
    if (currentChoice === data.correct_choice)
    {
      marks = 1;
    }
    const modifieddata = { ...data, my_choice:currentChoice,class_details:classDetails,marks:marks }
    dispatch(updateMockTestDetails(modifieddata));
  };
  
  const findClass = (currentClass) => {
    if (currentClass === "visited")
    {
      return "answered";
    }
    else if(currentClass === "marked"){
      return "answeredandreview";
    }
    else {
      return "answered";
    }
  }

  const handleEditorChange = (content, delta, source, editor) => {

  let str = editor.getHTML();
  const data = mocktestdataactual[currentQuestionIndex];
  str = str.replace(/<p><br><\/p>/g, "");
  if (str !== "" && str !== null) {
      setEditorChange(editor.getHTML());
  } else {
      setEditorChange("");
  }
  const classDetailsfromInitial = data?.class_details ?? classTestDetails;
  let classDetails = findClass(classDetailsfromInitial);
  if (str !== "" && str !== null) {
      classDetails = findClass(data?.class_details);
  } else {
      classDetails = findClassForEditorIfEmpty(data?.class_details);
  }  
  const modifieddata = { ...data, my_choice: str, class_details: classDetails }
  dispatch(updateMockTestDetails(modifieddata));
  onChangeforGetDesc();
};

  const setMarkDetailsMethod = () => { 
    let mcqMarks = 0;
    let descMarks = 0;
    const answeredlength = mocktestdataactual.filter((element) => element?.class_details === "answered" || element?.class_details === "answeredandreview").length;
    const answeredmcqlength = mocktestdataactual.filter(
      (element) =>
        (element.type === "mcq") &&
        (element.class_details === "answered" || element.class_details === "answeredandreview")
    ).length;
    
    const answereddesclength = mocktestdataactual.filter(
      (element) =>
        (element.type === "desc") &&
        (element.class_details === "answered" || element.class_details === "answeredandreview")
    ).length;
    const unansweredlength = totalCount.noofquestions - answeredlength; // total unanswered
    const unansweredmcqlength = totalCount.mcqType - answeredmcqlength; //mcq unanswered
    const unanswereddesclength = totalCount.descType - answereddesclength; //desc unanswered
    const correctmcqlength = mocktestdataactual.filter((element) => {
      if (element.type === "mcq" && element?.my_choice && element?.class_details) {
        return element?.my_choice === element?.correct_choice
      }
    }).length;
    const correctdesclength = mocktestdataactual.filter((element) => {
      const marks = element.marks;
      console.log("The marks is " + marks);
      if (element?.marks) {
        return (
          element.type === "desc" &&
          element.marks > 0.5 &&
          (element.class_details === "answered" || element.class_details === "answeredandreview")
        );
      }
      return false; 
    }).length;

    const incorrectmcqlength = answeredmcqlength - correctmcqlength; 
    const incorrectdesclength = answereddesclength - correctdesclength; 
    const mcqValues = (correctmcqlength / totalCount.mcqType) * 100;
    mcqMarks = Math.floor(mcqValues);
    descMarks = mocktestdataactual.reduce((initialmarks,element) => {
      if (element.type === "desc" && element?.marks) {
        return initialmarks + element.marks;
      }
      return initialmarks
    }, 0);
    const descValues = (descMarks / totalCount.descType) * 100;
    descMarks =  Math.floor(descValues);
    mcqMarks = isNaN(mcqMarks) ? 0 : mcqMarks;
    descMarks = isNaN(descMarks) ? 0 : descMarks;
    const totalMarks = Math.floor((descMarks + mcqMarks)/2);
     const marks =  {
       answered: answeredlength,
       mcqanswered: answeredmcqlength,
       descanswered : answereddesclength,
       unanswered: unansweredlength,
       mcqunanswered : unansweredmcqlength,
       descunanswered : unanswereddesclength,
       mcqcorrect : correctmcqlength,
       mcqincorrect: incorrectmcqlength,
       desccorrect: correctdesclength,
       descincorrect : incorrectdesclength,
       descMarks: descMarks,
       mcqMarks: mcqMarks,
       totalMarks : totalMarks
      }
    dispatch(updateMarksDetails(marks));
  }

  const findClassForEditorIfEmpty = (currentClass) => {
    if (currentClass === "marked")
    {
      return "unansweredandreview";
    }
    else if(currentClass === "answered"){
      return "unanswered";
    }
    else {
      return "unanswered";
    }
  }

  const debouncedHandleEditorChange = debounce(
    getMarksforDesc,
    1000
  ); 

  const onChangeforGetDesc = (content, delta, source, editor) => {
    debouncedHandleEditorChange(mocktestdataactual, totalCount.noofquestions, dispatch,setEditorChange);
  };
  
  const findProgress = () => {
    if (totalCount.noofquestions > 0) {
        const data = mocktestdataactual.filter((element) => element?.class_details === "answered" || element?.class_details === "answeredandreview").length;
        const value = Math.round((data / totalCount.noofquestions) * 100);  // Using Math.round to round the percentage
        setProgressValue(value);
    } else {
        setProgressValue(0); 
    }
  }

  const handleEmptyEditors = () => {
          setEditorChange("");
    }
    

  return (
    <>
    <div className="questionbody">
       <ProgressBar progress={valueProgress} />
      <div className="questionheader">
          <div className="questionNumber">{currentQuestionIndex + 1}</div>
       <div className="questionName">  {question_name} </div> 
      </div>
      <div className="questionchoice">
        {type === "mcq" && choiceKeys.map((key, index) => (
          <div key={index} className="radio-button">
            <label>
              <input type="radio" name="questionChoice" value={choices[key]} checked={choices[key] === currentChoice} onChange={handleQuestionChange}/> 
              {choices[key]}
            </label>
          </div>
        ))}
        {type === "desc" && (
          <Editor value={editorHtml} onChange={handleEditorChange} 
          />
        )}
      </div>
      <ButtonComponent onChangeMethod={handleEmptyEditors} />
      </div>
      <div className='displaypalettediv'>
        <Displaypalette totalCount={totalCount} mocktestdataactual={mocktestdataactual} currentIndex={currentQuestionIndex}  />
      </div>
      </>
  );
}

export default DynamicQuestionDisplay;
