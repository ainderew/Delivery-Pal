import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Styles from "./ordered-screen.module.scss";

//ACTIONS
import {orderState} from "../../actions/index"



//IMAGES
import DriverLogo from "../../assets/driver-logo.svg";
import Send from "../../assets/send.svg";


const OrderedScreen = ({
  RestaurantStateFunction,
  AnimateMenuIn,
  AnimateDockerOut,
  socket
}) => {
  const dispatch = useDispatch()
  let messageContainer = useRef(null)
  const getUserData = useSelector(state => state.userDataReducer);
  const [userData] = useState(getUserData);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  

  const messageType = e => {
    setInput(e.target.value);
  };
  const sendMessage = e => {
    e.preventDefault();
    socket.emit("roomMessage", userData.userId, userData.name, input);
  
    setInput("");
  };
  
  //USEEFFCT
  useEffect(() => {
    AnimateDockerOut();
    RestaurantStateFunction();
    
    dispatch(orderState(true))
    socket.emit("clientJoin", userData.userId);
    
      // if(JSON.parse(localStorage.getItem("savedChat")) === null){

      // }else if(JSON.parse(localStorage.getItem("savedChat")).length !== 0){
      //   setMessages(JSON.parse(localStorage.getItem("savedChat")))
      // }
      
      socket.once("messageHistory", (messageLog) => {
        setMessages(messageLog);
        console.log(messageLog)
      });
    
    
    return () =>{
      AnimateMenuIn();
  }
    
  }, []);
  

  useEffect(() => {
    socket.once("messageFromRoom", ({ name: name, message: message }) => {
      setMessages([
        ...messages,
        {
          name: name,
          message: message,
        },
      ]);
    });
    // localStorage.setItem("savedChat", JSON.stringify(messages))
    messageContainer.scrollTo(0,messageContainer.scrollHeight);
  }, [messages]);



  return (
    <div className={Styles.screen}>
      <div className={Styles.header}>
        <Link to="/">
          <p className={Styles.back}>&#60; Back</p>
        </Link>
        <div className={Styles.headerWrapper}>
          <div className={Styles.headerImgContainer}>
            <img
              src={DriverLogo}
              alt="driver logo"
              className={Styles.headerimg}
            />
          </div>
          <h2 className={Styles.h2}>Chat with your driver</h2>
        </div>
      </div>
      <div ref={el => messageContainer = el} className={Styles.container}>
        {messages.map((el, index) => {
          if (el.name === userData.name) {
            return (
              <div key={index} className={Styles.sender}>
                <span className={Styles.message}>{el.message}</span>
              </div>
            );
          } else {
            return (
              <div key={index} className={Styles.reply}>
                <h1 className={Styles.name}>{el.name}</h1>
                <span className={Styles.message}>{el.message}</span>
              </div>
            );
          }
        })}
      </div>
      <div className={Styles.inputContainer}>
        <form className={Styles.form} action="">
          <input
            value={input}
            onChange={messageType}
            type="text"
            className={Styles.input}
            placeholder="Send a message"
          />
          <button onClick={sendMessage} type="submit" className={Styles.btn}>
            <img src={Send} alt="send button" className={Styles.inputImg} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderedScreen;
