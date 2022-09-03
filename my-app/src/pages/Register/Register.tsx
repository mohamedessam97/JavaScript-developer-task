import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./register.css";

function Register() {
  let navigate = useNavigate();

  // state for the user register data
  const [user, setUser] = useState<any>({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // method used for the binding of the form
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setUser((oldUser: any) => ({ ...oldUser, [name]: value }));
  };

  // method used for submiting the register data by send requst to api and if the data is valid it navigate to login page and if it not it will show alert with the problem
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (user.password === user.confirmPassword) {
      try {
        const res = await axios.post("http://localhost:3001/register", {
          firstName: user.fName,
          lastName: user.lName,
          email: user.email,
          password: user.password,
        });

        navigate(`/login`);
      } catch (err: any) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <Row className="register">
      <Col className="form">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            name="fName"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lName"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email address"
            name="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm"
            name="confirmPassword"
            onChange={handleChange}
            required
          />
          <button className="sign" type="submit">
            Sign Up
          </button>
          <span
            className="login"
            onClick={() => {
              navigate(`/login`);
            }}
          >
            Log in
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

export default Register;
