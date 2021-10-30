import React, { useState, useEffect } from 'react'
import styles, { keyframes } from 'styled-components'


const HomeDiv = styles.div`
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

const UserListDiv = styles.div`
  background: rgba(25,135,135, 0.7);
  height: 800px;
  width: 60vw;
  border-radius: 30px;
  display: flex;
  flex-direction:row;
  flex-wrap: wrap;
  box-sizing:border-box;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
`

const ListTitleDiv = styles.div`
  width: 90%;
  color: red;
  text-align: left;
  font-size:30px;
`

const CharacterListDiv = styles.div`
  border: 2px solid white;
  width: 90%;
  height: 36%;
`

const SessionListDiv = styles.div`
  border: 2px solid black;
  width: 90%;
  height: 36%;
`

const UserInfoDiv = styles.div`
  height: 800px;
  width: 15vw;
  min-width:300px;
  background: rgb(65,105,135);
  border-radius: 15px;
  color: rgb(145,175,75);
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 20px;
`

const UserImgDiv = styles.div`
  height: 200px;
  width:200px;
  background: white;
  align-self: center;
  margin: 30px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius:50%;
`

export default function HomeBlock({useAuth}) {
  const auth = useAuth()
  const [userInfo, setUserInfo] = useState(()=>{
    if(window.localStorage['utsApp-user']){
      let loginInfo = JSON.parse(window.localStorage['utsApp-user'])
      let userInfo = loginInfo.user
      console.log(userInfo)
      return userInfo
    } else {
      return {}
    }
  })

  function parseTime(timeStamp){
    let timeArray = timeStamp.split(/[\-(T)]/)
    timeArray.splice(3)
    return `${timeArray[0]}年${timeArray[1]}月${timeArray[2]}日`
  }
  return (
    <React.Fragment>
    {(window.localStorage['utsApp-user'] !== undefined)?
    <HomeDiv>
      <UserInfoDiv>
        <UserImgDiv>
          <div>上傳圖片（暫）</div>
        </UserImgDiv>
        <div>使用者名稱：{userInfo.username}</div>
        <div>註冊日：{parseTime(userInfo.createdAt)}</div>
      </UserInfoDiv>
      <UserListDiv>
        <ListTitleDiv>角色紙列表</ListTitleDiv>
        <CharacterListDiv/>
        <ListTitleDiv>主持遊戲列表</ListTitleDiv>
        <SessionListDiv/>
      </UserListDiv>
    </HomeDiv>
    :
    <Redirect push to="/Auth"/>
    }
    </React.Fragment>
  )
}