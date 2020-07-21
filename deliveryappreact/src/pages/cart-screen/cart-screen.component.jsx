import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {clearCartData} from "../../actions/index"
import {Link} from "react-router-dom"
import Styles from "./cart-screen.module.scss"

//COMPONENTS
import CartOrder from "../../components/cart-order/cart-order.component"
import ViewCart from "../../components/view-cart-docker/view-cart-docker.component"

const CartScreen = () =>{
    const dispatch = useDispatch();
    const orderStatus = useSelector(state => state.OrderStatusReducer)
    console.log(orderStatus)
    const order = useSelector(state => state.cartDataReducer)
    const [orderArray, setOrderArray] = useState(order.orders)
    
    //FUNCTIONS
    const clearCart = () =>{
        // window.location.reload()
        dispatch(clearCartData())
    }
    
    const render = () =>{
        return orderArray.map((el,index) => <CartOrder index={index} orderQuantity={el.orderQuantity} orderName={el.name} toPay={el.price} />)
    }
    
    useEffect(()=>{
        render()
    },[order])
    
    return(
        <div className={Styles.screen}>
            <div className={Styles.orderContainer}>
                {order.orders.map((el,index) => <CartOrder index={index} orderQuantity={el.orderQuantity} orderName={el.name} toPay={el.price} />)}
               
            </div>
            <div className={Styles.clearBtnContainer}>
                <button onClick={clearCart} className={Styles.clearBtn}>Clear Cart</button>
            </div>
            
            {(orderStatus) ? (
                <ViewCart label="ORDER IN PROGRESS" />
            ) 
            : (
                <Link to="/wait">
                <ViewCart label="PLACE ORDER" />
                </Link>
            ) }
            
        </div>
    )
}

export default CartScreen;