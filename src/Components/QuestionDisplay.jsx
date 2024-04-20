import React from 'react';
import { setQuestions } from '../redux/mocktestslice';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';
import Editor from './Editor';
import 'react-quill/dist/quill.snow.css'; 
function QuestionDisplay() {
    const dispatch = useDispatch();
    const value = useSelector((state) => state.mocktest.noofquestions);
  
    return (
        <div>
        <h1>Questions to be created {value}</h1>
            <div>
            <input type="number" onChange={(e) => dispatch(setQuestions(e.target.value))} />
            </div>
            <form method="post" className="form-data">
                <Editor /><Editor />
            </form>  
        </div>
    )
}

export default QuestionDisplay;