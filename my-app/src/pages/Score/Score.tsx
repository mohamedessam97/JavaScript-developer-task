import {useEffect, useState}from 'react'
import {useParams ,useNavigate} from 'react-router-dom';
import axios from 'axios';

import checkIcon from '../../assets/icons/check-circle.svg'
import sideImg from '../../assets/imgs/side-img.png'
import './score.css'


function Score() {

    let { score } = useParams();
    
    let navigate = useNavigate();
    
    const obj:any = localStorage.getItem('user')
    
    const user:any =JSON.parse(obj)

    //state for the rank
    const [rank , setRank ]= useState<number>(0)

    //fetching the api which getting the rank
    useEffect(() => {
        const fetchData = async () => {
    
            const res = await axios.post("http://localhost:3001/rank" , {score})
    
            setRank(res.data.rank)

        }

        fetchData();

    }, [score]);


    // method used for loging out
    const handleLogout = () => {

        localStorage.removeItem("user");

         navigate(`/login`);

    }

  return (
    <div id="result" >
            <img className="side " src={sideImg} alt="" />
            <img className="check  mb-3" src={checkIcon} alt="" />
            <p className="mb-3  ">The Exam Submit Successfully</p>
            <div className="grade my-5">
                <span>{user?.firstName} {user?.lastName}</span>
                <span>Score: {score}</span>
                <span>Rank: {rank}</span>
            </div>
            <button className='logout' onClick={handleLogout}>Sign Out</button>
        </div>
  )
}

export default Score