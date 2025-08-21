import React from "react"
export default function Navbar(props){
    // const[bestRoll, setBestRoll]=React.useState(()=>{
    //      let lsBestRoll=localStorage.getItem("bestRoll")
    //       return lsBestRoll || "0"
    // })

    const [bestRoll,setBestRoll]=React.useState(()=>
    {
        return localStorage.getItem("bestRoll")||localStorage.setItem("bestRoll",JSON.stringify(""))
    })
        const [bestTime,setBestTime]=React.useState(()=>
    {
        return localStorage.getItem("bestTime")||localStorage.setItem("bestTime",JSON.stringify(""))
    })

    function secondsToHms(d) {
        if (d===0){
            return "0 second"
        }
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hDisplay + mDisplay + sDisplay; 
    }


    React.useEffect(()=>{
        if(props.gameWon){
            if(bestRoll>props.count || JSON.parse(bestRoll)===""){
                localStorage.setItem("bestRoll",JSON.stringify(props.count))
                setBestRoll(localStorage.getItem("bestRoll"))
            }
            if(bestTime>props.time || JSON.parse(bestTime)===""){
                localStorage.setItem("bestTime",JSON.stringify(props.time))
                setBestTime(localStorage.getItem("bestTime"))
            }
        }
    },[props.gameWon])

    return(
        <nav>
            <p>Best Roll:{JSON.parse(bestRoll)}</p>
            <p>Best Time:{secondsToHms(JSON.parse(bestTime))}</p>
        </nav>
    )
}