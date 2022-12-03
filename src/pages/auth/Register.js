import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

import styled from 'styled-components'

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    //context hook
     const [auth, setAuth] = useAuth();
      const navigate = useNavigate();
  
    const handleSubmit = async (e)=>{
      e.preventDefault();
      try {
        const {data} = await axios.post(`/register`, {firstName, lastName, email, password})
        if(data?.error){
          alert(data.error)
        }else{
          localStorage.setItem("auth", JSON.stringify(data));
          setAuth({...auth, token:data.token, user:data.user });
          alert("Registration successfull")
             setFirstName("");
             setLastName("");
              setEmail("");
              setPassword("");
              navigate("/")
        }
      } catch (error) {
        console.log(error);
        alert("Registration failed, try again")
      }
    }
  return (
    <Container>
 <Div>
        <h2>Register</h2>
        <Form onSubmit={handleSubmit}>
            <Input type="text" value={firstName} onChange={(e)=>setFirstName(e.target.value)} autoFocus placeholder='firstName' />
            <Input type="text"  value={lastName} onChange={(e)=>setLastName(e.target.value)} autoFocus placeholder='lastName' />
            <Input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} autoFocus placeholder='Email' />
            <Input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} autoFocus placeholder='Password' />
            <Button>Submit</Button>
        </Form>
        
    </Div>
    </Container>
   
  )
}

export default Register

const Container = styled.div`
height:100vh;
display:flex;
justify-content:center;
align-content:center;
`
const Div = styled(Container)`
  max-height:300px;
  margin-top:70px;
  background-color:#CFFDE1;
   width:30%;
   padding:10px;
   border-radius:4px;
   flex-direction:column;
   box-shadow: -1px 6px 5px 0px rgba(0,0,0,0.80);
`
const Form = styled.form`
display:flex;
flex-direction:column;
align-items:center;
`
const Input = styled.input`
 padding:10px;
 margin-bottom:10px;
 border:1px solid grey;
 width:94%;
 border-radius:4px;
`
const Button = styled.button`
 border:none;
 padding:8px;
 cursor: pointer;
 border-radius:3px;
 color:white;
 background-color:green;
   box-shadow: -1px 6px 5px 0px rgba(0,0,0,0.30);

`