import React, { useState, useEffect, useContext, createContext } from 'react'
import ReactDOM from 'react-dom'
import styles, { keyframes } from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";

import { EntryBlock, AuthBlock } from './entry'
import AboutBlock from './about'
import HomeBlock from './home'
import ParticipantBlock from './participant'
import { UnderConstructionBlock } from './generalBlocks'

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const NavBlockDiv = styles.div`
  width:100%;
  height:70px;
  border-bottom: 2px solid white;
  display: flex;
  align-items:center;
  position: absolute;
  top:0;
  z-index:7;
`
const NavButtonDiv = styles.div`
  color: white;
  font-size:20px;
  height:100%;
  font-weight: 700;
  text-decoration: none;
  background: ${props=>props.background || 'rgba(255,255,255,0)'};
  ${props=>(props.justify === 'end')? 'margin-left:auto;' : ''}
  display:flex;
  align-items:center;
  padding-left:20px;
  padding-right:20px;
  text-shadow: 2px 2px 2px black;
  transition: background 0.3s;
  animation: ${fadeInAnimation} 0.5s ease;
  &:hover {
    background: rgba(255,255,255,0.5);
  }
`

const AuthContext = createContext()

function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(0)

  const checkLogin = (token) => {
    fetch('https://underthesunlight-api.herokuapp.com/user/checkLogin', {
      method: 'GET',
      headers: new Headers({
        Authorization: 'Bearer ' + token,
        mode: 'no-cors'
      })
    })
    .then(res => res.json())
    .catch(error => {
      window.localStorage.removeItem('utsApp-user')
    })
    .then(response => {
      if(response.ok){
        setUser(response.user.id)
      } else {
        window.localStorage.removeItem('utsApp-user')
      }
    })
  }

  const logout = () =>{
    window.localStorage.removeItem('utsApp-user')
  }

  return { user, checkLogin, logout }
}

function ProvideAuth({children}) {
  const auth = useProvideAuth()
  useEffect(()=>{
    if(window.localStorage['utsApp-user']){
      try {
        let loginInfo = JSON.parse(window.localStorage['utsApp-user'])
        let token = loginInfo.token
        auth.checkLogin(token)
      } catch(e) {
        console.log(e)
        auth.logout()
      }
    }
  },[])
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function NavButtonBlock({ children, as, to, background, justify }) {
  return(
    <NavButtonDiv as={as} to={to} background={background} justify={justify}>
      <div>{children}</div>
    </NavButtonDiv>
  )
}

function NavBlock() {
  const auth = useAuth()
  return (
    <NavBlockDiv>
      <NavButtonBlock background={'rgba(255,255,255,0.3)'} as={Link} to='/'>Under the Sunlight</NavButtonBlock>
      <NavButtonBlock as={Link} to='/About'>About</NavButtonBlock>
      <NavButtonBlock as={Link} to='/Participant'>Participants</NavButtonBlock>
      <NavButtonBlock as={Link} to='/Story'>Story</NavButtonBlock>
      <NavButtonBlock as={Link} to='/Homebrew'>Homebrew</NavButtonBlock>
      {(auth.user !== 0) && <NavButtonBlock as={Link} to='/Home' justify={'end'}>Back to house</NavButtonBlock>}
    </NavBlockDiv>
  )
}

function PrivateRoute({ children, ...rest }) {
  let auth = useAuth()
  return(<Route {...rest} render={({ location }) => auth.user? (children) : (<Redirect to={{pathname: "/Auth", state: {from: location}}}/>)}/>)
}

function App() {
  return(
    <ProvideAuth>
      <Router>
        <NavBlock/>
        <Switch>
          <Route exact path="/">
            <EntryBlock useAuth={useAuth}/>
          </Route>
          <Route path="/About">
            <AboutBlock />
          </Route>
          <Route path="/Participant">
            <ParticipantBlock />
          </Route>
          <Route path="/Story">
            <UnderConstructionBlock />
          </Route>
          <Route path="/Homebrew">
            <UnderConstructionBlock />
          </Route>
          <Route path="/Auth">
            <AuthBlock useAuth={useAuth}/>
          </Route>
          <PrivateRoute path="/Home">
            <HomeBlock useAuth={useAuth}/>
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))