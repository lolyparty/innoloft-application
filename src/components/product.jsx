import { useEffect, useState, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import ContentEditable from 'react-contenteditable'
import {getProductInfo, EditedDesc, editedbusinessModel, editedCategories, addBusinessModels, addCategories, editedTrl} from '../redux/productSlice'
import { getConfig } from '../redux/configSlice'



const Product =()=>{
    const data = useSelector(state=> {return state.Product})

    const config = useSelector(state=>{return state.Config})

    const [activeTab, setActiveTab] = useState(true);    

    const [newBusinessModel, setNewBusinessModel] = useState('')

    const [newCategory, setNewCategory] = useState('')

    const [savedChanges, setSavedChanges] = useState(false)

    const text = useRef('');

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getProductInfo())
      dispatch(getConfig())
    },[dispatch])

    const changeTab = (tab)=>{
        tab.target.innerHTML === 'Description' ? setActiveTab(true) : setActiveTab(false); 
    }

    const editChange = (e)=>{
        text.current = e.target.value;
    }

    const changeBusiness = (e)=>{
      setNewBusinessModel(e.target.value)
    }

    const addBusinessModel = (e)=>{
      e.preventDefault()
      if(newBusinessModel !== ""){
        dispatch(addBusinessModels(
          {
            id:0,
            name:newBusinessModel
          }
          ))
          setNewBusinessModel("")
      }
    }

    const changeCategory = (e)=>{
      setNewCategory(e.target.value)
    }

    const addCategory = (e)=>{
      e.preventDefault()
      if(newCategory !== ""){
        dispatch(addCategories(
          {
            id:0,
            name:newCategory
          }
          ))
          setNewCategory("")
      }
    }

    const selectionChnage = (e)=>{
      dispatch(editedTrl(
        {
          id:parseInt(e.target.value.trim().split(" ")[1]),
          name:e.target.value
        }
      ))
    }

    const saveDesc = (e)=>{
      dispatch(EditedDesc(e.target.innerHTML))
    }

    const editBusinessModels= (e)=>{
      let id = e.target.id
      const idArray = data.productInfo.businessModels.map((e)=>e.id)
      const idIndex = idArray.indexOf(parseInt(id))
      const edit = {
        id,
        name:e.target.innerHTML
      }
      dispatch(editedbusinessModel({idIndex,edit})) 
    }

    const editCategories= (e)=>{
      let id = parseInt(e.target.id)
      const idArray = data.productInfo.categories.map((e)=>e.id)
      const idIndex = idArray.indexOf(id)
      const edit = {
        id,
        name:e.target.innerHTML
      }
      dispatch(editedCategories({idIndex,edit})) 
    }
  

    const saveAllChanges = async (e)=>{
      e.preventDefault()
      const response = await axios.put('https://api-test.innoloft.com/product/6781/', data.productInfo)
      const responseMessage = await response

      if(responseMessage.status === 200){
        setSavedChanges(true)
        setTimeout(()=>{
          setSavedChanges(false)
        }, 2000)
      }
    }



    return <>
        {data.loading ? <p>Loading...</p> : Object.keys(data.productInfo).length > 0 && <main>
        {config.config.hasUserSection && <div className='user_container'>
            <img className='user_img' src={data.productInfo.user.profilePicture} alt="user"/>
            <div className='user_name'>
                <p>{data.productInfo.user.firstName} {data.productInfo.user.lastName}</p>
                <p>{data.productInfo.company.name}</p>
            </div>
        </div>}
        <div className='product_img-container'>
            <img src={data.productInfo.picture} alt={`product ${data.productInfo.id}`} className="product_img"/>
        </div>
        <div className="product_info-container">
                <h2 className='product_name'>{data.productInfo.name}</h2>
                <p className='product_type'>{data.productInfo.type.name}</p>
        </div>
          <div>
            <div className='tab_btns'>
                <button onClick={changeTab} className={activeTab ? 'active_btn' : ''}>Description</button>
                <button onClick={changeTab} className={!activeTab ? 'active_btn' : ''}>Attributes</button>
            </div>
            
            {activeTab ? <div>
              <ContentEditable html={data.productInfo.description} onChange={editChange} className='product_description' onBlur={saveDesc}/>
            </div>
            : 
            <div className='product_attributes'>
              <div className='product_attributes-container'><h3 className="attribute_heading">Categories</h3>
                {data.productInfo.categories.map((item)=>{
                return <ContentEditable html={item.name} tagName="p" id={item.id} className='product_attributes-categories' onBlur={editCategories}/>
                })}
                <br />
                <input type="text" placeholder="Add New Category" class="new_attribute" value={newCategory} onChange={changeCategory}/> <button className="add_button" onClick={addCategory}>Add</button>
                </div>

                <div className='product_attributes-container'>
                  <h3 className="attribute_heading">Business Models</h3> 
                  {data.productInfo.businessModels.map((item)=>{ return <ContentEditable html={item.name} id={item.id} tagName="p" className='product_attributes-business-models' onBlur={editBusinessModels}/>})}
                  <br />
                  <input type="text" placeholder="Add New Business model" class="new_attribute" value={newBusinessModel} onChange={changeBusiness}/> <button className="add_button" onClick={addBusinessModel}>Add</button>
                </div>
                <div className='product_attributes-container'> 
                  <h3 className="attribute_heading">TRL</h3> 
                  <p className="trl_description">{data.productInfo.trl.name}</p>
                  <select className="trl_selection" onChange={selectionChnage}>
                    <option id="1" selected={data.productInfo.trl.id === 1}>TRL 1</option>
                    <option id="2" selected={data.productInfo.trl.id === 2}> TRL 2</option>
                    <option id="3" selected={data.productInfo.trl.id === 3}> TRL 3</option>
                    <option id="4" selected={data.productInfo.trl.id === 4}> TRL 4</option>
                    <option id="5" selected={data.productInfo.trl.id === 5}>TRL 5</option>
                    <option id="6" selected={data.productInfo.trl.id === 6}> TRL 6</option>
                    <option id="7" selected={data.productInfo.trl.id === 7}> TRL 7</option>
                    <option id="8" selected={data.productInfo.trl.id === 8}>TRL 8</option>
                    <option id="9" selected={data.productInfo.trl.id === 9}> TRL 9</option>
                  </select>
                </div>
            </div>}
            
          </div>
          
          <div className='company_location'>
            <h3 className="address_heading">Address</h3>
            <p className="address_paragraph">{data.productInfo.company.address.house}, {data.productInfo.company.address.street}, {data.productInfo.company.address.city.name}, {data.productInfo.company.address.country.name}.</p> 
            {/* <p>Map</p>
            <p>Long: {data.productInfo.company.address.longitude}</p>
            <p>Lat: {data.productInfo.company.address.latitude}</p> */}
          </div>
          <div className="save">
            <button className="save_btn" onClick={saveAllChanges}>Save All Changes</button>
          </div>
          <div className={`save_container ${savedChanges && `save_anim`}`}>
            <p className="saved">Changes Saved Successfully!</p>
          </div>
        </main>}
        {data.error && <p>Error</p>}
    </>
}

export {Product}