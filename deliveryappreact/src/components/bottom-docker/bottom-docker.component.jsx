import React,{useState} from "react";
import {useHistory, Link} from "react-router-dom";
import "./bottom-docker.style.scss";
import homeSVG from "../../assets/home.svg"
import home_selectedSVG from "../../assets/home_selected.svg"
import favoriteSVG from "../../assets/favorite.svg"
import favorite_selectedSVG from "../../assets/favorite_selected.svg"
import cartSVG from "../../assets/cart.svg"
import cart_selectedSVG from "../../assets/cart_selected.svg"
import userSVG from "../../assets/user.svg"
import user_selectedSVG from "../../assets/user_selected.svg"


export const BottomDocker = ({ComponentClass}) =>{
    const history = useHistory();

    const [state, setState] = useState([
        {
            icon: home_selectedSVG,
            normalIcon: homeSVG,
            className: "docker-link-text dockerActive",
            status: true
        },
        {
            icon: favoriteSVG,
            normalIcon: favoriteSVG,
            className: "docker-link-text",
            status: false

        },
        {
            icon: cartSVG,
            normalIcon: cartSVG,
            className: "docker-link-text",
            status: false
        },
        {   
            icon: userSVG,
            normalIcon: userSVG,
            className: "docker-link-text",
            status: false

        },
        {
            active: 0
        }
        
    ])

    
   const CASE_FUNCTION = (index) =>{
       let activeIcon=""
       if (index === 0){
            activeIcon = home_selectedSVG
       }else if (index === 1){
            activeIcon = favorite_selectedSVG
       }else if (index === 2){
            activeIcon = cart_selectedSVG
       }else if (index === 3) {
            activeIcon = user_selectedSVG
       }
    setState([
        ...state,
        state[index].icon = activeIcon,
        state[index].status = true,
        state[index].className = "docker-link-text dockerActive",
        state[state[4].active].icon = state[state[4].active].normalIcon,
        state[state[4].active].className = "docker-link-text",
        state[state[4].active].status = false,
        state[4].active = index
    ])

   }

    const dockerClick = (key,index) =>{

       switch (key){
           case "home":
              CASE_FUNCTION(index)
              
            //   history.push("/restaurant")
               break;
            case "favorite":
               CASE_FUNCTION(index)
               localStorage.clear();    
               break;
            case "cart":
                CASE_FUNCTION(index)
                break;
            case "user":
                CASE_FUNCTION(index)
                break;
            default:
                break;
       
       }    
    }
    const goHome = () =>{
        history.replace("/")  
    }


    return(
        <div className={ComponentClass}>
            <ul className="docker-ul">
                <Link to="/">
                    <li className="docker-li" onClick={(state[0].status===false)?() => dockerClick("home",0):null}>
                    
                        <div className="docker-link-div">
                            <img src={state[0].icon} alt="" className="docker-img"/>
                            <h1 className={state[0].className}>Home</h1>
                        </div>
                    
                    </li>
                </Link>
                <li className="docker-li" onClick={(state[1].status===false)?() => dockerClick("favorite",1):null } >
                   
                    <div className="docker-link-div">
                        <img src={state[1].icon} alt="" className="docker-img"/>
                        <h1 className={state[1].className}>Favourites</h1>
                    </div>
                    
                </li>
                <Link to="/cart">
                    <li className="docker-li" onClick={(state[2].status===false)?() => dockerClick("cart",2):null } >
                    
                        <div className="docker-link-div">
                            <img src={state[2].icon} alt="" className="docker-img"/>
                            <h1 className={state[2].className}>Cart</h1>
                        </div>
                        
                    </li>
                </Link>
                
                <li className="docker-li" onClick={(state[3].status===false)?() => dockerClick("user",3):null } >
                 
                    <div className="docker-link-div">
                        <img src={state[3].icon} alt="" className="docker-img"/>
                        <h1 className={state[3].className}>Account</h1>
                    </div>
              
                </li>
            </ul>
        </div>
    )
}