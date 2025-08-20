import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
export default function MainComponent(){
    const[dice,setDice]=React.useState(()=>getInitialDice())
    const gameWon=dice.every(die=>die.isHeld===true && die.value===dice[0].value)
    if(gameWon){
        console.log("congrats")
    }
    function getInitialDice(){
        return new Array(6).fill(0).map(()=>
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
        setDice((oldDice)=>{
            return oldDice.map((die)=>{
                if(die.isHeld===true){
                    return die
                }
                else{
                    return( {
                        ...die,
                        value:Math.ceil(Math.random()*6)
                    })
                }
            })
        })
    }



    console.log(dice)
    return(
        <main className="hero-container">
            <div className="dice-container">
                {dieElements()}
            </div>
            <button onClick={handleBtnClick}>Roll Dice</button>
        </main>
    )
}