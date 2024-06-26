import React from 'react'
import AuthForm from './AuthForm'
import { sendUserAuthRequest } from '../../api-helpers/api-helpers'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store'

const Auth = () => {
  const dispatch = useDispatch();
  const onResReceived = (data)=>{
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id)
  }
    const getData = (data)=>{
        sendUserAuthRequest(data.inputs, data.signup).then(onResReceived).catch(e=>console.log(e));
    }
  return (
    <div>
      <AuthForm onSubmit = {getData} isAdmin={false}/>
    </div>
  )
}

export default Auth
