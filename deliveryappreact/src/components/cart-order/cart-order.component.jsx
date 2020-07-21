import React, {useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux"
import {updateCartData} from "../../actions/index"
import Styles from "./cart-order.module.scss";

const CartOrder = ({ index, orderName, orderQuantity, toPay }) => {
  const dispatch = useDispatch();
  const orderData = useSelector(state => state.cartDataReducer)
  const [updatedReducer, setUpdatedReducer] = useState(orderData)
  const [newQuantity, setNewQuantity] = useState(parseInt(orderQuantity))
  
  const changeNumber = () =>{
    updatedReducer.orders[index] = {
      ...updatedReducer.orders[index],
      orderQuantity: newQuantity
    }
    
    setUpdatedReducer(updatedReducer)
    dispatch(updateCartData(updatedReducer))
    
  }
  
  const increment = () =>{
    setNewQuantity(newQuantity => newQuantity+1)
    updateChangeDetector()
  }
  const decrement = () =>{
    if (newQuantity !== 1){
      setNewQuantity(newQuantity => newQuantity-1)
      updateChangeDetector()
    }
  }
  
  const updateChangeDetector = () =>{
    setUpdatedReducer({
      ...updatedReducer,
      [updatedReducer.changes]: updatedReducer.changes++
    })
  }
  
  useEffect(()=>{
    changeNumber()
  },[newQuantity])
  
  return (
    <div className={Styles.container}>
      <div className={Styles.quantityContainer}>
        <h1 onClick={decrement} className={Styles.counterBtn}>-</h1>
        <h1 className={Styles.quantity}>{newQuantity}</h1>
        <h1 onClick={increment} className={Styles.counterBtn}>+</h1>
      </div>
      <div className={Styles.nameContainer}>
        <h1 className={Styles.name}>{orderName}</h1>
      </div>
      <div className={Styles.amountContainer}>
        <h1 className={Styles.amount}>₱ {toPay * newQuantity}</h1>
      </div>
    </div>
  );
};

export default CartOrder;
