import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import '../Language.css'

function ShowOp() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);
  return (
    <div className="show__language__options">
      <div className="button__lang" onClick={() =>  navigate('/connectinfo')}>Set Data</div>
      <div className="button__lang" onClick={() =>  navigate('/getdbs')}>Show DB</div>
    </div>
  )
}

export default ShowOp