import React, { useState, useContext, useRef } from 'react'
import './ProductList.css'
import { Context } from './Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faGripVertical, faXmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

function ProductList() {

    const {pickerDiv, addProd, removePicker, handleModal, handleDiscount, handleDiscountChild, removePickerChild, handleVariantVisible, setPickerDiv} = useContext(Context)

    const dragItem = useRef(null)
	  const dragOverItem = useRef(null)

    const dragItemChild = useRef(null)
	  const dragOverItemChild = useRef(null)

    function handleSort() {
      let _pickerDiv = [...pickerDiv]
      const draggedItemContent = _pickerDiv.splice(dragItem.current, 1)[0]
      _pickerDiv.splice(dragOverItem.current, 0, draggedItemContent)
      setPickerDiv(_pickerDiv)
      dragItem.current = null
		  dragOverItem.current = null

    }

    function handleSortChild(i) {
      let _pickerDivChild = [...pickerDiv]
      const draggedItemContent = _pickerDivChild[i].child.splice(dragItemChild.current, 1)[0]
      _pickerDivChild[i].child.splice(dragOverItemChild.current, 0, draggedItemContent)
      setPickerDiv(_pickerDivChild)

      dragItemChild.current = null
		  dragOverItemChild.current = null
    }



  return (
    <div className='main-container'>
        <h1 className='main-title'>Add Products</h1><br></br> <br></br>
        {pickerDiv.map((item, i) => (
                <div className='picker' draggable key={i} onDragStart={(e) => (dragItem.current = i)} onDragEnter={(e) => (dragOverItem.current = i)} onDragEnd={handleSort} onDragOver={(e) => e.preventDefault()}>
                <div className='picker_child_one'>
                <div className='picker-meta'>
                <FontAwesomeIcon className='icons_drag' icon={faGripVertical} />
                <p>{i + 1}</p>
                </div>
            
                <div className='product-input'>
                <p>{pickerDiv[i].parent.length > 0 ? pickerDiv[i].parent : "Select Product"}</p><FontAwesomeIcon className='icons_input' onClick={() => handleModal(i)} icon={faPencil} />
                </div>
            
                {pickerDiv[i].showDiscount ? '' : <button className='add-discount' onClick={() => handleDiscount(i, true)}>Add Discount</button>}
                {pickerDiv[i].showDiscount && <input type='number' max='100' pattern='[0-9]+' name='discount' id='inputParent'/>}
                {pickerDiv[i].showDiscount && 
                <select name="discount" id="discount_dd">
                <option value="percent">% Off</option>
                <option value="flat">Flat Off</option>
                </select>}
                <div className='picker-meta'>
                <FontAwesomeIcon className='icons_cut' onClick={() => removePicker(i)}  icon={faXmark} />
                </div>
                </div>
                {pickerDiv[i].child.length > 0 && <p className='variants' onClick={() => handleVariantVisible(i)}>{` ${pickerDiv[i].childDisplay === true ? 'Hide Variants' : 'Show Variants' }`} <FontAwesomeIcon className='icons_cut' icon={pickerDiv[i].childDisplay === true ? faChevronUp : faChevronDown} /></p>}

                {/* child picker */}
                {pickerDiv[i].child ? item.child.map((x, index) => (
                <div className={`picker_child_two ${pickerDiv[i].childDisplay ? 'show' : 'hide'}`}  draggable key={index} onDragStart={(e) => (dragItemChild.current = index)} onDragEnter={(e) => (dragOverItemChild.current = index)} onDragEnd={() => handleSortChild(i)} onDragOver={(e) => e.preventDefault()}>
                <div className='picker-meta'>
                <FontAwesomeIcon className='icons_drag' icon={faGripVertical} />
                </div>
            
                <div className='product-input-child'>
                <p>{pickerDiv[i].child ? x : "Select Product"}</p>
                </div>
            
                {pickerDiv[i].showDiscountChild ? '' : <button className='add-discount' onClick={() => handleDiscountChild(i, index, true)}>Add Discount</button>}
                {pickerDiv[i].showDiscountChild && <input type='number' max='100' pattern='[0-9]+' name='discount' id='inputChild'/>}
                {pickerDiv[i].showDiscountChild && 
                <select name="discount" id="discount_dd_child">
                <option value="percent">% Off</option>
                <option value="flat">Flat Off</option>
                </select>}
                <div className='picker-meta'>
                {pickerDiv[i].child.length > 1 && <FontAwesomeIcon className='icons_cut' onClick={() => removePickerChild(i, index)}  icon={faXmark} />}
                </div>
                </div>
                )) : ''

                }
                </div>

                
        ))}
        <button className='add-product' onClick={() => addProd()}>Add Product</button>
  
    </div>
  )
}

export default ProductList