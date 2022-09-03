import './slider.css'

function Slider({answer}:{answer:any}) {

  const length = answer.reduce((total:any , answer:any)=>{  //determining the length of answered quetions
      return answer ? total+1 : total+0
  },0)

  return (
    <div className="time">
        <div id="slider" style={{"width":`${length}0%`}}></div>
    </div>
  )
}

export default Slider