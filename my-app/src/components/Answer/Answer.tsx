import "./answer.css";
import {useContext} from 'react'
import Context from '../../store/Context';

function Answer() {

    const answers=["noun" ,"adverb" ,"verb" ,"adjective"]    
  
    const {index,answer ,answerSelect} =useContext(Context)

  return (
    <div className="answer">
      {
          //map for the array of answers to create input radio element for each one
           
            answers.map((ans, ind) =>{
                return(
                    <label htmlFor={"ans"+ind} key={ind} >
                        <input type="radio" id={"ans"+ind} name={"ans"+index} value={ans} onChange={answerSelect} checked={answer[index] === ans}/>
                        <span className="first"></span>
                        <span className="second">{ans}</span>
                    </label>
                )
            })
        }
    </div>
  );
}

export default Answer;
