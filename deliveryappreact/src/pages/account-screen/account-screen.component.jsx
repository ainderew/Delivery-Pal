import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux"
import Styles from "./account-screen.module.scss";


import AccountImg from "../../assets/account.svg"
const AccountScreen = ({RestaurantStateFunction, AnimateMenuIn}) =>{
    const userData = useSelector(state => state.userDataReducer)
    const [input, setInput] = useState({
        name: "",
        location: ""
    })
    const [isInputEmpty, setIsInputEmpty] = useState(true)
    
    useEffect(() =>{
        RestaurantStateFunction()
        
        return() =>{
            AnimateMenuIn()
        }
    },[])
    
    useEffect(()=>{
        if (input.name || input.location !== ""){
            setIsInputEmpty(false)
        }else{
            setIsInputEmpty(true)
        }
    },[input])
    
    
    //FUNTIONS
    const onInput = (e) =>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    return(
        <div className={Styles.screen}>
            <div className={Styles.upper}>
                <img src={AccountImg} alt="" className={Styles.img}/>
            </div>
            <div className={Styles.lower}>
                <form className={Styles.form}>
                    <div className={Styles.formRow}>
                        <label htmlFor="name" className={Styles.label}>Change Name</label>
                        <input value={input.name} onChange={onInput} placeholder={userData.name} autoComplete="off" type="text" name="name" className={Styles.input}/>
                    </div>
                    <div className={Styles.formRow}>
                        <label htmlFor="location" className={Styles.label}>Default location</label>
                        <input value={input.location} onChange={onInput} placeholder ={userData.location} autoComplete="off" type="text" name="location" className={Styles.input}/>
                    </div>
                  
                    {(isInputEmpty) ? null : <button className={Styles.saveBtn}>Save Changes</button>}
                    
                </form>
                <h1 className={Styles.rewards}>Rewards: <span className={Styles.span}>Comming Soon</span></h1>
                <div className={Styles.logoutContainer}>
                    <button className={Styles.logoutBtn}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default AccountScreen;