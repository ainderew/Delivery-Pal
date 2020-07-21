import React,{useState,useEffect} from "react";
import {useDispatch,useSelector} from "react-redux";
import {cartData} from "../../actions/index";
import "./add-to-cart-modal.style.scss";

export const AddToCartModal = ({closeModal, classState, foodData, restaurantName}) =>{

    const dispatch = useDispatch();
    // const currentRestaurantName = useSelector( state => state.cartDataReducer.restaurantName)
  
    
    const [counterElement, setCounterElement] = useState(1)
    const [minuBtnclass, setMinusBtnClass] = useState("add-modal-minus grey")
    const [orderData, setOrderData] = useState({
        restaurantName: "",
        orders: {
            name: "",
            price: "",
            orderQuantity: counterElement
        }
    })
    
    const increment = () =>{
        setCounterElement( prevState => prevState+=1)
        setMinusBtnClass("add-modal-minus")
    }
    
    const decrement = () =>{
        if (counterElement === 1){
            
        }else if (counterElement === 2){
            setMinusBtnClass("add-modal-minus grey")
            setCounterElement( prevState => --prevState)
         }else{
             setCounterElement( prevState => --prevState)
         }
    }

    // useEffect(() => {
       
    //     if(currentRestaurantName === ""){
    //         console.log("null and ok")
    //     }else if( currentRestaurantName=== restaurantName){
    //         console.log("still restoname")
    //     }else{
    //         console.log("different restaurant")
    //     }
    // }, [restaurantName]);

    useEffect(() => {
        setOrderData({
            restaurantName: restaurantName,
            orders: {
                name: foodData.name,
                price: foodData.price,
                orderQuantity: counterElement
            }
        })
    }, [counterElement]);
   
    
    
   

    const addToCart = () =>{
        console.log(orderData)
        dispatch(cartData(orderData))
        closeModal()
    }

    return(
        <div className={classState}>
            <div className="add-modal-food-info-div">
                <div className="add-modal-food-info-left">
                    <h1 className="add-modal-name">{foodData.name}</h1>
                    <h1 className="add-modal-description">{foodData.description}</h1>
                    <h1 className="add-modal-price">₱{(foodData.price * counterElement)}</h1>
                </div>

                <div className="add-modal-food-info-right">
                    <button onClick={decrement} className={minuBtnclass}>-</button>
                    <h1 className="add-modal-counter"> {counterElement} </h1>
                    <button onClick={increment} className="add-modal-add">+</button>
                </div>
            </div>

            <div className="add-modal-aditional-div">

            </div>

            <div className="add-modal-btn-div">
                <button onClick={closeModal} className="add-modal-cancel-btn">Cancel</button>
                <button onClick={()=>addToCart()} className="add-modal-add-btn">Add to cart</button>
            </div>
        </div>
    )
}