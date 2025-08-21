import Header from './Header'
import MainComponent from './MainComponent'
import React from 'react'

export default function App(){
  const[count,setCount]=React.useState(0)
  const[time , setTime]=React.useState(0)
  return(
    <div className="topmost-container">
      <Header count={count} setCount={setCount} time={time} setTime={setTime}/>
      <MainComponent count={count} setCount={setCount} time={time} setTime={setTime}/>
    </div>
  )
}