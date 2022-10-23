import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MembersList from './components/membersList/MembersList';
import Register from './components/register/Register';
import DetailsMember from './components/membersList/DetailsMember';
import NavBar from './components/navBar/NavBar';
import CoronaPatientsDiagram from './components/CoronaPatientsDiagram/CoronaPatientsDiagram';

function App() {
  return (<>
  <NavBar/>
  <hr/>
     <Routes>
      <Route path="" element={<MembersList />} />
      <Route path="membersList"element={<MembersList />} />
      <Route path="register" element={<Register />} />
      <Route path="detailsMember/:id" element={<DetailsMember />} />
      <Route path="coronaDiagram" element={<CoronaPatientsDiagram />} />
    </Routes>
  </>);
}

export default App;
