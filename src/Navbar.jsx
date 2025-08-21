import React from "react"
export default function Navbar(props){
    const[bestRoll, setBestRoll]=React.useState(()=>{
         let lsBestRoll=localStorage.getItem("bestRoll")
          return lsBestRoll ? lsBestRoll : localStorage.setItem("bestRoll",JSON.stringify("0"))
    })


    return(
        <nav>
            <p>Best Roll:1</p>
            <p>Best Time:--</p>
        </nav>
    )
}