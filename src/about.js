import React, { useState, useEffect } from 'react'
import styles, { keyframes } from 'styled-components'
import { CSSTransition } from 'react-transition-group'


const AboutDiv = styles.div`
  margin-top: 70px;
  padding-top: 50px;
  padding-left: 10vw;
  padding-right: 10vw;
  font-size: 24px;
`

const WordOfInvisibleSpan = styles.span`
  color: rgba(255,255,255,0.2);
  text-shadow: none;
`

const TopicDiv = styles.div`
  position: relative;
  left: -30px;
  opacity: 0;
  border-bottom: 1px solid grey;
  padding-top:10px;
  padding-bottom:15px;
  transition: left 1000ms, opacity 1000ms;
  transition-delay: ${props=>props.delay*150}ms;
  // enter from
  &.fade-enter {
    left: -30px;
    opacity: 0;
  }

  // enter to
  &.fade-enter-active {
    left: 0px;
    opacity: 1;
  }

  &.fade-enter-done {
    left: 0px;
    opacity: 1;
  }

  // exit from
  &.fade-exit {
    left: 0px;
    opacity: 1;
  }

  // exit to 
  &.fade-exit-active {
    left: -30px;
    opacity: 0;
  }

  &.fade-exit-done {
    left: -30px;
    opacity: 0;
  }
`

const TopicH1 = styles.h1`
  color: white;
  text-shadow: 1px 2px 2px grey;
`

const TopicParagraph = styles.p`
  color: white;
  padding-left: 30px;
`

const DisclaimerDiv = styles.div`
  color: white;
  background: grey;
  font-size:20px;
  padding: 25px;
  border: 1px solid white;
  border-radius: 18px;
`

export default function AboutBlock() {
  const [inAnimation, setInAnimation] = useState(false)
  useEffect(()=>{
    setInAnimation(true)
  },[])
  return (
    <AboutDiv>
      <CSSTransition in={inAnimation} timeout={300} classNames="fade">
        <TopicDiv delay={1}>
          <TopicH1>這個網站是？</TopicH1>
          <TopicParagraph>
            TRPG 系統《<WordOfInvisibleSpan>Invisible Sun</WordOfInvisibleSpan>》的私人用跑團網站，用於收錄團員們的角色紙、團錄以及房規等資訊。
          </TopicParagraph>
        </TopicDiv>
      </CSSTransition>

      <CSSTransition in={inAnimation} timeout={300} classNames="fade">
        <TopicDiv delay={2}>
          <TopicH1><WordOfInvisibleSpan>Invisible Sun</WordOfInvisibleSpan> 是什麼？</TopicH1>
          <TopicParagraph>
            由 <a href="https://www.montecookgames.com/" target="_blank" style={{color: 'white'}}>Monte Cook Games</a> 製作並發行的桌上角色扮演遊戲規則書。
          </TopicParagraph>
          <TopicParagraph>
            根據官方的 <a href="https://www.montecookgames.com/fan-support/fan-use-policy/" target="_blank" style={{color: 'white'}}> Fan Use Policy</a>，以下為權利聲明：
          </TopicParagraph>
          <DisclaimerDiv>
            The Monte Cook Games logo, Numenera, the Cypher System, No Thank You, Evil!, <WordOfInvisibleSpan>Invisible Sun</WordOfInvisibleSpan>, and their respective logos are are trademarks of Monte Cook Games, LLC in the U.S.A. and other countries. All Monte Cook Games characters and character names, and the distinctive likenesses thereof, are trademarks of Monte Cook Games, LLC. Content on this site or associated files derived from Monte Cook Games publications is © 2013-2021 Monte Cook Games, LLC. Monte Cook Games permits web sites and similar fan-created publications for their games, subject to the policy given at https://www.montecookgames.com/fan-use-policy/. The contents of this site are for personal, non-commercial use only. Monte Cook Games is not responsible for this site or any of the content, that did not originate directly from Monte Cook Games, on or in it. Use of Monte Cook Games’s trademarks and copyrighted materials anywhere on this site and its associated files should not be construed as a challenge to those trademarks or copyrights. Materials on this site may not be reproduced or distributed except with the permission of the site owner and in compliance with Monte Cook Games policy given at https://www.montecookgames.com/fan-use-policy/.
          </DisclaimerDiv>
        </TopicDiv>
      </CSSTransition>

    </AboutDiv>
  )
}