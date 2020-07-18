import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { userData } from "../actions/index";

const useFbLogin = () => {
  let history = useHistory();
  const dispatch = useDispatch()

  const login = passedFunc => {
    // window.facebookConnectPlugin
    // window.facebookConnectPlugin.login( ["public_profile"], response => {
    window.FB.login( response => {
      const userObj = {
        accessToken: response.authResponse.accessToken,
        userId: response.authResponse.userID,
      };

      // alert(JSON.stringify(response.authResponse.accessToken))
      // alert(JSON.stringify(response.authResponse.userID));
    //   window.cordovaFetch
      fetch(
          "https://delivery-pal.herokuapp.com/login/login-with-fb",
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userObj),
          }
        )
        .then(response => response.json())
        .then(data => {
          alert(JSON.stringify(data));
          if (data.status === "register") {
            sessionStorage.setItem("fbUser", JSON.stringify(data));
            passedFunc();
            window.location.href =
              "file:///android_asset/www/index.html#/requestInfo";
          } else if (data.status === "login") {
            // alert(JSON.stringify(data));
            // localStorage.setItem(
            //   "localUserData",
            //   JSON.stringify(data.userData)
            // );
            dispatch(userData(data.userData))
            passedFunc();
            window.location.reload();
            // history.push("/");
            // window.location.href = "file:///android_asset/www/index.html#/";
            
          }
        });
    });
  };

  return {
    login
  };
};
export default useFbLogin;
