import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux"
import {Link} from "react-router-dom"
import io from "socket.io-client";
import "./default-screen.style.scss";

//COMPONENTS
import { Home } from "../home/home.component";
import { RestaurantPage } from "../../pages/restaurant/restaurant-page.component";
import OrderedScreen from "../../pages/Ordered-screen/ordered-screen.component";
import CartScreen from "../../pages/cart-screen/cart-screen.component"
import WaitScreen from "../../pages/wait-screen/wait-screen.component"
import OrderCompletedScreen from "../../pages/order-complete-screen/order-complete.component"
import AccountScreen from "../../pages/account-screen/account-screen.component"
import ViewCartDocker from "../../components/view-cart-docker/view-cart-docker.component"
import ActiveOrderModal from "../../components/active-order-modal/active-order-modal.component"
import { TopDocker } from "../../components/top-docker/top-docker.component";
import { LocationBar } from "../../components/location-bar/location-bar.component";
import { BottomDocker } from "../../components/bottom-docker/bottom-docker.component";

//ACTIONS
import {orderState} from "../../actions/index"
import {clearCartData} from "../../actions/index"

const socket = io.connect("https://delivery-pal.herokuapp.com/");
export const DefaultScreen = () => {
  let history = useHistory()
  const dispatch = useDispatch()
  // const [loadingState, setLoadingState] = useState(true)
  const userData = useSelector(state =>state.userDataReducer)
  const order = useSelector(state =>state.cartDataReducer.orders)
  const orderStatus = useSelector(state => state.OrderStatusReducer)
  const [activeOrder, setActiveOrder] = useState(false)
  const [row1Animation, setRow1Animation] = useState(false);
  const [bottomDockerAnimation, setBottomDockerAnimation] = useState(false)
  const [classHolder, setClassHolder] = useState("")
  const [restoState, setRestoState] = useState(false);
  const [restaurantOpen, setRrestaurantOpen] = useState(false) // Checks whether restauran page is open to decide if docker logic is applied (docker or view cart) 
  
  useEffect(() => {
    //joins socket to recieve updates if order status is done even if at the home screen
    socket.emit("clientJoin", userData.userId);
    socket.once("orderStatus", (message)=>{
      if(message === "Order Complete"){
        dispatch(orderState(false))
        dispatch(clearCartData())
        localStorage.removeItem("savedChat")
        window.location.href = "/index.html#/orderCompleted"; //for pc testing
        // window.location.href = "file:///android_asset/www/index.html#/orderCompleted";
        // history.push("/orderCompleted")
      }
    })
    
  }, []);
  
  
  const checkRestaurantIfOpen = () =>{
      setRrestaurantOpen(prevState => !prevState);
  }
  const changeRestoState = () => {
    setRow1Animation(prevState => !prevState);

    setTimeout(() => {
      setRestoState(prevState => !prevState);
    }, 200);
  };
  
  const animateMenuIn = () => {
    setRow1Animation(prevState => !prevState);
    setRestoState(prevState => !prevState);
  };
  
  const animateDockerOut = () =>{
    setBottomDockerAnimation(true)
    // console.log(bottomDockerAnimation)
  }
  const animateDockerIn = () =>{ 
    setBottomDockerAnimation(false)
  }
  
  useEffect(() =>{
    if(row1Animation && bottomDockerAnimation){
      setClassHolder({
        // main: "order-page-open",
        docker: "docker-animate-out",
        
      })
      // setClassHolder({
      //   ...classHolder,
      //   docket: "docker-animate-out"
      // })
      // setTimeout(() => {
      //   setClassHolder({
      //     ...classHolder,
      //     main: "order-page-open"
      //   })
      // }, 200);
    }else if (restoState){
      setClassHolder({
        main: "Default-restaurant-open",
        docker: "docker-animate-in"
      })
    }else{
      setClassHolder({
        main: "Main",
        docker: "docker-animate-in"
      })
    }
  }, [restoState, bottomDockerAnimation])

  useEffect(() =>{
    if (orderStatus){
      setActiveOrder(true)
    }else{
      setActiveOrder(false)
      console.log("orderstatus use effetct")
    }
    console.log("orderstatus use effetct")
  }, [orderStatus])

  return (
    <Router>
      {/* <div className={restoState ? "Default-restaurant-open" : "Main"}> */}
      {activeOrder ? <ActiveOrderModal /> : null }
      <div className={classHolder.main}>
        <div className={row1Animation ? "animate-out" : "animate-in"}>
            <LocationBar />
          <div className="Main-row-1-docker">
            <TopDocker />
          </div>
        </div>
        <div className={row1Animation ? "animate-out-2" : "animate-in-2"}>
          <Switch>
            <Route path="/" exact render={props => ( <Home {...props} AnimateDockerIn={animateDockerIn} />)} />
            <Route path="/restaurant" exact render={props => ( <RestaurantPage {...props} checkIfOpen={checkRestaurantIfOpen} AnimateMenuIn={animateMenuIn} RestaurantStateFunction={changeRestoState} />)} />
            <Route path="/account" exact render={props => ( <AccountScreen {...props}  AnimateMenuIn={animateMenuIn} RestaurantStateFunction={changeRestoState} />)} />
            <Route path="/cart" exact  render={props => ( <CartScreen {...props} AnimateDockerOut={animateDockerOut} AnimateMenuIn={animateMenuIn} RestaurantStateFunction={changeRestoState} />)} />
            <Route path="/ordered" exact  render={props => ( <OrderedScreen {...props} socket={socket} AnimateDockerOut={animateDockerOut} AnimateMenuIn={animateMenuIn} RestaurantStateFunction={changeRestoState} />)} />
            <Route path="/wait" exact render={props => ( <WaitScreen {...props} socket={socket} AnimateDockerOut={animateDockerOut} AnimateMenuIn={animateMenuIn} RestaurantStateFunction={changeRestoState} />)} />
            <Route path="/ordercompleted" exact render={props => ( <OrderCompletedScreen {...props}  AnimateDockerOut={animateDockerOut} AnimateMenuIn={animateMenuIn} RestaurantStateFunction={changeRestoState} />)} />

          </Switch>
        </div>
        
         {restaurantOpen ? (order.length === 0) ? <BottomDocker ComponentClass={classHolder.docker} /> : <Link to="/cart"><ViewCartDocker label="View Cart" /> </Link>: <BottomDocker ComponentClass={classHolder.docker} />}
         
          {/* <BottomDocker ComponentClass="docker-animate-out" /> */}
      
        
      </div>
    </Router>
  );
};
