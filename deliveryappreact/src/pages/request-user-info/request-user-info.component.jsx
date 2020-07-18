import React,{useState} from "react";
import {useHistory} from "react-router-dom"
import "./request-user-info.style.scss";

export const RequestUserInfoPage = (props) =>{

    const history = useHistory();

    const userData = JSON.parse(sessionStorage.getItem("fbUser"));

    
    const [userInfo, setUserInfo] = useState({
        name: userData.name,
        password:userData.userId,
        location:"" ,
    })

    const onLocationChange = (e) =>{
        setUserInfo({
            ...userInfo,
            location: e.target.value
        })
    }

    const submitData = async () =>{
        await window.cordovaFetch("https://delivery-pal.herokuapp.com/login/sign-up-with-fb",{
            mode: "cors",
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(response=>response.json)
        .then(data => {
            localStorage.setItem("localUserData",JSON.stringify(data));
            history.push("/")
        })
    }

    return (

    <div className="request-info-div">
        <input type="text" value={userInfo.locataion} onChange={onLocationChange} />
        <button onClick={submitData} className="request-submit-btn">submit</button>
    </div>
    )
}