import styled from 'styled-components'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';

function Login() {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();
 
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        const {data} = await axios.post(`/login`, {email, password})
        if(data?.error){
          alert(data.error)
        }else{
          localStorage.setItem("auth", JSON.stringify(data))
          setAuth({...auth, token:data.token, user:data.user })
          alert("Login successful")
          setEmail("");
          setPassword("");
          navigate("/")
        }
    } catch (error) {
      console.log(error)
      alert("Login Failed")
    }
  }
  return (
    <Container>
 <Div>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
            <Input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
            <Input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
            <Button type="submit">Submit</Button>
        </Form>
        
    </Div>
    </Container>
   
  )
}

export default Login;

const Container = styled.div`
height:100vh;
display:flex;
justify-content:center;
align-content:center;
`
const Div = styled(Container)`
  max-height:220px;
  margin-top:80px;
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
 padding:10px;
 border-radius:3px;
 color:white;
 cursor:pointer;
 margin-top:7px;
 background-color:green;
 box-shadow: -1px 6px 5px 0px rgba(0,0,0,0.30);

`