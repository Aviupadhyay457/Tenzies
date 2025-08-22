import Header from './Header'
import MainComponent from './MainComponent'
import React from 'react'
import { nanoid } from 'nanoid'

export default function App(){
  const[dice,setDice]=React.useState(()=>getInitialDice())
  const[count,setCount]=React.useState(0)
  const[time , setTime]=React.useState(0)

  function getInitialDice(){
      return new Array(10).fill(0).map(()=>
          ({  
              value:Math.ceil(Math.random()*6),
              id:nanoid(),
              isHeld:false
          })
      )
  }
  const gameWon=dice.every(die=>die.isHeld===true && die.value===dice[0].value)

  return(
    <div className={gameWon ? "topmost-container shake-element": "topmost-container"}>
      <Header count={count} setCount={setCount} time={time} setTime={setTime} gameWon={gameWon}/>

      <MainComponent   count={count} setCount={setCount} time={time} setTime={setTime}
                     dice={dice} setDice={setDice} getInitialDice={getInitialDice} gameWon={gameWon}/>
    </div>
  )
}