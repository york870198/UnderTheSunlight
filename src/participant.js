import React, { useState, useEffect } from 'react'
import styles from 'styled-components'
import { CSSTransition } from 'react-transition-group'

import { LoadingBlock } from './generalBlocks'


const ParticipantDiv = styles.div`
  text-align: center;
  width:1500px;
  color: gray;
  padding-top:40px;
  margin: 70px auto;
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  
  @media (max-width: 1500px) {
    width: 950px;
  }

  @media (max-width: 950px) {
    width: 400px;
  }
`

const UserCardDiv = styles.div`
  border: 2px solid rgba(255,255,255, 0.5);
  width: 400px;
  height: 440px;
  color: white;
  margin-left:75px;
  margin-top: 30px;
  padding: 5px;
  position: relative;
  box-sizing: border-box;
  border-radius:20px;
  background:black;
  display:flex;
  flex-direction:column;
  align-items:center;
  opacity: 0;
  top:-20px;
  transition: top 1000ms, opacity 1000ms;
  transition-delay: ${props=>props.delay*150}ms;

  @media (max-width: 1500px) {
    margin-left:50px;
  }

  @media (max-width: 950px) {
    margin-left:0px;
  }

  // enter from
  &.fade-enter {
    top: -25px;
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    top: 0px;
    opacity: 1;
  }

  &.fade-enter-done {
    top: 0px;
    opacity: 1;
  }

  // exit from
  &.fade-exit {
    top: 0px;
    opacity: 1;
  }

  // exit to 
  &.fade-exit-active {
    top: -20px;
    opacity: 0;
  }

  &.fade-exit-done {
    top: -20px;
    opacity: 0;
  }
`

const UserImg = styles.img`
  width: 90%;
  border-radius: 3px;
`

const UserNameDiv = styles.div`
  background:rgba(255,255,255, 0.7);
  color: indigo;
  padding:10px 50px;
  border-radius: 3px;
`

export default function ParticipantBlock() {
  const [allUsers, setAllUsers] = useState([])
  const [inAnimation, setInAnimation] = useState(false)
  function getAllUser() {
    fetch('https://underthesunlight-api.herokuapp.com/user', {
      method: 'GET',
      headers: new Headers({
        mode: 'cors'
      })
    })
    .then(res => res.json())
    .catch(error => {
      console.log('fail to fetch', error)
    })
    .then(response => {
      setInAnimation(false)
      setAllUsers(response)
    })
  }
  useEffect(()=>{
    getAllUser()
  },[])
  useEffect(()=>{
    setInterval(()=>{setInAnimation(true)}, 500)
  },[allUsers])
  let animateOrder = 0;
  const setAnimateOrder = ()=>{
    animateOrder ++
    return animateOrder
  }
  return (
    <ParticipantDiv>
      {(allUsers.length !== 0) ? allUsers.map((userUnit) => (
      <CSSTransition key={userUnit.id} in={inAnimation} timeout={300} classNames="fade">
        <UserCardDiv delay={setAnimateOrder()}>
          <UserImg src="https://images.plurk.com/6upAIUgQpXtqpgb8gKNFqK.png" />
          <UserNameDiv>{userUnit.username}</UserNameDiv>
        </UserCardDiv>
      </CSSTransition>
      )) : <LoadingBlock/>}
    </ParticipantDiv>
  )
}