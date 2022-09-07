import React, {useContext, useEffect, useState} from 'react'
import { Context } from './Context'
import './Modal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Modal() {

    const {modal, handleModal, handleAdd, handleCheckbox} = useContext(Context)
    const [productData, setProductData] = useState()
    const url = 'https://stageapibc.monkcommerce.app/admin/shop/product'

    useEffect(() => {
        axios.get(url)
        .then((response) => {
            setProductData(response.data)
        })
        .catch((error) => {   
            console.log('There was an error', error)
        })
    }, [url])
    
  return (
    <>
    {modal && 
    <div className='modal'>
    <div className='overlay'>

    <div className='modal-content'>
        <div className='modal_header'>
            <p>Select Products</p>
            <FontAwesomeIcon className='modal_cut' onClick={handleModal} icon={faXmark} />
        </div>
        <hr className='lines'/>
        
        {productData && productData.map((item, i) => {
            return (
                <div className='modal-data' key={item.id}>
                <div className='m_data'>
                <input type="checkbox" name='parent' id={item.id} value={item.title} onFocus={handleCheckbox} />
                <img width='50px' src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1631043532-screen-shot-2021-09-07-at-3-37-41-pm-1631043469.png" />
                {item.title}
                </div>
                {item.variants.map(x => {
                    return (
                        <div className='m_data_child' key={x.id}>
                        <input type="checkbox" name='child' id={item.id} value={x.title} onFocus={handleCheckbox}/>
                        <img width='50px' src="https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1631043532-screen-shot-2021-09-07-at-3-37-41-pm-1631043469.png" />
                        {x.title}
                        </div>
                    )
                })}
                </div>
            )
            })}
        <button className='add-product_modal' onClick={() => handleAdd()}>Add</button>
    </div>


    </div>
    </div>}
    </>
  )
}

export default Modal