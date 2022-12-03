import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../context/auth';

function Dashboard() {
  const [count, setCount] = useState(0);
  const [auth] = useAuth();
  const [page, setPage] = useState(1);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [total, setTotal] = useState([])
  useEffect(()=>{
    loadProfiles();
    totatProfileData();
  },[])
  const totatProfileData = async()=>{
    try {
      const {data} = await axios.get(`/profiles/count`);
      setCount(data)
    } catch (error) {
       console.log(error);
    }
  }; 
  const loadProfiles = async()=>{
    try {
      const {data} = await axios.get(`/profiles/:${page}`);
      setProfiles(data);
     // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    loadNexProfiles();
  },[page]);
 const loadNexProfiles = async()=>{
  try {
    setLoading(true)
    const {data} = await axios.get(`/profiles/${page}`) 
    setProfiles(data)
    //console.log(data);
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
 };
 useEffect(()=>{
    keyword.length>0 && Search()
 },[keyword])
 
  const Search = async()=>{
    try {
     // console.log("length=>", keyword.length)
     // console.log("world=>", keyword)

      if(keyword.length>=0){
        const {data} = await axios.get(`/profiles/search/${keyword}`)
          setTotal(data)
      }
   

    } catch (error) {
      console.log(error)
    }
}
 
  return (
    <>
        <Container>
        <Row1>
          <Col1>
          <Input type="text" value={keyword} onChange={(e)=>{e.preventDefault(); setKeyword(e.target.value)}} placeholder='Search By Name/ lastName/ Country' /> 
           <Heading>Welcome {auth?.user?.firstName}-{auth?.user?.lastName}* ,Your Total Data ({count})</Heading>
           </Col1>
            <Col2>
              <Atable>
               <tr>
                <Th>FirstName</Th>
                <Th>LastName</Th>
                <Th>Email</Th>
                <Th>Country</Th>
              </tr>
              {!keyword.length>0?(profiles.map((p)=>(
              <tr>
                <Td>{p.firstName}</Td>
                <Td>{p.lastName}</Td>
                <Td>{p.email}</Td>
                <Td>{p.country}</Td>
              </tr>
              ))):(total.map((p)=>(
              <tr>
                <Td>{p.firstName}</Td>
                <Td>{p.lastName}</Td>
                <Td>{p.email}</Td>
                <Td>{p.country}</Td>
              </tr>
              ))) }
        </Atable>

           {!keyword.length>0?<>
            <Pagination>
               <Page  onClick={(e)=>{e.preventDefault(); setPage(1)}}>&laquo;</Page> 
               <Page  onClick={(e)=>{e.preventDefault(); setPage(2)}}>1</Page>
               <Page onClick={(e)=>{e.preventDefault(); setPage(3) }}>2</Page>
               <Page  onClick={(e)=>{e.preventDefault(); setPage(4) }}>3</Page>
               <Page  onClick={(e)=>{e.preventDefault(); setPage(5) }}>4</Page>
               <Page  onClick={(e)=>{e.preventDefault(); setPage(6) }}>5</Page>
               <Page  onClick={(e)=>{e.preventDefault(); setPage(7) }}>&raquo;</Page>
               </Pagination>
           </>:""}       
          </Col2>
        </Row1>
        </Container>   
    </>
  )
}

export default Dashboard;

const Container = styled.div`
   display:flex;
   justify-content:center;
   min-height:89vh;
   width: 100%;
`
const Row1 = styled.div`
   display:flex;
   flex-direction:column;
   align-content:center;
   width:90%;
   padding:14px;
   margin-top: 20px;
   box-shadow: -1px 6px 5px 0px rgba(0,0,0,0.80);
   border-radius: 4px;
`
const Col1 = styled.div`
 display:flex;
 justify-content:space-between;
 align-items:center;
 align-content:center;
`
const Col2 = styled.div`
   display:flex;
   flex-direction:column;
   justify-items:center;
   align-content:center;
`
const Input = styled.input`
  padding:10px;
  width: 30%;
  border:1px solid green;
  color:green;
  border-radius:3px;
`
const Heading = styled.h3`
   text-align:left;
   color:green;
   width:60%;
   font-weight:700;
   font-size:24px;
`
const Atable = styled.table`
    border-collapse: collapse;
     border: 1px solid black;
     width: 100%;
`
const Th = styled.th`
 border: 1px solid black;
`
const Td = styled.td`
 border: 1px solid black;
 text-align: center;
`
const Pagination = styled.div`
 color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .3s;
  margin: 0 4px;
`
const Page = styled.button`
    color: black;
  float: left;
  padding: 8px 16px;
  cursor:pointer;
  text-decoration: none;
  transition: background-color .3s;
  border: 1px solid #ddd;
  margin: 0 4px;
`

