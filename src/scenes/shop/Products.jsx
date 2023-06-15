import React,{useState,useEffect} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import "./products.css"
import { Container,Row,Col } from 'reactstrap'
//===========================================
import {Box} from "@mui/material";
import Header from "../../components/Header";
//===========================================

function Products({collapsedSB, setProdDetails, search}) {
//===========================================
const [prodData,setProdData]=useState([])
  useEffect(()=>{axios.get("http://localhost:3000/shop/getAll").then(({data})=> {setProdData(data.reverse());setProdDetails(data)}).catch((err)=>console.log(err))},[]);

  const updateProdData=()=>{
    axios.get("http://localhost:3000/shop/getAll").then(({data})=> {setProdData(data.reverse());setProdDetails(data)}).catch((err)=>console.log(err))
  }


  var style={marginLeft: '290px' }
  var style2={marginLeft: '280px' }
  if (collapsedSB){style = {marginLeft: '100px'};style2 = {marginLeft: '0px'}} 
//=============================================

  return (
   <>
   <Box m="20px" style={style}>
   <Header title="Store" subtitle="All products on sale" />
   </Box>
   <section className='pt-0' style={style2}>
    <Container>
      <Row>

      {!search.length && prodData?.map(product => <Col lg='3' className='mb-4' key={product.id}><ProductCard product={product} collapsedSB={collapsedSB} updateProdData={updateProdData} setProdData={setProdData}/></Col>)}
      {search.length && prodData?.filter((e)=>e.name.toLowerCase().includes(search.toLowerCase()) || (e.price).toString().includes((search).toString())).map(product => <Col lg='3' className='mb-4' key={product.id}><ProductCard product={product} collapsedSB={collapsedSB} updateProdData={updateProdData} setProdData={setProdData}/></Col>)}
        
      </Row>
    </Container>
   </section>
   </>
  )
}

export default Products