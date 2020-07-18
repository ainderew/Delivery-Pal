import React, {useState} from "react";
import "./top-docker.style.scss"
import { DockerItem } from "./docker-item/docker-item.component";
import DockerAll from "../../assets/docker_all.svg"
import DockerAllSelected from "../../assets/docker_all_selected.svg"
import Pizza from "../../assets/docker_pizza.svg"
import PizzaSelected from "../../assets/docker_pizza_selected.svg"
import FastFood from "../../assets/docker_fastFood.svg"
import FastFoodSelected from "../../assets/docker_fastFood_selected.svg"
import Cake from "../../assets/docker_cake.svg"
import CakeSelected from "../../assets/docker_cake_selected.svg"
import Grocery from "../../assets/docker_grocery.svg"
import GrocerySelected from "../../assets/docker_grocery_selected.svg"

export const TopDocker = () =>{
    const [state, setState] = useState([
        {
            icon: DockerAllSelected,
            normalIcon: DockerAll,
            className: "docker-item-div docker-item-active",
            status: true
        },
        {   
            icon: Grocery,
            normalIcon: Grocery,
            className: "docker-item-div",
            status: false

        },
      
        {
            icon: Pizza,
            normalIcon: Pizza,
            className: "docker-item-div",
            status: false
        },
        {   
            icon: Cake,
            normalIcon: Cake,
            className: "docker-item-div",
            status: false

        },
      
        {
            icon: FastFood,
            normalIcon: FastFood,
            className: "docker-item-div",
            status: false

        },
        {
            active: 0
        }
        
    ])

    
   const CASE_FUNCTION = (index) =>{
       let activeIcon=""
       if (index === 0){
            activeIcon = DockerAllSelected
       }else if (index === 1){
            activeIcon = GrocerySelected
       }else if (index === 2){
            activeIcon = PizzaSelected
       }else if (index === 3) {
            activeIcon = CakeSelected
       }else if (index === 4) {
            activeIcon = FastFoodSelected
       }
    setState([
        ...state,
        state[index].icon = activeIcon,
        state[index].status = true,
        state[index].className = "docker-item-div docker-item-active",
        state[state[5].active].icon = state[state[5].active].normalIcon,
        state[state[5].active].className = "docker-item-div",
        state[state[5].active].status = false,
        state[5].active = index
    ])

   }

    const dockerClick = (index) =>{
        console.log("clicked")
        CASE_FUNCTION(index)
    //    switch (index){
    //        case index:
    //           CASE_FUNCTION(index)
    //            break;
    //         case 1:
    //            CASE_FUNCTION(index)
    //            break;
    //         case 2:
    //             CASE_FUNCTION(index)
    //             break;
    //         case 3:
    //             CASE_FUNCTION(index)
    //             break;
    //         case 4:
    //             CASE_FUNCTION(index)
    //             break;
    //         default:
    //             break;
       
    //    }    
    }

    return (

            <ul className="top-docker-ul">
                <DockerItem icon={state[0].icon} name={"All"} Display={state[0].className} Status={state[0].status} ParentFunction={dockerClick} index={0} />
                <DockerItem icon={state[1].icon} name={"Grocery"} Display={state[1].className} Status={state[1].status} ParentFunction={dockerClick} index={1}/>
                <DockerItem icon={state[2].icon} name={"Pizza"} Display={state[2].className} Status={state[2].status} ParentFunction={dockerClick} index={2}/>
                <DockerItem icon={state[3].icon} name={"Cake"} Display={state[3].className} Status={state[3].status} ParentFunction={dockerClick} index={3}/>
                <DockerItem icon={state[4].icon} name={"Fast Food"} Display={state[4].className} Status={state[4].status} ParentFunction={dockerClick} index={4}/>
             </ul>

        

    )
}