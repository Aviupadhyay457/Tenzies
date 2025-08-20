import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import multipleSound from "./assets/mulitple-dice-roll.mp3"
import Confetti from 'react-confetti'

export default function MainComponent(){
    const[dice,setDice]=React.useState(()=>getInitialDice())
    const[count,setCount]=React.useState(0)
    const[time , setTime]=React.useState(0)
    React.useEffect(()=>{
        let timer=setInterval(()=>setTime(oldtime=>oldtime+1),1000)
        return function(){
            timer.clearInterval(timer)
        }
    },[])
    
    function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay; 
    }
    const gameWon=dice.every(die=>die.isHeld===true && die.value===dice[0].value)
    function getInitialDice(){
        return new Array(10).fill(0).map(()=>
            ({
                value:Math.ceil(Math.random()*6),
                id:nanoid(),
                isHeld:false
            })
        )
    }

    function DieToggle(id){
        setDice((oldDice)=>{
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
           dice.map((ele)=>(
            <Die key={ele.id} id={ele.id} value={ele.value} isHeld={ele.isHeld} dieToggle={DieToggle} />
           )) 
        )
    }
    function handleBtnClick(){
        
        if(gameWon){
            setDice(getInitialDice())
            setCount(0)
        }
        else{
            setDice((oldDice)=>{
                return oldDice.map((die)=>{
                    if(die.isHeld===true){
                        return die
                    }
                    else{return( {...die,value:Math.ceil(Math.random()*6)})
                    }
                })})
            setCount(count+1)
        
            }
        }
        


    console.log(dice)
    return(
        <main className="hero-container">

            <div className="dice-container">
                {dieElements()}
            </div>
            <button onClick={handleBtnClick}>{gameWon?"New Game":"Roll Dice"}</button>
            <section>
                <p>Roll:{count}</p>
                <p>Time:{secondsToHms(time)}</p>
            </section>
            {gameWon && <Confetti/>}
        </main>
    )
}