export default function Die(props){
    function pipsFun(){
        let arr=[]
        for(let i=1;i<=props.value;i++){
            arr.push(
                <span className="pip" key={i}></span>
            )
        }
        return arr
    }
    const pips=pipsFun()
    return(
        <button className={props.isHeld?"die green":"die"} id={props.id} onClick={()=>{props.dieToggle(props.id)}}>{pips}</button>
    )
}