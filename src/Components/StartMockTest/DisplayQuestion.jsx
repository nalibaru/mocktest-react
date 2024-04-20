import React from "react";
import './index.css';
import { useSelector } from "react-redux";

function DisplayQuestion() {
    const allquestions = useSelector((state) => state.mocktest.questions);
    return (
        <>
            <table className="questiontabledisplay">
  <thead>
    <tr>
      <th>Question #</th>
      <th>Question Name</th>
      <th>My Choice</th>
                        <th>Class Details</th>
                        <th>Correct Answer</th>
      <th>Marks</th>
    </tr>
  </thead>
  <tbody>
    {allquestions.map((data, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{data.question_name}</td>
        <td>{data?.my_choice || "NA"}</td>
            <td>{data?.class_details || "NA"}</td>
            <td>{data.type === "mcq" ? data.correct_choice : data.correct_answer}</td>
            <td>
            {data.type === "mcq" ? (data?.my_choice === data.correct_choice ? 1 : (!data?.my_choice ? "NA" : 0)) : (data?.marks || "NA")}
            </td> 
      </tr>
    ))}
                </tbody> 
                </table>
        </>
    );
}

export default DisplayQuestion;