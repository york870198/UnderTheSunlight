import React, { useState, useEffect, useContext, createContext } from 'react'
import styles from 'styled-components'
import { CSSTransition } from 'react-transition-group'

const apiUrl = 'https://underthesunlight-api.herokuapp.com/magic'

const HomeBrewMagicMainDiv = styles.div`
  margin: 75px auto;
  width: 1000px;
  min-height: 1000px;
  border: 2px solid blue;
  padding-top: 20px;

  .formFolder {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .formFolderButton {
    padding: 8px;
    background: silver;
    border-radius: 10px;
  }

  .foldForm {
    height: 0px;
    width: 0px;
    overflow: hidden;
    transition: height 500ms, width 500ms;

    // enter from
    &.formUnfold-enter {
      height: 0px;
    }

    // enter to
    &.formUnfold-enter-active {
      height: 330px;
    }

    &.formUnfold-enter-done {
      height: 330px;
      width: 470px;
    }

    // exit from
    &.formUnfold-exit {
      height: 330px;
      width: 470px;
    }

    // exit to 
    &.formUnfold-exit-active {
      height: 330px;
      width: 0px;
    }

    &.formUnfold-exit-done {
      height: 0px;
      width: 0px;
    }
  }


`

const HomeBrewMagicFormDiv = styles.div`
  width: 470px;
  margin: 10px auto;
  padding:20px;
  color: white;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  box-sizing: border-box;
  position: relative;
  top: 50%;
  left:50%;
  transform: translate(-50%,-50%);

  div {
    margin-left: 10px;
    margin-right: 10px;
    padding: 3px 0;
  }
  input {
    width: 120px;
  }

  button {
    color: white;
    background: indigo;
    padding:6px;
    margin-right: 10px;
  }
`

const MagicCardWrapperDiv = styles.div`
  display: flex;
  flex-wrap: wrap;
  width: 950px;
  margin: 10px auto;

`

const MagicCardDiv = styles.div`
  border: 2px solid rgba(255,255,255, 0.5);
  border-radius: 4px;
  font-size: 16px;
  width: 250px;
  height: 40px;
  color: white;
  margin-left:50px;
  margin-top:15px;
  padding: 8px 10px;
  box-sizing: border-box;
  overflow-y:hidden;
  transition: height 300ms, background 500ms;

  :hover {
    background: rgba(255,255,255,0.1);
  }

  .magic--title {
    font-weight: bold;
    height: 22px;
    text-align: center;
    transition: ;
    overflow: hidden;    
  }

  .magic--info {
    font-size: 12px;
    height: 350px;
  }
  .magic--description {
    font-weight: normal;
    height: 220px;
    font-size: 14px;
    overflow-y: auto;
  }

  p {
    margin: 8px;
  }

  // enter from
  &.unfold-enter {
    height: 40px;
  }

  // enter to
  &.unfold-enter-active {
    height: 400px;
  }

  &.unfold-enter-done {
    height: 400px;
  }

  // exit from
  &.unfold-exit {
    height: 400px;
  }

  // exit to 
  &.unfold-exit-active {
    height: 40px;
  }

  &.unfold-exit-done {
    height: 40px;
  }
`

function HomeBrewMagicFormBlock(props) {
  const initValue = {
    name: '',
    type: 'general spell',
    level: 1,
    dice: '+0',
    color: 'invisible',
    range: 'none',
    depletion: '',
    description: ''
  }
  const [formObject, setFormObject] = useState(initValue)
  function handleSendForm(url){
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(formObject),
      headers: new Headers({
        'Content-Type': 'application/json',
        'mode': 'cors'
      })
    })
    .then(res=>res.json())
    .catch(error=> console.log(error))
    .then(response=>{
      handleReset()
      props.getAllMagic()
    })
  }
  function preSendValidate(obj){
    let result = {...obj}
    if(obj.name.length > 20){
      result.name = obj.name.subString(0,20)
    }
    let spellType = ['general spell','minor magic','vance spell','longform','ritual','secret','house secret','other']
    if(spellType.indexOf(obj.type) < 0){
      result.type = 'other'
    }
    if(obj.level<0){
      result.level = '0'
    } else if(obj.level>17){
      result.level = '17'
    }
    let diceRange = ['+0','+1','+2','+3','+4',]
    if(diceRange.indexOf(obj.dice)<0){
      result.dice = '+0'
    }
    return result
  }
  function handleInputOnChange(event, formTarget){
    let newFormObject = {...formObject}
    newFormObject[formTarget] = event.target.value
    setFormObject(preSendValidate(newFormObject))
  }
  function handleReset(){
    setFormObject(initValue)
  }
  return(
      <HomeBrewMagicFormDiv>
        <div>
          名稱：<input value={formObject.name} onChange={(event)=>handleInputOnChange(event, 'name')} />
        </div>
        <div>
          類型：
          <select value={formObject.type} onChange={(event)=>handleInputOnChange(event, 'type')}>
            <option value='general spell'>通用法術</option>
            <option value='minor magic'>次級魔法</option>
            <option value='vance spell'>萬斯法術</option>
            <option value='longform'>長型法術</option>
            <option value='ritual'>儀式</option>
            <option value='secret'>秘密</option>
            <option value='house secret'>房屋秘密</option>
            <option value='other'>其他</option>
          </select>
        </div>
        <div>
          等級：<input type='number' value={formObject.level} onChange={(event)=>handleInputOnChange(event, 'level')}/>
        </div>
        <div>
          魔法骰：
          <select value={formObject.dice} onChange={(event)=>handleInputOnChange(event, 'dice')}>
            <option value='+0'>+0</option>
            <option value='+1'>+1</option>
            <option value='+2'>+2</option>
            <option value='+3'>+3</option>
            <option value='+4'>+4</option>
          </select>
        </div>
        <div>
          顏色：
          <select value={formObject.color} onChange={(event)=>handleInputOnChange(event, 'color')}>
            <option value='invisivle'>無</option>
            <option value='silver'>銀</option>
            <option value='green'>綠</option>
            <option value='blue'>藍</option>
            <option value='indigo'>靛</option>
            <option value='grey'>灰</option>
            <option value='pale'>薄</option>
            <option value='red'>紅</option>
            <option value='gold'>金</option>
          </select>
        </div>
        <div>
        距離：
          <select value={formObject.range} onChange={(event)=>handleInputOnChange(event, 'range')}>
            <option value='none'>無/其他</option>
            <option value='touch'>觸及</option>
            <option value='close'>極近</option>
            <option value='near'>近</option>
            <option value='far'>遠</option>
            <option value='very far'>極遠</option>
          </select>
        </div>
        <div>
          失效檢定：<input value={formObject.depletion} onChange={(event)=>handleInputOnChange(event, 'depletion')} />
        </div>
        <div>
          效果描述：<br/><textarea value={formObject.description} onChange={(event)=>handleInputOnChange(event, 'description')} style={{width:'400px',height:'100px'}}/>
        </div>
        <div>
          <button onClick={()=>handleSendForm(apiUrl)}>送出</button>
          <button onClick={handleReset}>清空</button>
        </div>
      </HomeBrewMagicFormDiv>
  )
}

function MagicCardBlock(props){
  const { id, name, type, level, dice, color, range, depletion, description } = props.obj
  const [unfold, setunFold] = useState(false)
  function parseColorToChinese(colorStr) {
    let result = ''
    switch(color){
      case 'invisible': 
        result = '無'
        break
      case 'silver':
        result = '銀'
        break
      case 'green':
        result = '綠'
        break
      case 'blue': 
        result = '藍'
        break
      case 'indigo':
        result = '靛'
        break
      case 'grey':
        result = '灰'
        break
      case 'pale':
        result = '薄'
        break
      case 'red':
        result = '紅'
        break
      case 'gold':
        result = '金'
        break
      default: return ''
    }
    return result
  }
  return(
    <CSSTransition in={unfold} timeout={300} classNames="unfold">
      <MagicCardDiv onClick={()=>{setunFold(state=>!state)}}>
        <div className='magic--title'>{name}</div>
        <div className='magic--info' onClick={(e)=>{e.stopPropagation()}}>
          <p>{type}</p>
          <p>等級 {level} {(dice!=='+0' && `( ${dice} 骰)`)}</p>
          <p>顏色：{parseColorToChinese(color)}</p>
          <p>射程：{range}</p>
          {(depletion !== '') && <p>失效：{'\n'}{depletion}</p>}
          <div className='magic--description'>{description.split('\n').map((line, index)=>{
            return (<p key={`${id}+${index}`}>{line}</p>)
          })}</div>
        </div>

      </MagicCardDiv>
    </CSSTransition>
  )
}

export default function HomeBrewMagicBlock() {
  const [allMagics, setAllMagics] = useState([])
  const [formUnfold, setFormUnfold] = useState(false)
  function getAllMagic() {
    fetch(apiUrl, {
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
      console.log(response)
      setAllMagics(response)
    })
  }
  useEffect(()=>{
    getAllMagic()
  },[])
  return(
    <HomeBrewMagicMainDiv>
      <div className='formFolder'>
        <div className='formFolderButton' onClick={(e)=>{setFormUnfold((state)=>(!state))}}>Create a new magic</div>
        <CSSTransition in={formUnfold} timeout={500} classNames="formUnfold">
          <div className='foldForm'>
            <HomeBrewMagicFormBlock getAllMagic={getAllMagic}/>
          </div>
        </CSSTransition>
      </div>
      <MagicCardWrapperDiv>
        {allMagics.map((magic)=>(
          <MagicCardBlock key={`magic-${magic.id}`} obj={magic}/>
        ))}
      </MagicCardWrapperDiv>
    </HomeBrewMagicMainDiv>
  )
}
