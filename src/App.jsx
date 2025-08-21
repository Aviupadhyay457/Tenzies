import Header from './Header'
import MainComponent from './MainComponent'

export default function App(){
  const[count,setCount]=React.useState(0)
  return(
    <div className="topmost-container">
      <Header count={count} setCount={setCount} />
      <MainComponent count={count} setCount={setCount}/>
    </div>
  )
}