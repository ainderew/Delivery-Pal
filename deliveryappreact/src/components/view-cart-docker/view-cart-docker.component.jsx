import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import Styles from "./view-cart-docker.module.scss";

const CartDocker = ({label}) =>{
    const order = useSelector(state => state.cartDataReducer)
    const [orderArray, setOrderArray] = useState(order.orders)
    const [totalPayment, setTotalPayment] = useState("0")
    
    useEffect(() => {
        let payment  = 0;
        order.orders.forEach(el => payment += parseFloat(el.price))
        
        setTotalPayment(payment)
        
        // return () => {
        //     cleanup
        // };
    }, [order]);
    return(
        <div className={Styles.container}>
            <div className={Styles.quantityContainer}>
             <h1 className={Styles.quantity}>{order.orders.length}</h1>
            </div>
           
            <h1 className={Styles.h1}>{label}</h1>
            
            <h1 className={Styles.payment}>₱ {totalPayment}</h1>
        </div>
    )
}

export default CartDocker;