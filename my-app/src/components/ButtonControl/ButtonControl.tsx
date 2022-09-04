import { useContext } from "react";
import prevIcon from '../../assets/icons/arrow-circle-right-solid (1).svg'
import prevIcon2 from '../../assets/icons/arrow-circle-right-solid (2).svg'
import nextIcon from '../../assets/icons/arrow-circle-right-solid.svg'
import GradContext from "../../store/Context";
import './button-control.css'

function ButtonControl({Submit , setIsChecked}:{Submit:any , setIsChecked:any} ) {

  const { index, setIndex } = useContext(GradContext);

  return (
    <>
      <div className="foot">
        <button className="submit" onClick={Submit}> 
          submit
        </button>

        {/* <button
          className="prev"       // button to move to the next question
          onClick={() => {
            if (index > 0) {
              setIndex(index - 1);
            }
          }}
        >
          {index ==0 &&<img src={prevIcon} alt="" />}
          {index !=0 &&<img src={prevIcon2} alt="" />}
        </button> */}

        {index+1}

        <button
          className="next"         // button to move to the next question
          onClick={() => {
            if (index < 9) {
              setIndex(index + 1);
              setIsChecked(false)
            }
          }}
        >
          {index != 9 &&<img src={nextIcon} alt="" />}
          {index == 9 &&<img className="flip" src={prevIcon} alt="" />}
        </button>

      </div>
    </>
  );
}

export default ButtonControl;
