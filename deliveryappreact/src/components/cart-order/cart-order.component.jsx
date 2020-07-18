import React from "react";
import Styles from "./cart-order.module.scss";

const CartOrder = ({ orderName, orderQuantity, toPay }) => {
  return (
    <div className={Styles.container}>
      <div className={Styles.quantityContainer}>
        <h1 className={Styles.counterBtn}>-</h1>
        <h1 className={Styles.quantity}>{orderQuantity}</h1>
        <h1 className={Styles.counterBtn}>+</h1>
      </div>
      <div className={Styles.nameContainer}>
        <h1 className={Styles.name}>{orderName}</h1>
      </div>
      <div className={Styles.amountContainer}>
        <h1 className={Styles.amount}>₱ {toPay}</h1>
      </div>
    </div>
  );
};

export default CartOrder;
