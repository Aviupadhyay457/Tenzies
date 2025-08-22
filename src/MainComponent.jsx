import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import multipleSound from "./assets/mulitple-dice-roll.mp3"
import Confetti from 'react-confetti'

export default function MainComponent(props){
    // const[dice,setDice]=React.useState(()=>getInitialDice())
    // const[count,setCount]=React.useState(0)
    // const[time , props.setTime]=React.useState(0)
    const[shouldRunTimer, SetShouldRunTimer]=React.useState(false)
    // const gameWon=dice.every(die=>die.isHeld===true && die.value===dice[0].value)
    let diceRollAudio = new Audio(multipleSound)

    React.useEffect(()=>{
        if(shouldRunTimer){
            let timer=setInterval(()=>props.setTime(oldtime=>oldtime+1),1000)
            return function(){
                clearInterval(timer)
            }
        }

    },[shouldRunTimer])

    React.useEffect(()=>{
        if(props.gameWon){
            console.log("it works")
            props.setCount(0)
            SetShouldRunTimer(false)
            props.setTime(0)
        }

    },[props.gameWon])


    
    function secondsToHms(d) {
        if (d===0){
            return "0 second"
        }
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? " h, " : " h, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " m, " : " m, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
        return hDisplay + mDisplay + sDisplay; 
    }

    



    // function getInitialDice(){
    //     return new Array(10).fill(0).map(()=>
    //         ({  
    //             value:6,
    //             // value:Math.ceil(Math.random()*6),
    //             id:nanoid(),
    //             isHeld:false
    //         })
    //     )
    // }

    function DieToggle(id){
        if(props.gameWon){
            return null
        }
        props.setDice((oldDice)=>{
           return oldDice.map((die)=>{
                if (die.id===id){
                    return(
                        {
                            ...die, 
                            isHeld:!(die.isHeld)
                        }
                    )
                }
                else{
                    return die
                }
            })
        })
    }

    function dieElements(){
        return(
           props.dice.map((ele)=>(
            <Die key={ele.id} id={ele.id} value={ele.value} isHeld={ele.isHeld} dieToggle={DieToggle} />
           )) 
        )
    }
    function handleBtnClick(){
        if(props.gameWon){
            props.setDice(props.getInitialDice)

        }
        else{
            diceRollAudio.play()
            props.setDice((oldDice)=>{
                return oldDice.map((die)=>{
                    if(die.isHeld===true){
                        return die
                    }
                    else{return( {...die,value:Math.ceil(Math.random()*6)})
                    }
                })})

            props.setCount(props.count+1)
            
            if(shouldRunTimer===false){
                SetShouldRunTimer(true)
            }

            }
        }
        


    // console.log(dice)
    return(
        <main className="hero-container">

            <div className="dice-container">
                {dieElements()}
            </div>
            <button onClick={handleBtnClick}>{props.gameWon?"New Game":"Roll Dice"}</button>
            <section>
                <p>Roll:{props.count}</p>
                <p>Time:{secondsToHms(props.time)}</p>
            </section>
            {props.gameWon && <Confetti/>}
        </main>
    )
}