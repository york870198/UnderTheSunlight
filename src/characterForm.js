import React, { useState, useEffect, createContext } from 'react'
import ReactDOM from 'react-dom'
import styles from 'styled-components'

const CharacterForm = styles.div`
  text-align: center;
  max-width:1500px;
  color: gray;
  margin: 70px auto;
  padding:40px;
  display:flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export default function CharacterFormBlock() {
  return (
    <CharacterForm>
    </CharacterForm>
  )
}