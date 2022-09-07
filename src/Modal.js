import React, {useContext, useEffect, useState} from 'react'
import { Context } from './Context'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";

function Modal() {

    const {modal, handleModal, handleForm, handleCheckbox, handleCheckboxChild, _handleAddProducts, searchForm, checkboxCheck, changeP, selectedCheckboxChild, fetchData, setProductData, productData, apiMore} = useContext(Context)

    const url = `https://stageapibc.monkcommerce.app/admin/shop/product?search=${searchForm}&page=1`

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setProductData(response.data)
        })
        .catch((error) => {   
            console.log('There was an error', error)
        })
    }, [url, modal])

  return (
    <>
    {modal && 
    <div className='modal'>
    <div className='overlay'>

    <div className='modal-content' id="scrollableDiv">
        <div className='modal_header'>
            <p>Select Products</p>
            <FontAwesomeIcon className='modal_cut' onClick={handleModal} icon={faXmark} />
        </div>
        {/* <hr className='lines'/> */}
        <div className='modal_search'>
            <div className='m_search'>
                <div className='search'>
            <FontAwesomeIcon className='modal_cuts' icon={faMagnifyingGlass} />
                <input type='text' value={searchForm} onChange={handleForm} id='searchInput' name='search' placeholder='Search product' />
                </div>
            </div>
        </div>
        {/* <hr className='lines'/> */}
        <div className='spinner'>
        <InfiniteScroll
        dataLength={productData.length}
        next={fetchData}
        hasMore={apiMore}
        scrollableTarget="scrollableDiv"
        loader={<BeatLoader className='loader' color="#000" />}
        endMessage={ <p style={{ textAlign: 'center' }}> No more products :( </p>}>
        {productData && productData.map((item, i) => {
            return (
                <div className='modal-data' key={item.id}>
                <label className='checkbox-label'>
                <div className='m_data'>
                <input type="checkbox" checked={checkboxCheck.includes(item.id) ? true : false} name='parent' id={item.id} value={item.title} onClick={handleCheckbox} onChange={() => changeP(item)}/>
                <img width='50px' src={item.image.src ? item.image.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1022px-Placeholder_view_vector.svg.png'} />
                {item.title}
                </div>
                </label>
                {/* <hr className='lines'></hr> */}

                {/* child options start here */}
                {item.variants.map(x => {
                    return (
                        <label className='checkbox-label' key={x.id}>
                        <div className='m_data_child' key={x.id}>
                        <div className='m_data_child_one'>
                        <input type="checkbox" name='child' id={item.id} value={x.title} onClick={(e) => handleCheckboxChild(e, item.title, item.id)}/>
                        <img width='40px' src={item.image.src ? item.image.src : 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1022px-Placeholder_view_vector.svg.png'} />
                        {x.title}
                        </div>
                        <div className='child_modal_data'>
                        {x.inventory_quantity ? <p>{x.inventory_quantity} available</p> : <p>Not Available</p>}
                        <p>${x.price}</p>
                        </div>
                        </div>
                        </label>
                    )
                })}
                </div>
            )
            })}
        </InfiniteScroll>
        </div>
        <div className='footer'>
        <button className='cancel_modal' onClick={handleModal}>Cancel</button>
        <button className='add-product_modal' disabled={selectedCheckboxChild[0].child.length > 0 ? false : true} onClick={_handleAddProducts}>Add</button>
        </div>
    </div>


    </div>
    </div>}
    </>
  )
}

export default Modal