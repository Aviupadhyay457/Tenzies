export default function Die(props){
    function pipsFun(){
        let arr=[]
        for(let i=1;i<=props.value;i++){
            arr.push(
                <span className={props.isHeld?"pip pip-selected":"pip"} key={i}></span>
            )
        }
        return arr
    }
    const pips=pipsFun()
    return(
        <button className={props.startGame?props.isHeld?"die die-selected":"die":"die"} id={props.id} onClick={()=>props.startGame?props.dieToggle(props.id):""}>{props.startGame?pips:""}</button>
    )
}