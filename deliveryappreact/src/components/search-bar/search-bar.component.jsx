import React from "react";
import "./search-bar.style.scss"

import LocationSVG from "../../assets/location.svg"

export const SearchBar = (props) =>{

    return(
        <div className="search-bar-div">
            <input placeholder="Search for food" autoFocus={true} type="text" className="search-bar"/>
            <button onClick={props.ChangeState} className="search-bar-filter-btn">
                <img src={LocationSVG} alt="" className="search-bar-submit-btn-icon"/>
            </button>
        </div>
    )
}