import React from "react";
import "./white-loading-screen.style.scss";
// import LoadingLogo from "../../assets/miniLoadingLogo.svg";

export const WhiteLoadingScreen = () =>{

    return(
        <div className="white-loading-screen-div">
            {/* <img src={LoadingLogo} alt="Loading Logo" className="white-loading-screen-logo"/> */}
            <h1 className="mini-loading-h1"><span className="mini-loading-span">DELIVERY</span>PAL</h1>
            <div className="white-lds-dual-ring"></div>
        </div>
    )
}