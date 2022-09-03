import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row , Col} from "react-bootstrap";

import axios from "axios";

import "./login.css";


function Login() {
  let navigate = useNavigate();

  // state for the user login data
  const [user , setUser] = useState<any>({ email: "", password: "" })

  // method used for the binding of the form  
  const handleChange = ( event : any ) => {
    const { name , value } = event.target

    setUser(( oldUser : any ) => ({ ...oldUser , [name] : value }))

  };

  // method used for submiting the the use login data bu send requst to api and if the data is true it navigate to test page and if it not it will show alert with the problem  
  const handleSubmit = async ( event : any ) => {

    event.preventDefault()
    try{

      const res = await axios.post("http://localhost:3001/login" , {email:user.email , password:user.password});

      localStorage.setItem('user', JSON.stringify(res.data));

      navigate(`/test`);

    }catch(err:any){

      alert(err.response.data.message)
      
    }
  };

  return (
    <Row className="log">
        <Col className="form">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <br />
          <button className="login" type="submit" >
            Log in
          </button>
          <span className="signup" onClick={()=>{navigate(`/register`);}}>
            Sign Up
          </span>
        </form>

        </Col>
        <Col className="welcome">
        <div>
            <span> WELCOME TO</span>
            <span>Online Exam</span>
            <span></span>
            <span>Please login to start the Exam</span>
          </div>
        </Col>
    </Row>
  );
}

export default Login;
