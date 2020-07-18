import React from "react";
import "./mini-loading-screen.style.scss";
import LoadingLogo from "../../assets/miniLoadingLogo.svg";

export const MiniLoadingScreen = () =>{

    return(
        <div className="mini-loading-screen-div">
            {/* <img src={LoadingLogo} alt="Loading Logo" className="mini-loading-screen-logo"/> */}
            <h1 className="mini-loading-h1"><span className="mini-loading-span">DELIVERY</span>PAL</h1>
            <div className="mini-lds-dual-ring"></div>
        </div>
    )
}