import React, { useState, useEffect } from 'react'
import styles, { keyframes } from 'styled-components'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";

import { LoadingBlock } from './generalBlocks'


const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const EntryDiv = styles.div`
  display: block;
  text-align: center;
  color: gray;
  margin-top:70px;
  padding-top:25vh;
  display:flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInAnimation} 1s ease;
  
`

const BannerDiv = styles.div`
  text-shadow: 2px 2px 2px indigo;
  font-size:120px;
  font-weight: bold;
  @media (max-width: 864px) {
    font-size:60px;
  }
`

const SloganDiv = styles.div`
  font-style: italic;
  font-size:24px;
`

const EntryButtonDiv = styles.div`
  margin-top:3vh;
  padding:15px;
  width: 10vw;
  background: rgba(255,255,255, 0.2);
  border-radius: 20px;
  transition: all 0.3s;
  text-decoration: none;
  color: grey;
  &:hover {
    color: white;
    background: rgba(255,255,255,0.5);
  }
  @media (max-width: 864px) {
    width: 15vw;
  }
`

const PanelDiv = styles.div`
  width: 100vw;
  display: flex;
  height: 85vh;
  justify-content: space-evenly;
  padding: 20vh;
  box-sizing: border-box;
  animation: ${fadeInAnimation} 1s ease;
`

const InputPanelDiv = styles.div`
  background: ${props => props.background || 'black'};
  color: ${props => props.color || 'white'};
  height: 40vh;
  width: 32vw;
  min-height: 350px;
  max-width: 350px;
  border-radius: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`

const FormLayoutDiv = styles.div`
  height: 24vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`

function SignUpBlock({setPanelOn, checkLogin}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitHandler = () => {
    const url = 'https://underthesunlight-api.herokuapp.com/user/register'
    const data = {username, password}
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'mode': 'cors'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response.ok){
        window.localStorage.setItem('utsApp-user', JSON.stringify(response))
        checkLogin(response.token)
        setPanelOn(false)
      }
    })
  }
  return (
    <InputPanelDiv background={'indigo'} onClick={(e) => {e.stopPropagation()}}>
      <FormLayoutDiv>
        <div>
          <h2>大戰後初次回家？</h2>
          <p>告訴我你的名字，以及一個秘密。</p>
        </div>
        <div>
          <input placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        </div>
        <div>
          <input placeholder="password" type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div>
          <button onClick={onSubmitHandler}>sign up</button>
        </div>
      </FormLayoutDiv>
    </InputPanelDiv>
  )
}

function LogInBlock({setPanelOn, checkLogin}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const onSubmitHandler = () => {
    const url = 'https://underthesunlight-api.herokuapp.com/user/login'
    const data = {username, password}
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
        'mode': 'cors'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      if(response.ok){
        window.localStorage.setItem('utsApp-user', JSON.stringify(response))
        checkLogin(response.token)
        setPanelOn(false)
      } else {
        window.localStorage.removeItem('utsApp-user')
      }
    })
  }
  return (
    <InputPanelDiv background={'grey'} color={'black'} onClick={(e) => {e.stopPropagation()}}>
      <FormLayoutDiv>
        <div>
          <h2>不是第一次回來？</h2>
          <p>那麼你知道該怎麼做。</p>
        </div>
        <div>
          <input placeholder="username" value={username} onChange={(e)=>{setUsername(e.target.value)}} />
        </div>
        <div>
          <input placeholder="password" type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        <div>
          <button onClick={onSubmitHandler}>Log in</button>
        </div>
      </FormLayoutDiv>
    </InputPanelDiv>
  )
}

export function EntryBlock({useAuth}) {
  const auth = useAuth()
  const [panelOn, setPanelOn] = useState(false)
  return (
    <React.Fragment>
      {!panelOn &&
      <EntryDiv>
        <BannerDiv>The War is over.</BannerDiv>
        <SloganDiv>It's time to go home.</SloganDiv>
        {(auth.user===0)? <EntryButtonDiv onClick={()=>{setPanelOn(true)}}>wake up.</EntryButtonDiv> : <EntryButtonDiv as={Link} to='/Home'>wake up.</EntryButtonDiv>}
      </EntryDiv>}
      {panelOn &&
      <PanelDiv onClick={()=>{setPanelOn(false)}}>
        <SignUpBlock setPanelOn={setPanelOn} checkLogin={auth.checkLogin}/>
        <LogInBlock setPanelOn={setPanelOn} checkLogin={auth.checkLogin}/>
      </PanelDiv>}
    </React.Fragment>
  )
}

export function AuthBlock({useAuth}) {
  const auth = useAuth()
  let history = useHistory()
  let location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } }
  console.log(from)
  return (
    <React.Fragment>
      {(auth.user === 0)?
      ((window.localStorage['utsApp-user'] === undefined) ? <PanelDiv>
        <SignUpBlock setPanelOn={(e) => {history.replace(from)}} checkLogin={auth.checkLogin}/>
        <LogInBlock setPanelOn={(e) => {history.replace(from)}} checkLogin={auth.checkLogin}/>
      </PanelDiv> : <LoadingBlock/>) : <Redirect push to="/Home"/> }
    </React.Fragment>
  )
}