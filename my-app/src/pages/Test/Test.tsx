import { useState , useEffect} from 'react'
import { Row , Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import ButtonControl from '../../components/ButtonControl/ButtonControl'
import MarkedList from '../../components/MarkedList/MarkedList';
import Question from '../../components/Question/Question'
import Slider from '../../components/Slider/Slider';
import GradContext from '../../store/Context';

import markIcon1 from '../../assets/icons/bookmark-plus (1).svg'
import markIcon2 from '../../assets/icons/bookmark-plus (2).svg'
import './test.css'

function Test() {

let navigate = useNavigate();

// state used for manage the index of the quetion
const [index, setIndex] = useState(0)

// state used to save the user answer
const [answer, setAnswers] = useState<any[]>([])

// state used to save the right answer of the user 
const [rightAns , setRightAns] =useState<any[]>([])

// state used to save the marked quetions
const [marked , setMarked] =useState<any[]>([])

// state used to store the quetion list
const [list , setList] =useState<any[]>([])

// state used to store the score of the user 
const [grad , setGrad] =useState<number>(0)

const [isChecked, setIsChecked] = useState(false);


// fetching the api for getting the quetions 
useEffect(() => {
        const fetchData = async () => {

            const res = await axios.get("http://localhost:3001/words");

            setList(res.data)
            console.log(res.data);
            
        }

        fetchData();
    }, []);
    
    
    // method used to store the user answer and the right answer
    const answerSelect =(e:any)=>{
        if(isChecked){
            alert('You already Answer the Question')
            return;
        }

        setIsChecked(true)


        const arr = [...answer];
        arr[index] = e.target.value;
        setAnswers(arr)
        
        const arr2 = [...rightAns]
        arr2[index] =arr[index] === list[index].pos
        setRightAns(arr2)

        if(arr[index] === list[index].pos){
            alert("Correct Answer");
        }else{
            alert("Incorrect Answer");
        }


        const arr3 =[...marked]   // check if the question is marked ot not and if marked and the user answer the question remove the mark 
        if( arr3[index] ){
            
            arr3[index] =false

        }
        setMarked(arr3)
        
        
    } 

    // to store the score every time the user check an answer
    useEffect(() => {
        const total = rightAns.reduce((total, answer)=>{

            return answer ? total + 10 : total + 0

        } , 0)

        setGrad(total)

    }, [ rightAns , answerSelect])
    

    // when submiting the exam navigate to score page
    const Submit=()=>{

        navigate(`/score/${grad}`);

    }

    // method to handle the marked and unmarked quetions
    const handleMark = () => {

        const arr = [...marked]
        if(isChecked){
            alert("You Can't mark this quetion , you already answer it")
            return;
        }

        if( !marked[index] ){
            
            arr[index] =true

        }else{

            arr[index] =false

        }

        setMarked(arr)
        
    }

  return (
    <GradContext.Provider value={{index , answer , setIndex , answerSelect}}>

    <Row className='contain'>
        <Col xs={9} className="">
        <Slider answer={answer}/>
        <div id="mar" onClick={handleMark}> 
                {!marked[index] && <div><img src={markIcon1} alt=""/></div>}
                {marked[index] && <div><img src={markIcon2}/></div>}
        </div>
        <Question quetion={list[index]}/>
        <ButtonControl  Submit={Submit} setIsChecked={setIsChecked} />

        </Col>
        <Col xs={3}>
        <MarkedList marked={marked} setMarked={setMarked} setIsChecked={setIsChecked}/>
        </Col>

    </Row>
        </GradContext.Provider>
  )
}

export default Test