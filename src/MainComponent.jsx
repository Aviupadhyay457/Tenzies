import React, { useState } from "react"
import { nanoid } from "nanoid"
import Die from "./Die"
import multipleSound from "./assets/mulitple-dice-roll.mp3"
import Confetti from 'react-confetti'

export default function MainComponent(props){
    // const[dice,setDice]=React.useState(()=>getInitialDice())
    // const[count,setCount]=React.useState(0)
    // const[time , props.setTime]=React.useState(0)
    const[shouldRunTimer, SetShouldRunTimer]=React.useState(false)
    const[startGame, setStarGame]=useState(false)
    const[progressBar, setProgressBar]=useState(0)
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
            // props.setCount(0)
            SetShouldRunTimer(false)
            // props.setTime(0)
        }

    },[props.gameWon])


    
    function secondsToHms(d) {
        if (d===0){
            return "0 s"
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
        let arr=new Array(6).fill(0)
        let updatedArr=props.dice.map((die)=>{
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
        props.setDice(updatedArr)

        updatedArr.forEach((die)=>{
            if(die.isHeld===true){
                arr[die.value-1]=arr[die.value-1]+1
            }
        }
        )

         let x=Math.max(...arr)
         console.log(Math.max(...arr))

         setProgressBar(x)

        
    }

    function dieElements(){
        return(
           props.dice.map((ele)=>(
            <Die key={ele.id} id={ele.id} value={ele.value} isHeld={ele.isHeld} dieToggle={DieToggle} startGame={startGame}/>
           )) 
        )
    }
    function handleBtnClick(){
        if(props.gameWon){
            props.setDice(props.getInitialDice)

        }
        else if(!startGame){
            setStarGame(true)
            props.setCount(1)
            SetShouldRunTimer(true)
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

            }
        }
        
        let time=secondsToHms(props.time)
        let timeStyle={
            fontSize:time.length>4?(time.length>11?"0.4rem":"0.7rem"):"1.5rem",
        }

        
        let progressBarFillCss={}
        
        switch (progressBar) {
        case 0:
            progressBarFillCss={height:"0%", width:"0%"}
            break;
        case 1:
            progressBarFillCss={height:'10%' , width:'50%'};
            break;
        case 2:
            progressBarFillCss={height:'20%', width:'70%'};
            break;
        case 3:
            progressBarFillCss={height:'30%', width:'77%'};
            break;
        case 4:
            progressBarFillCss={height:'40%', width:'84%'};
            break;
        case 5:
            progressBarFillCss={height:'50%', width:'89%'};
            break;
        case 6:
            progressBarFillCss={height:'60%', width:'95%'};
            break;
        default:
            progressBarFillCss={height:`${progressBar}0%`, width:"100%"};
        }
    // console.log(dice)
    return(
        <main className="hero-container">
            <div className="begin-game-header">
                <h2>Ready To Play?</h2>
                <p>Click Start to Begin Your Tenzies Adventure!</p>
            </div>
            <div className="dice-container">
                {dieElements()}
            </div>
            <section className="game-progress" style={{visibility:startGame?"visible":"hidden"}}>
                <div className="roll-current">Roll<span>{props.count}</span></div>
                <div className="time-current" >Time<span style={timeStyle}>{time}</span></div>
                <div className="progress-current">
                    Progress
                    <span>{progressBar}/10</span>
                    <div className="progress-fill" style={progressBarFillCss}></div>
                </div>
            </section>
            <button onClick={handleBtnClick} className="game-btn" >{startGame?props.gameWon?"PLAY AGAIN??":"ROLL DICE":"START GAME"}</button>
            {props.gameWon && <Confetti/>}
        </main>
    )
}