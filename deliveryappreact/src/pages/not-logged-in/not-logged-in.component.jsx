import React, {useState} from "react";
import {HashRouter as Router, Switch, Route} from "react-router-dom"
import "./not-logged-in.style.scss";
import {LoginPage} from "../login/login-page.component"
import {RequestUserInfoPage} from "../request-user-info/request-user-info.component"
import {LoadingScreen} from "../Loading-Screen/loading-screen.component"

export const NotLoggedIn = () =>{

    const [loadingState, setLoadingState] = useState(false)

    const isLoading = () =>{

        setLoadingState(prevState => !prevState);
    }

    if (loadingState){
        return(
            <LoadingScreen />
        )
    }else{
        return(

            <Router>
                <div className="not-logged-in-div">
                    <Switch>
                        <Route path="/" exact render={(props) => <LoginPage {...props} LoadingStateFunction={isLoading} />} />
                        <Route path="/requestInfo" exact render={(props) => <RequestUserInfoPage {...props} LoadingStateFunction={isLoading} />} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
