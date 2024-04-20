import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionDisplay from './Components/QuestionDisplay';
import TimeTableMain from './Components/TimeTableMain';
import LoginPage from './Components/LoginPage.jsx';
import ProtectedRoute from './Components/ProtectedRoute.jsx';
import Dashboard from './Components/dashboard.jsx';
import Layout from './Components/Layout.jsx';
import Profile from './Components/profile.jsx';
import PdfPage from './Components/PdfPage.jsx';
import FileUploadMain from './Components/FileUploadMain.jsx';
import MainPage from './Components/StartMockTest/MainPage.jsx';

const AppRouter = () => (

    
    <Router>
      <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/timetable" element={<TimeTableMain />} />
                <Route path="/mocktest" element={<QuestionDisplay />} />
                <Route path="/startmocktest" element={<MainPage />} />
                <Route path="/fileupload" element={<PdfPage />} />
                <Route path="/fileuploadmain" element={<FileUploadMain />} />
              </Route>
            </Route>
            <Route element={<Layout />}>
                <Route path="/profile" element={<Profile />} />
            </Route>
      </Routes>
    </Router>
  );
  
  export default AppRouter;