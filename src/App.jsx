import Header from './Header'
import MainComponent from './MainComponent'
import React from 'react'
import { nanoid } from 'nanoid'

export default function App(){
  const[dice,setDice]=React.useState(()=>getInitialDice())
  const[count,setCount]=React.useState(0)
  const[time , setTime]=React.useState(0)
  

  const [bestRoll,setBestRoll]=React.useState(()=>
  {
      return localStorage.getItem("bestRoll")||localStorage.setItem("bestRoll",JSON.stringify(""))
  })

  const [bestTime,setBestTime]=React.useState(()=>
  {
      return localStorage.getItem("bestTime")||localStorage.setItem("bestTime",JSON.stringify(""))
  })

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

  let isRollRecordBroken=false
  let isTimeRecordBroken=false
  if(gameWon){
    if(count<bestRoll){
      isRollRecordBroken=true
    }
    if(time<bestTime){
      isTimeRecordBroken=true
    }
  }
  console.log(isRollRecordBroken)
  console.log(isTimeRecordBroken)

  return(
    <div className={gameWon ? "topmost-container shake-element": "topmost-container"}>
      <Header count={count} setCount={setCount} time={time} setTime={setTime} gameWon={gameWon} 
                    bestRoll={bestRoll} bestTime={bestTime} setBestRoll={setBestRoll} setBestTime={setBestTime}
                    isRollRecordBroken={isRollRecordBroken} isTimeRecordBroken={isTimeRecordBroken}/>

      <MainComponent   count={count} setCount={setCount} time={time} setTime={setTime}
                     dice={dice} setDice={setDice} getInitialDice={getInitialDice} gameWon={gameWon}
                     isRollRecordBroken={isRollRecordBroken} isTimeRecordBroken={isTimeRecordBroken}/>
    </div>
  )
}