import React from "react";
import Styles from "./active-order-modal.module.scss";
import {Link} from "react-router-dom"
//IMAGES
import banner from "../../assets/Active Order.svg"

const ActiveOrderModal = () =>{
    
    return(
        <Link to="/ordered">
            <div className={Styles.modal}>
                <img src={banner} alt="" className={Styles.img}/>
            </div>
        </Link>
    )
}

export default ActiveOrderModal;