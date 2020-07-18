import React from "react";
import "./loading-screen.style.scss";
import LoadingLogo from "../../assets/loadingLogo.svg";

export const LoadingScreen = () =>{

    return(
        <div className="loading-screen-div">
            <img src={LoadingLogo} alt="Loading Logo" className="loading-screen-logo"/>
            <div className="lds-dual-ring"></div>
        </div>
    )
}