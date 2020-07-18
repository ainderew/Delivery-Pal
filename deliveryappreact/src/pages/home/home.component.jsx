import React, { useEffect, useState, useRef } from "react";
import "./home.style.scss";

import { BrandCard } from "../../components/brand-card/brand-card.component";
import { MiniLoadingScreen } from "../Loading-Screen/mini-loading-screen.component";




export const Home = ({AnimateDockerIn}) => {
  

  const homeScreen = useRef(null);

  const setHomeScreenScrollable = () => {
    homeScreen.current.style.overflowY = "auto";
  };

  const [restaurants, setRestaurants] = useState([]);
  const [loadingState, setLoadingState] = useState(true);

  const LoadingSetter = () => {
    setLoadingState(prevState => !prevState);
  };

  useEffect(() => {
    if (sessionStorage.getItem("restaurantData") !== null) {
      setRestaurants(JSON.parse(sessionStorage.getItem("restaurantData")));
    } else {
      fetch("https://delivery-pal.herokuapp.com/getRestaurantData", {
        method: "GET",
        mode: "cors",
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setRestaurants(data);
          // setLoadingState( prevState => !prevState)
          sessionStorage.setItem("restaurantData", JSON.stringify(data));
        });
    }
  }, []);
  
  useEffect(()=>{
    AnimateDockerIn()
  }, [])

  return (
    <div ref={homeScreen} className="home-div">
      {loadingState ? <MiniLoadingScreen /> : null}
      {restaurants.map((el, index) => {
        if (
          index === restaurants.length - 1 &&
          (restaurants.length - 1) % 2 === 0
        ) {
          return (
            <div key={index} className="test-grid-1">
              <BrandCard
                Logo={el.restaurantImage}
                Name={el.name}
                Tagline={el.tagline}
                Color={el.restaurantColor}
                LoadingFunction={LoadingSetter}
                RestaurantData={el}
                index={index}
                lastIndex={restaurants.length - 1}
                scrollFunction={setHomeScreenScrollable}
              />
            </div>
          );
        } else if (
          index === restaurants.length - 1 &&
          (restaurants.length - 1) % 2 !== 0
        ) {
          return (
            <div key={index} className="test-grid-2">
              <BrandCard
                Logo={el.restaurantImage}
                Name={el.name}
                Tagline={el.tagline}
                Color={el.restaurantColor}
                LoadingFunction={LoadingSetter}
                RestaurantData={el}
                index={index}
                lastIndex={restaurants.length - 1}
                scrollFunction={setHomeScreenScrollable}
              />
            </div>
          );
        } else if (index % 2 === 0) {
          return (
            <div key={index} className="test-grid-1">
              <BrandCard
                Logo={el.restaurantImage}
                Name={el.name}
                Tagline={el.tagline}
                Color={el.restaurantColor}
                RestaurantData={el}
                index={index}
                lastIndex={restaurants.length - 1}
              />
            </div>
          );
        } else {
          return (
            <div key={index} className="test-grid-2">
              <BrandCard
                Logo={el.restaurantImage}
                Name={el.name}
                Tagline={el.tagline}
                Color={el.restaurantColor}
                RestaurantData={el}
                index={index}
                lastIndex={restaurants.length - 1}
              />
            </div>
          );
        }
      })}
    </div>
  );
};
