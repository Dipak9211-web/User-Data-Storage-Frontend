import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import Loading from './Loading';

function PrivateRoutes() {
    const [auth] = useAuth();
    const [ok, setOk] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
        const authCheck = async ()=>{
          const {data} = await axios.get(`/auth-check`);
          if(data.ok){
           setOk(true)
          }else{
           setOk(false)
          }
        }
        authCheck();
        },[auth?.token])
  return ok?<Outlet/>:<Loading/>;
}

export default PrivateRoutes