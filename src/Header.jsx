import Navbar from "./Navbar"
export default function Header(props){
    return(
        <header className="info-container">
            <Navbar count={props.count} setCount={props.setCount} time={props.time} setTime={props.setTime} gameWon={props.gameWon}/>
            <h1>Tenzies</h1>
            <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.Try to get the fastest time!</p>
        </header>
       
    )
}