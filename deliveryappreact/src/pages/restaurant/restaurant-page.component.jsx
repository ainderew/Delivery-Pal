import React, {useState,useEffect} from "react";
import {useSelector} from "react-redux"
import "./restaurant-page.style.scss";
import {WhiteLoadingScreen} from "../Loading-Screen/white-loading-screen.component";
import {AddToCartModal} from "../../components/add-to-cart-modal/add-to-cart-modal.component";


//IMAGE IMPORTS
import FavoriteAddSVG from "../../assets/favorite_add.svg"
import FavoriteAddedSVG from "../../assets/favorite_added.svg"

export const RestaurantPage = ({checkIfOpen, RestaurantStateFunction, AnimateMenuIn}) =>{

    const restaurantData = useSelector( state => state.restaurantDataReducer);
    const {schedule,name,restaurantImage,menu} = restaurantData;
    // const menuId = useSelector( state => state.restaurantDataReducer.menu)
    // const restaurantName = useSelector( state => state.restaurantDataReducer.name)

    const [loadingState, setLoadingState] = useState(true)
    const [menuList, setMenuList] = useState([])

    const [modalState,setModalState] = useState({
        name: "",
        price: ""
    })

    const [addToCartState, setAddToCartState] = useState(false)

    const addToCart = (foodName,foodPrice,foodDescription) =>{
        console.log(foodName)
        toggleModal()
        setModalState({
            name: foodName,
            price: foodPrice,
            description: foodDescription
        })
    }

    const toggleModal = () =>{
        setAddToCartState(prevState => !prevState)
    }


    useEffect(()=>{
            checkIfOpen() // Sets the state that checks if restaurant is open to true
            const menuObj = {
                menuId: menu
            }
            fetch("https://delivery-pal.herokuapp.com/getRestaurantData/menuData",{
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(menuObj)

            })
            .then( response => response.json())
            .then( data => {
                console.log(data)
                setMenuList(data.menuList)
                setLoadingState( prevState => !prevState)
                sessionStorage.setItem("restaurantPage", JSON.stringify(data.menuList))
            })
        // }

       
        RestaurantStateFunction();

        return () =>{
            AnimateMenuIn();
            checkIfOpen(); // Sets state that checks if restaurant is open to false on dismount
        }
    },[])




    const [faveState, setFaveState] = useState(false)
    const changeFaveState = () =>{
        setFaveState( prevState => !prevState)
    }




// TOUCH TO SCROLL TO MENU SECTION
  const itemRefs = {};
  const scrollTo = (id) =>{
    itemRefs[id].scrollIntoView();
  }
 


    if (loadingState){
        return <WhiteLoadingScreen />

    }else{
        return(
            <div className="restaurant-page-div">
              
                {/* ADD TO CART MODAL */}
                {addToCartState ? <AddToCartModal classState="add-to-cart-modal-div"
                    foodData={modalState}
                    restaurantName={name}
                    closeModal={toggleModal}
                />: null}

                <div className="restaurant-header">
                    <div className="restaurant-header-img-div">
                        <img src={`https://delivery-pal.herokuapp.com/${restaurantImage}`} alt="Restaurant Logo" className="restaurant-header-img"/>
                    </div>
    
                    <div className="restaurant-header-details">
                        <h1 className="restaurant-header-name"> {name} </h1>
                        <h2 className="restaurant-header-schedule">8:00am - 8:00pm</h2>
                        
                        <button onClick={changeFaveState} className="restaurant-header-favorite-btn">
                            <img src={(faveState) ? FavoriteAddedSVG: FavoriteAddSVG} alt="" className="restaurant-header-favorite-btn-img"/>
                        </button>
                            {/* <h2 className="restaurant-header-favorite-text">Add to favorites</h2> */}
                     
                    </div>
    
                </div>
    
    
                <div className="restaurant-page-menu">
                    <ul className="restaurant-page-menu-ul">
                        {menuList.map((el,index) => {
                            
                            return <li key={index} onClick={()=> scrollTo(index)} 
                            className="restaurant-page-menu-li">
                                <h1 className="restauran-page-menu-text">{el.menuSection}</h1></li>
                        })}
                        
                    </ul>
                </div>
    
    
                <div className="restaurant-main-menu">
                    <ul className="restaurant-page-menu-sections">
                        {menuList.map((el,index) => {
                            return <li
                            key={index}
                             ref={el => (itemRefs[index] = el)}
                             className="restaurant-page-menu-sections-li">
                                <div className="restaurant-page-menu-sections-li-div">
                                    <h1 id={el.menuSection} className="menu-sections-li-header"> {el.menuSection}</h1>
                                    <ul className="restaurant-page-menu-food-ul">
                                        {el.food.map((item,index) =>{
                                            return <li key={index} className="restaurant-page-menu-food-li">
                                                <div className="menu-food-li-div">
                                                    <h1 className="menu-food-li-name"> {item.Name} </h1>
                                                    <h1 className="menu-food-li-description"> {item.Description} </h1>
                                                    <h1 className="menu-food-li-price"> ₱ {item.Price} </h1>
                                                </div>
                                              
                                               <div className="menu-food-li-btn-div">
                                                    <button onClick={()=>addToCart(item.Name,item.Price,item.Description)} className="menu-food-li-add-btn">Add to cart</button>
                                               </div>
                                                
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </li>
                        })}
                    </ul>
                
                </div>        
    
               
            </div>
        )
    }
}