import React, { useState, useEffect } from 'react'
import styles, { keyframes } from 'styled-components'

const UnderConstructionDiv = styles.div`
  text-align: center;
  max-width:1500px;
  color: gray;
  margin: 70px auto;
  padding-top:140px;
  text-align: center;
`

export function UnderConstructionBlock() {
  return(
    <UnderConstructionDiv>
      <h1>Under Construction.</h1>
    </UnderConstructionDiv>
  )
}

export function LoadingBlock() {
  return(
    <UnderConstructionDiv>
      <h1>Loading...</h1>
    </UnderConstructionDiv>
  )
}