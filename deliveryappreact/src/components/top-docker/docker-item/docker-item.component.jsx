import React from "react";
import "./docker-item.syle.scss"

export const DockerItem = (props) =>{

    return(
        <li className="docker-item-li" onClick={(props.Status===false) ? ()=>props.ParentFunction(props.index):null}>
            <div className={props.Display}>
                <img src={props.icon} alt="" className="docker-item-img"/> 
            </div>
            <h1 className="docker-item-text">{props.name}</h1>
        </li>
    )
}