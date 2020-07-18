import React,{useEffect} from "react";
import "./login-page.style.scss";
import LoginLogo from "../../assets/loginLogo.svg"
import useFbLogin from "../../utility functions/utils"

export const LoginPage = (props) =>{
    const {login} = useFbLogin()
    const test = () =>{
        localStorage.setItem("localUserData", "Drew")
        console.log(localStorage.getItem("localUserData"))
    }
    
    
    useEffect(()=>{
        window.fbAsyncInit = function() {
            window.FB.init({
              appId      : '307394926937335',
              cookie     : true,
              xfbml      : true,
              version    : 'v7.0'
            });
              
            window.FB.AppEvents.logPageView();   
          };
        
          (function(d, s, id){
             var js, fjs = d.getElementsByTagName(s)[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement(s); js.id = id;
             js.src = "https://connect.facebook.net/en_US/sdk.js";
             fjs.parentNode.insertBefore(js, fjs);
           }(document, 'script', 'facebook-jssdk'));
        

    },[])

  

  


//    const fbSDKLoaded = () =>{
//         window.FB.getLoginStatus( (response) => {
//                 console.log(response)

//         });
//    }
    
    const runOnFBLogin = () =>{
        props.LoadingStateFunction()
        login(props.LoadingStateFunction)
        
    }



    return(
        <div className="login-page-div">
            <div className="login-page-row-1">
                <img src={LoginLogo} alt="Login Logo" className="login-page-logo"/>
                <h1 className="login-page-header-text">
                    Food and groceries from the<br/> comfort of your own home
                </h1>
            </div>
            <div className="login-page-row-2">
                <button onClick={test} className="login-plain-btn sign-in-btn">Register</button>
                <button onClick={runOnFBLogin} className="login-fb-btn sign-in-btn">Sign in with Facebook</button>
                <h1 className="already-have-an-account-text">Already have an account?</h1>
            </div>

            
                
        </div>
    )
}