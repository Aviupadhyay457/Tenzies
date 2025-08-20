import React from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import multipleSound from "./assets/mulitple-dice-roll.mp3"
import Confetti from 'react-confetti'

export default function MainComponent(){
    const[dice,setDice]=React.useState(()=>getInitialDice())
    const[count,setCount]=React.useState(0)

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
                <p>Time:</p>
            </section>
            {gameWon && <Confetti/>}
        </main>
    )
}