import React, { useEffect } from "react";
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import DynamicQuestionDisplay from "./DynamicQuestionDisplay";
import { setQuestions,setMockTestDetails,clearState } from '../../redux/mocktestslice';
import { useNavigate } from "react-router-dom";

function MainPage() {
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector((state) => state.mocktest.currentQuestionIndex);
    const navigate = useNavigate();
    const mocktestdata = [
        {
            "question_name": "Which word is a noun111?",
            "choice_1": "Run",
            "choice_2": "Beautiful",
            "choice_3": "Dog",
            "choice_4": "Quickly",
            "correct_choice": "Dog",
            "type": "mcq"
        },
        {
            "question_name": "What is your father name?",
            "correct_answer": "Gopa",
            "type" : "desc"
        },
        {
            "question_name": "Which word is a verb222?",
            "choice_1": "Jump",
            "choice_2": "Happiness",
            "choice_3": "Under",
            "choice_4": "Red",
            "correct_choice": "Jump",
            "type": "mcq"
        },
        {
            "question_name": "What is your name",
            "correct_answer": "Nalina",
            "type" : "desc"
        },
        {
            "question_name": "Which word is a verb333?",
            "choice_1": "Jump",
            "choice_2": "Happiness",
            "choice_3": "Under",
            "choice_4": "Red",
            "correct_choice": "Jump",
            "type": "mcq"
        }
    ];

    useEffect(() => {
        console.log("coming here in parent");
        const length = mocktestdata.length;
        const mcqValue = mocktestdata.filter(element => element.type === "mcq").length;
        const descValue = mocktestdata.filter(element => element.type === "desc").length;
        const totalCount = {
            noofquestions: length,
            mcqType: mcqValue,
            descType : descValue
        }
        dispatch(setQuestions(totalCount));
        const updatedTestData = mocktestdata.map((element, index) => ({
            ...element,
            question_id: index,
            class_details: element.class_details ? element.class_details : index === currentQuestionIndex ? "visited" : "unviewed"
          }));
        dispatch(setMockTestDetails(updatedTestData));
    }, [])
        
    const reset = () => {
        dispatch(clearState());
        navigate('/startmocktest');
    }

    return (
        <div className="main">
            <div className="mocktestheader">
                <h2>Mock Test</h2>
                <div className="resetdiv"><button className="reset" onClick={reset}>Reset Test</button> </div> 
            </div>
            <div className="questioncontainer">
                <DynamicQuestionDisplay question={mocktestdata[currentQuestionIndex] || mocktestdata[0]} />   
            </div>
        </div>
    );
}

export default MainPage;