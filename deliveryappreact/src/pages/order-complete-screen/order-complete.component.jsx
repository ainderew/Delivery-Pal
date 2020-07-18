import React, {useEffect} from "react";
import Styles from "./order-complete.module.scss";


//IMAGES
import Logo from "../../assets/video_logo.mp4";

const OrderCompleted = ({RestaurantStateFunction, AnimateMenuIn, AnimateDockerOut}) =>{
    
    useEffect(() =>{
        RestaurantStateFunction()
        AnimateDockerOut()
        
        return () =>{
            AnimateMenuIn()
        }
    }, [])
    
    const confirm = () =>{
        window.location.href = "/index.html#/";
    }
    return(
        <div className={Styles.screen}>
            <div className={Styles.inner}>
                <div className={Styles.header}>
                    <video autoPlay={true} muted={true} loop src={Logo} alt="" className={Styles.logo} />
                </div>
                <div className={Styles.body}>
                    <h1 className={Styles.orderCompleted}>Order Completed</h1>
                    <h1 className={Styles.thankYou}>Thank you for using DeliveryPal</h1>
                </div>
                <div className={Styles.btnContainer}>
                    <button onClick={confirm} className={Styles.btn}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default OrderCompleted;