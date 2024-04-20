import React from "react";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentQuestionIndex, updateMockTestDetails, updateDescAnswersMap } from '../../redux/mocktestslice';
import { regexValues, splitValuesAndFindDifference } from '../../services/descQuestion';
import { useNavigate } from "react-router-dom";
function ButtonComponent({onChangeMethod}) {
    const totalCount = useSelector(state => state.mocktest.totalCount);
    const currentQuestionIndex = useSelector(state => state.mocktest.currentQuestionIndex);
    const questionDetails = useSelector(state => state.mocktest.questions);

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const navigateQuestions = (direction) => {
        const data = questionDetails.find(elem => elem.question_id === currentQuestionIndex);
        const newIndex = direction === 'next' ? currentQuestionIndex + 1 : currentQuestionIndex - 1;
        if (direction !== 'submit' && data) {
            updateClassDetails(data);
            dispatch(setCurrentQuestionIndex(newIndex));
            if (data.type === "desc")
            {
                onChangeMethod();
            }
        } else {
                getMarksforDesc(questionDetails, totalCount.noofquestions, dispatch); 
                navigate('/dashboard');
            
        }
    };


    const getMarksforDesc = (mocktestdataactual, noofquestions, dispatch) => {
        let descAnswersMap = {};
        for (let i = 0; i < noofquestions; i++) {
            const data = mocktestdataactual[i];
            let descanswer = {};
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
                    answer: studentanswer,
                    marks: actualMarks,
                    length: studentanswer.length
                };
                
                dispatch(updateMockTestDetails(updateddata));
                descAnswersMap[i] = descanswer;
            }
        }
        
        dispatch(updateDescAnswersMap(descAnswersMap));
    };

    const updateClassDetails = (data) => {
        let classDetails = "unanswered"; // Default state
        let marks = 0;
        if (data.my_choice) {
            classDetails = data.class_details === "marked" ? "answeredandreview" : data.class_details === "answeredandreview" ? "answeredandreview" : "answered";
            if (data.type === "mcq") {
                if (data.my_choice === data.correct_choice) {
                    marks = 1;
                }
            }
            else
            {
                marks = data?.marks;   
            }
                  
        } else if (!data.my_choice && (data.class_details === "marked" || data.class_details === "unansweredandreview")) {
            classDetails = "unansweredandreview";
            if (data.type === "mcq") {
                marks = 0;
            }
            else {
                marks = data?.marks  
            }   
        }
        
        dispatch(updateMockTestDetails({ ...data, class_details: classDetails, marks: marks }));
    };

    const markQuestionForReview = () => {
        const data = questionDetails.find((elem) => elem.question_id === currentQuestionIndex);
        updateClassDetailsForMarked(data);
    };

    const updateClassDetailsForMarked = (data) => {
        let classDetails = "marked";
        if (data.my_choice) {
            data.class_details === "answered" || data.class_details === "visited" || data.class_details === "unviewed" ? classDetails = "answeredandreview" : classDetails = "answered";
        } else if (!data.my_choice) {
            data.class_details === "unanswered" ? classDetails = "unansweredandreview" : data.class_details === 'visited' || data.class_details === "unviewed" ? classDetails = "marked" : classDetails = "unanswered";
        }
        dispatch(updateMockTestDetails({ ...data, class_details: classDetails }));
    };

    return (
        <div className="nextprevbutton">
            <button onClick={() => navigateQuestions('previous')} disabled={currentQuestionIndex === 0} className="previous">Previous</button>
            <button onClick={markQuestionForReview} className="star-button">Mark</button>
            <button onClick={() => currentQuestionIndex === totalCount.noofquestions - 1 ? navigateQuestions('submit') : navigateQuestions('next')} className="next">
                {currentQuestionIndex === totalCount.noofquestions - 1 ? 'Submit' : 'Next'}
            </button>
        </div>
    );
}

export default ButtonComponent;
