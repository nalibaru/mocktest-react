import { configureStore } from '@reduxjs/toolkit';
import  mockTestSlice  from './mocktestslice'; 
import loginSlice from './loginslice';
import profileSlice from './profileslice';
import pdfSlice from './pdfslice';
import timeSlice from './timeslice';
export const store = configureStore({
    reducer: {
       
        mocktest: mockTestSlice,
        login: loginSlice, 
        profile: profileSlice,
        pdf: pdfSlice,
        timetable : timeSlice
    }
})