import React, { useState,useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logIn } from '../actions/actions'
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';
import { Redirect } from "react-router-dom";

import {Container,
    Col,
    Row, 
    Collapse,
    Navbar,
   NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
     Form,
    FormGroup, Label, Input,
    Button,
  } from 'reactstrap';
  
const Login = (props) => {
  const {setUserId, userId}=useContext(UserContext);
  const [isClicked, setClicked] = useState(true);
            //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);
    const history = useHistory();

    const [formState, setFormState] = useState({
        username:"",
        password:""
    })

    const handleChange = e => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const makePush = () => {
      return history.push('/nav')
    }
    const handleSubmit = e => {
        e.preventDefault();
        props.logIn(formState,setUserId)
        console.log(userId)
          setFormState({
            username:"",
            password:""
        })
        setClicked(!isClicked)
        setClicked(!isClicked)
        makePush();
    }
useEffect(() => {
  console.log("ahhh")
  if(isClicked===false){
    history.push('/nav')
  }
  else{
    console.log(null);
  }
}, [isClicked] );
    return (
      <>
      
          <h2>Sign In</h2>
          <Form className="form" onSubmit={handleSubmit} >
            <Col>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  placeholder="username"
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
            <Button>Submit</Button>
          </Form>
        
        </>
      );
}

const mapStateToProps = state => {
    return {
        ...state,
        loggingIn: state.loggingIn,
        userInfo:state.userInfo
    }
}

export default connect(mapStateToProps, { logIn })(Login)