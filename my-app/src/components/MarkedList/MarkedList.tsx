import {useContext}from 'react'
import './marked-list.css'
import delIcon from '../../assets/icons/error-svgrepo-com2.svg'
import GradContext from "../../store/Context";

function MarkedList({marked , setMarked}:{marked:any[] , setMarked:any}) {

  const { setIndex } = useContext(GradContext);

  const handleUnMark=(i:any)=>{   // method for handling the marked question and unmark it
      const arr = [...marked]    

      arr[i]=false

      setMarked(arr)
    }

  return (
    <div className="mList">
            <h3>Marked List</h3>
            <div className="line"></div>
            {
                marked.map((m , i)=>{     //maping in array of marked question and create badgy to quick access for it 
                    if(m){
                        return(
                            <div key={i}>
                            <span id="${i}" onClick={()=>{setIndex(i)}} >Question {i+1}
                            <img className="error" src={delIcon} alt="" onClick={()=>{handleUnMark(i)}}></img>
                            </span>
                            </div>
                        )
                    }
                })
            }
            
    </div>
  )
}

export default MarkedList