import Navbar from "./Navbar"
export default function Header(props){
    return(
        <header className="info-container">
            <div className="heading-name-container">
            <h1>TENZIES</h1>
            <p className="subtitle">The Fast-Paced Dice Game</p>
            </div>
            <div className="rules-container">
                <h2>How To Play?</h2>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.Try to get the fastest time!</p>
            </div>
            <h3>Game Statistics:</h3>
            <Navbar count={props.count} setCount={props.setCount} time={props.time} setTime={props.setTime} gameWon={props.gameWon}
                           bestRoll={props.bestRoll} bestTime={props.bestTime} setBestRoll={props.setBestRoll} setBestTime={props.setBestTime}/>
        </header>
       
    )
}