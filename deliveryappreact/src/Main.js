import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";

// import {HashRouter as Router, Switch, Route} from "react-router-dom"
import "./Main.scss";
import {DefaultScreen} from "./pages/default-screen/default-screen.component"
import {NotLoggedIn} from "./pages/not-logged-in/not-logged-in.component"
import {LoadingScreen} from "./pages/Loading-Screen/loading-screen.component"


 export const Main = () => {
  const userReducer = useSelector(state => state.userDataReducer)
   
  const [loadingState, setLoadingState] = useState(true)
  // if localStorage is not empty it serves as logged in
  // const [userData] = useState(localStorage.getItem("localUserData"))
  
  const [userData] = useState(userReducer)
  // console.log(userData)

  


  useEffect(()=>{
    setLoadingState(prevState => !prevState)
  
  },[])

  if (loadingState){
    return(
      <LoadingScreen />
    )

  }else{
      return (
        <div className="Main-container">
          {(userData !== "") ? <DefaultScreen />:<NotLoggedIn />}
        </div>
      )
  }
}

