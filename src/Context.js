import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Context = React.createContext()

function ContextProvider ({children}) {

    const [modal, setModal] = useState(false)
    const [pickerDiv, setPickerDiv] = useState([{product: '', parent: '', child: '', childDisplay: false}])
    const [selectedPicker, setSelectedPicker] = useState(0)
    const [selectedCheckbox, setSelectedCheckbox] = useState([{parent: ''}])
    const [checkboxCheck, setCheckboxCheck] = useState([])
    const [selectedCheckboxChild, setSelectedCheckboxChild] = useState([{parent: '', child: ''}]) 
    const [productData, setProductData] = useState([])
    const [searchForm, setSearchForm] = useState('')
    const [apiMore, setApiMore] = useState(true)


    function addProd() {
    setPickerDiv(prevProd => [...prevProd, {product: '', parent: '', child: '', childDisplay: false}])  
    }

    function changeP(parentItemAll) {

        if (checkboxCheck.includes(parentItemAll.id)) {
            setCheckboxCheck(prevState => prevState.filter(child => child !== parentItemAll.id))
        } else {
            setCheckboxCheck(prevState => [...prevState, parentItemAll.id])
        }
    }

    function handleVariantVisible(i) {
        const _pickerDiv = [...pickerDiv]
        _pickerDiv[i].childDisplay = !_pickerDiv[i].childDisplay
        setPickerDiv(_pickerDiv)
    }

    function removePicker(i) {
        const _pickerDiv = [...pickerDiv]
        _pickerDiv.splice(i, 1)
        setPickerDiv(_pickerDiv)
    }

    function removePickerChild(i, index) {
        const getIndex = index
        const _pickerDiv = [...pickerDiv]
        _pickerDiv[i].child.splice(getIndex, 1)
        setPickerDiv(_pickerDiv)
    }

    function handleModal(i) {
        setModal(prevState => !prevState)
        setSelectedPicker(i)   
    }

    function handleDiscount(i, data) {
        const d = data
        const _pickerDiv = [...pickerDiv]
        _pickerDiv[i]['showDiscount'] = d
        setPickerDiv(_pickerDiv)
    }

    function handleDiscountChild(i, index, data) {
        const d = data
        const _pickerDiv = [...pickerDiv]
        _pickerDiv[i]['showDiscountChild'] = d
        setPickerDiv(_pickerDiv)
    }

    function handleCheckbox(e) {
        const {name, value} = e.target
        const _selectedCheckbox = [...selectedCheckbox]
        _selectedCheckbox[0]['parent'] = [`${value}`]
        setSelectedCheckbox(_selectedCheckbox)

    }


    function handleCheckboxChild(e, title, childId) {
        setCheckboxCheck(prevState => [...prevState, childId])
        const {name, value} = e.target
        const _selectedCheckboxChild = [...selectedCheckboxChild]
        _selectedCheckboxChild[0]['parent'] = [title]

        if (_selectedCheckboxChild[0]['child'].includes(value)) {
            _selectedCheckboxChild[0]['child'] = _selectedCheckboxChild[0]['child'].filter(child => child !== value)
        
        } else {
            _selectedCheckboxChild[0]['child'] = [`${value}`, ..._selectedCheckboxChild[0].child]
        }

        if (_selectedCheckboxChild[0]['child'].length === 0) {
            _selectedCheckboxChild[0]['parent'] = []
            setCheckboxCheck([])
        }
        
        setSelectedCheckboxChild(_selectedCheckboxChild) 
    }

    function handleAdd(name, value) {
        const _pickerDiv = [...pickerDiv]
        _pickerDiv[selectedPicker][name] = [...value]  
        setPickerDiv(_pickerDiv)
    }

    function _handleAddProducts() {
        if (selectedCheckboxChild[0].child.length > 0) {
            handleAdd('parent', selectedCheckbox[0].parent)
            handleAdd('parent', selectedCheckboxChild[0].parent)
            handleAdd('child', selectedCheckboxChild[0].child)
    
            setSelectedCheckbox([{product: '', parent: '', child: ''}])
            setSelectedCheckboxChild([{product: '', parent: '', child: ''}])
            setModal(prevState => !prevState)
        } else {
            alert('Select atleast 1 product with variants')
        }
    }

    function handleForm(e) {
        setSearchForm(e.target.value)
    }

    function fetchData() {
        const pageNum = productData.length / 10 + 1
        if (pageNum <= 33) {
        const url = `https://stageapibc.monkcommerce.app/admin/shop/product?search=${searchForm}&page=${pageNum}`
        axios.get(url)
        .then((response) => {
            setProductData(prevState => [...prevState, ...response.data])
        })
        .catch((error) => {   
            console.log('There was an error', error)
        })
        } else {
            setApiMore(false)
        }
    }



  return (
    <Context.Provider value={{pickerDiv, addProd, removePicker, removePickerChild, modal, handleModal, handleDiscount, handleDiscountChild, handleAdd, handleCheckbox, _handleAddProducts, handleCheckboxChild, handleForm, setSearchForm, searchForm, handleVariantVisible, setPickerDiv, checkboxCheck, changeP, selectedCheckboxChild, fetchData, setProductData, productData, apiMore}}>
        {children}
    </Context.Provider>
  )
}

export {ContextProvider, Context}