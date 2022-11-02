import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import {Typography} from "@mui/material"

function Welcome() {

  const navigate = useNavigate()
  const token = localStorage.getItem('token');

  useEffect(()=>{
    if (token) {
      navigate("/home")
  }
  },[token])

  return (
        <Typography variant="h3" component="div">
          Please Login or Registrate
        </Typography>
  );
}

export default Welcome;