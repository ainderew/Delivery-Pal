import React from "react";
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import {restaurantData} from "../../actions/index";
import "./brand-card.style.scss";
import BrandGo from "../../assets/brand-go.svg"


export const BrandCard = ({RestaurantData, index, lastIndex,scrollFunction,LoadingFunction}) =>{
    const history = useHistory();
    const dispatch = useDispatch();


    const getRestaurant = (e) =>{
        e.preventDefault();
        dispatch(restaurantData(RestaurantData))
        history.push("/restaurant")
    }
    
    const onLoadFunction = () =>{
        scrollFunction()
        LoadingFunction()
    }
    return(
        <div className="brand-card-div" style={{backgroundColor: `#${RestaurantData.restaurantColor}`}} onClick={getRestaurant} >
            <div className="brand-card-row-1">
               {(index === lastIndex) ? 
                     <img onLoad={onLoadFunction} className="brand-logo" src={`https://delivery-pal.herokuapp.com/${RestaurantData.restaurantImage}`} alt=""/>:
                     <img className="brand-logo" src={`https://delivery-pal.herokuapp.com/${RestaurantData.restaurantImage}`} alt=""/>
               }
            </div>
            <div className="brand-card-row-2">
                <h1 className="brand-name"> {RestaurantData.name} </h1>
                <h2 className="brand-tag-line"> {RestaurantData.tagline} </h2>
                <img className="brand-go-svg" src={BrandGo} alt="go to store page"/>
            </div>
        </div>
    )
}