import React, { useEffect,useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom"
import { useHistory,useParams } from "react-router";
import "./styles.css";
//import axiosWithAuth from './utils/axiosWithAuth';
import {axiosWithAuth} from './utils/axiosWithAuth';
import axios from 'axios'
import { connect } from 'react-redux'
//component imports
import HomePage from "./components/HomePage"
import Saved from "./components/Saved"
import Suggestions from "./components/Suggestions"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Strains from './components/Strains'
import { WeedContext } from './context/WeedContext';
import { ProductContext } from './context/ProductContext';
import { UserContext } from './context/UserContext';
import Home from './components/Home';
import PrivateRoute from './utils/PrivateRoute';
import { logIn } from './actions/actions'
import UpdateList from './components/UpdateList'
//reactstrap styles
import {Container, 
  Collapse,
  Navbar,
 NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
 import styled from 'styled-components';

const IMG = styled.img `
width: 100%;
height: 250px;
opacity: .8;
`

function App(props) {
  //saved list
  const [savedList, setSavedList] = useState([]);
  const [userId, setUserId] = useState(null);
  const [button, setButton] = useState(false);
  const [dummy,setDummy] = useState({
    strain:"Citrus-Punch"
  });

  const history = useHistory();

  useEffect(() => {
    console.log(userId)
    axiosWithAuth()
    .get('/api/strains')
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
  })
  .catch(err => {
      console.log(err.message)
  })
  }, [props,button] );
  const addToSavedList = weed => {

    console.log(userId)
    axiosWithAuth()
    .post('api/strains', weed)
    
    .then(res => {
      console.log("weed", weed)
      console.log("saved list",res.data)
      setSavedList([...savedList,res.data]);
      axiosWithAuth()
      .get('api/strains')
    .then(res => {
      console.log(res.data)
    console.log(savedList)
    
  })
  })
  .catch(err => {
      console.log(err.message)
  })
  };
  const deleteItem = (item) => {
    console.log(item)
    console.log(item.Strain)
    axiosWithAuth()
    .delete(`/api/strains/${item.id}`, item)
    .then(res => {
      console.log(res.data)
      setSavedList(savedList.filter((weed) => ( weed.id !== item.id || weed.id !== item.id
      )))

      //might need adjusting with this
  
  })
  .catch(err => {
      console.log(err.message)
  })

  }
  
  const updateItem = (item,string) => {
    axiosWithAuth()
    .put(`/api/strains/${item.id}`, string)
    .then(res => {
      console.log(res.data)

    axiosWithAuth()
    .get('/api/strains')
    
    .then(res => {
      console.log(res.data)
      setSavedList(res.data)
      setButton(!button)
      setButton(!button)
  })
})
  .catch(err => {
      console.log(err.message)
  })
  }
  //navBar states
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

  return (
  <>
   <IMG src="https://raw.githubusercontent.com/Build-Week-PT-Med-Cabinet-2/DS/main/medcab%20light%20banner.jpg"/>
        
  <Router>
  <ProductContext.Provider value={{addToSavedList,deleteItem,updateItem}}>
    <UserContext.Provider value = {{userId,setUserId}}>
		<WeedContext.Provider value={{savedList, dummy , setDummy}}>
    <Container className = "p-0" fluid={true} >
        <Switch>
        <Route exact path= "/">
            <HomePage />
          </Route>
          <PrivateRoute exact path= "/nav" component= {Home} />

          <Route exact path= "/nav-saved">
            <Saved />
          </Route>

          <Route exact path= "/nav-suggestions">
            <Suggestions addToSavedList = {addToSavedList} />
          </Route>

          <Route exact path= "/login">
            <Login />
          </Route>

          <Route exact path="/update-list/:id">
            <UpdateList item ={dummy} />
          </Route>

          <Route exact path= "/signup">
            <Signup />
          </Route>
          <Route exact path= "/strains:id">
            <Strains addToSavedList = {addToSavedList} />
          </Route>

        </Switch>
      </Container>
      </WeedContext.Provider>
      </UserContext.Provider>
		  </ProductContext.Provider>
      </Router>
  </>
  );
}

const mapStateToProps = state => {
  return {
      ...state,
      loggingIn: state.loggingIn,
      userInfo:state.userInfo,
      username: state.username
  }
}

export default connect(mapStateToProps, { logIn })(App)