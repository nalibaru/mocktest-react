import { createSlice } from '@reduxjs/toolkit';

export const mockTestSlice = createSlice({
    name: 'mocktest',
    initialState: {
        totalCount: [],
        questions: [],
        data: null,
        currentpdf: 1,
        fileDetails: [],
        currentQuestionIndex: 0,
        marks: [],
        descAnswersMap: {},
        evaluationInProgress : false
    },
    reducers: {
        setQuestions: (state, action) => {
            state.totalCount = action.payload;
        },
        setMockTestDetails: (state, action) => {
            console.log("One time invocation");
            state.questions = [...action.payload];
        },
        updateMockTestDetails: (state, action) => {
            const index = state.questions.findIndex(q => q.question_id === action.payload.question_id);
            console.log("updation for index"+index);
            if (index !== -1) {
                // Question exists, update it
                console.log("question_id" + action.payload.question_id + "marks" + action.payload?.marks);
                return {
                    ...state,
                    questions: state.questions.map((item, idx) =>
                        idx === index ? action.payload : item
                    )
                };
            } else {
                // Question does not exist, add as new
                return {
                    ...state,
                    questions: [...state.questions, action.payload]
                };
            }
        },
        updateMarksDetails: (state, action) => {
            state.marks = action.payload;
        },
        setFileName: (state, action) => {
            state.data = action.payload;
        },
        setCurrentPDF: (state, action) => {
            state.currentpdf = action.payload;
        },
        setFileDetails: (state, action) => {
            state.fileDetails = [...state.fileDetails, action.payload] ?? [];
        },
        setCurrentQuestionIndex: (state, action) => {
            state.currentQuestionIndex = action.payload ?? 0;
        },
        updateDescAnswersMap: (state, action) => {
            const updatedDescAnswersMap = { ...state.descAnswersMap };
            const newDescAnswersMap = action.payload;
            
            Object.keys(newDescAnswersMap).forEach(qid => {
                const newDescAnswer = newDescAnswersMap[qid];
                const existingDescAnswer = updatedDescAnswersMap[qid];
        
                if (existingDescAnswer) {
                    updatedDescAnswersMap[qid] = { ...existingDescAnswer, ...newDescAnswer };
                } else {
                    updatedDescAnswersMap[qid] = newDescAnswer;
                }
            });
        
            return {
                ...state,
                descAnswersMap: updatedDescAnswersMap,
            };
        },
        setEvaluationInprogress: (state, action) => {
            state.evaluationInProgress = action.payload;
        },
        clearState: (state) => {
           
            state.questions.forEach((question, index) => {
                if (index === 0)
                {
                    state.questions[index] = { ...question, my_choice: "", marks: "", class_details: "visited" };
                }
                else {
                    state.questions[index] = { ...question, my_choice: "", marks: "", class_details: "unviewed" };
                }     
            });
            state.currentQuestionIndex = 0;
            state.descAnswersMap = null;
           state.marks = null;
          }
    },
});

export const { setQuestions,setMockTestDetails,updateMockTestDetails,updateMarksDetails,setFileName,setCurrentPDF,setFileDetails,setCurrentQuestionIndex,updateDescAnswersMap,clearState } = mockTestSlice.actions;
export default mockTestSlice.reducer;