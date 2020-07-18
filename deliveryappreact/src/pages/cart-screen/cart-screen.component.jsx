import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom"
import Styles from "./cart-screen.module.scss"

//COMPONENTS
import CartOrder from "../../components/cart-order/cart-order.component"
import ViewCart from "../../components/view-cart-docker/view-cart-docker.component"

const CartScreen = () =>{
    const orderStatus = useSelector(state => state.OrderStatusReducer)
    console.log(orderStatus)
    const order = useSelector(state => state.cartDataReducer)
    const [orderArray, setOrderArray] = useState(order.orders)
    
    return(
        <div className={Styles.screen}>
            <div className={Styles.orderContainer}>
                {orderArray.map((el,index) => <CartOrder orderQuantity={el.orderQuantity} orderName={el.name} toPay={el.price} />)}
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