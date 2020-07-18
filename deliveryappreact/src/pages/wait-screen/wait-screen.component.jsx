import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from "./wait-screen.module.scss";
// import io from "socket.io-client";
// const socket = io.connect("https://delivery-pal.herokuapp.com/");

const WaitScreen = ({RestaurantStateFunction, AnimateMenuIn, AnimateDockerOut, socket}) => {
  const getUserData = useSelector(state => state.userDataReducer);
  const orderData = useSelector(state => state.cartDataReducer);
  const [userData] = useState(getUserData);
  const [orderStatus, setOrderStatus] = useState(false)

  useEffect(() => {
    AnimateDockerOut();
    RestaurantStateFunction()
    
    socket.emit("order", {
      name: userData.name,
      location: userData.location,
      id: userData.userId,
      order: orderData,
    });
    
    socket.on("messageFromRoom", (message) =>{
        if (message === "accepted"){
            setOrderStatus(true);
        }
    })
    
    return () =>{
        socket.off("messageFromRoom");
        AnimateMenuIn();
    }
   
  }, []);
  
  
  useEffect(() => {
      if (orderStatus) {
            // window.location.href = "file:///android_asset/www/index.html#/ordered";
            window.location.href = "/index.html#/ordered";
      }
  }, [orderStatus])
  
  
  //FUNCTION
  const cancel = () =>{
    socket.emit("cancel", userData.userId);
    window.location.href = "/index.html#/";
  }
    
  return (
    <div className={Styles.container}>
      <div className={Styles.content}>
        <h1 className={Styles.h1}>
          <span className={Styles.span}>DELIVERY</span>PAL
        </h1>
        <p className={Styles.p}>Getting you a rider</p>
        <div className={Styles.circle}></div>
      </div>
      <div className={Styles.cancelContainer}>
        <h1 onClick={cancel} className={Styles.cancel}>Cancel</h1>
      </div>
    </div>
  );
};

export default WaitScreen;
