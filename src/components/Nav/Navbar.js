import React, { useEffect } from 'react'
import styled from 'styled-components'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth';
function NavBar() {
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const logout = ()=>{
    setAuth({...auth, user:null, token:""})
    localStorage.removeItem("auth")   
  };
  useEffect(()=>{
    const localdata = localStorage.getItem("auth")
    if(!localdata){
       navigate("/login")
    }
  },[auth])


  return (
    <Div>
    <Ul>
    <Li>Assignment</Li>
    {auth?.token?<Li><RouteNavLink to="/" end="true">DASHBOARD</RouteNavLink></Li>:""}

    </Ul>
    <Ul width="30%">
    {!auth?.user?<>
      <Li><RouteNavLink to="/register">REGISTER</RouteNavLink></Li>
      <Li><RouteNavLink to="/login">LOGIN</RouteNavLink></Li>
    </>:(
      <Li><RouteNavLink to="#" onClick={logout}>LOGOUT</RouteNavLink></Li>
    )}
    </Ul>
    </Div>
  )
}
export default NavBar

const RouteNavLink = styled(NavLink)`
color:#5F8D4E;
text-decoration:none;
`;
const Div = styled.div`
background-color:#7FE9DE;
display:flex;
align-items:center;
justify-content:space-between;
width:100%;
box-shadow: -1px 6px 5px 0px rgba(0,0,0,0.40);
`
const Ul = styled.ul`
 display:flex;
 justify-content:center;
  align-items: center;
  list-style-type:none;
  width:${props => props.width};
 
 `
 const Li = styled.li`
  margin-right:20px;
 `
