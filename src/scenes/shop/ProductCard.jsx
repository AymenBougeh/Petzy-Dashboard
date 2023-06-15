import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardBody } from 'reactstrap'
import { Link, useNavigate} from "react-router-dom"

import './product-card.css'
import { tokens } from "../../../src/theme"
import { useTheme } from "@mui/material";
function ProductCard({ product, collapsedSB, setRender, render, updateProdData, setProdData}) {
    const { id, name, image, price } = product;
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showPopup, setShowPopup] = useState(false);
    const navigate=useNavigate()

    return (
        <div className='tour_card'>
            <Card>
                <div className='tour_img'>
                    <img src={image} alt="tour-img" />
                </div>

                <CardBody>
                    <h5 className="tour_title"><Link to={`/products`}>{name}</Link></h5>

                    <div className='card_bottom d-flex align-items-center justify-content-between mt-3'>
                        <h5 style={{ color: colors.greenAccent[600] }}>${price} <span> /per entity </span></h5>
                        <button className="btn booking_btn" style={{ backgroundColor: colors.greenAccent[600] }}>
                            <Link to={`/updateProduct/${id}`} >Update</Link>
                        </button>
                        <button
                            className="btn booking_btn"
                            style={{ backgroundColor: colors.greenAccent[600] }}
                            onClick={() => setShowPopup(!showPopup)}
                        >
                            <Link to={`/products`} >Remove</Link>
                        </button>
                    </div>
{/* ============================================================================================================ */}
                    {showPopup && collapsedSB && (
                        <div className='tour_card popup' >
                        <Card>
                            <div className='tour_img'>
                                <img src={image} alt="Product img" />
                            </div>
            
                            <CardBody>
                                <h6 className="tour_title"><Link to={`/products/`}>Are you sure you want to remove <b>{name}</b>  from your store ?</Link></h6>
            
                                <div className='card_bottom d-flex align-items-center justify-content-between mt-3'>
                                    <h5 style={{ color: colors.greenAccent[600] }}>${price} <span> /per entity </span></h5>
                                    <button
                                        className="btn booking_btn"
                                        style={{ backgroundColor: colors.greenAccent[600] }}
                                        onClick={()=>{
                                            axios.delete(`http://localhost:3000/shop/deleteProduct/${id}`).then((res)=>{updateProdData();setRender(!render);navigate("/products");setShowPopup(!showPopup)}).catch((err)=>{console.log(err)})
                                        }}
                                    >
                                        <Link to={`/products`} >Remove</Link>
                                    </button>
                                    <button
                                        className="btn booking_btn"
                                        style={{ backgroundColor: colors.greenAccent[600] }}
                                        onClick={() => setShowPopup(!showPopup)}
                                    >
                                        <Link to={`/products`} >Cancel</Link>
                                    </button>
            
                                </div>
            
                            </CardBody>
                        </Card>
            
                    </div>
                    )}
{/* ============================================================================================================ */}
                    {showPopup && !collapsedSB && (
                        <div className='tour_card popup1' >
                        <Card>
                            <div className='tour_img'>
                                <img src={image} alt="Product img" />
                            </div>
            
                            <CardBody>
                                <h6 className="tour_title"><Link to={`/products/`}>Are you sure you want to remove <b>{name}</b>  from your store ?</Link></h6>
            
                                <div className='card_bottom d-flex align-items-center justify-content-between mt-3'>
                                    <h5 style={{ color: colors.greenAccent[600] }}>${price} <span> /per entity </span></h5>
                                    <button
                                        className="btn booking_btn"
                                        style={{ backgroundColor: colors.greenAccent[600] }}
                                        onClick={()=>{
                                            axios.delete(`http://localhost:3000/shop/deleteProduct/${id}`).then((res)=>{updateProdData();setRender(!render);navigate("/products");setShowPopup(!showPopup)}).catch((err)=>{console.log(err)})
                                        }}
                                    >
                                        <Link to={`/products`} >Remove</Link>
                                    </button>
                                    <button
                                        className="btn booking_btn"
                                        style={{ backgroundColor: colors.greenAccent[600] }}
                                        onClick={() => setShowPopup(!showPopup)}
                                    >
                                        <Link to={`/products`} >Cancel</Link>
                                    </button>
            
                                </div>
            
                            </CardBody>
                        </Card>
            
                    </div>
                    )}

                </CardBody>
            </Card>

        </div>
    )
}

export default ProductCard
