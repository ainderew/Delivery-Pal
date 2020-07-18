import React, {useState} from "react";
import "./location-bar.style.scss";
import LocationSVG from "../../assets/location.svg"
import SearchSVG from "../../assets/search.svg"

export const LocationBar = (props) =>{
    const [locationState, setLocationState] = useState(false)
    const [location, setLocation] = useState("Palompon, Leyte");

    
    
    const changeLocation = () =>{
        setLocationState(prevState => !prevState)
        if (location === "") setLocation("Palompon, Leyte"); // set to defaul location if location is blank onBlur
    }


    const ChangeLocationInput = (e) =>{
        setLocation(e.target.value)
    }

    return (
        <div className="location-bar-div">
            <img src={LocationSVG} alt="" className="location-bar-icon"/>
            
            {(locationState) ? 
            <form className="location-input-div">
                <input type="text" autoFocus={true} className="location-input" value={location} onChange={ChangeLocationInput} onBlur={changeLocation} />
                <button type="submit" className="location-input-submit-btn"></button>
            </form>  : 
            <h1 onClick={changeLocation} className="location-text"> {location} </h1>}
            
        </div>
    )
}