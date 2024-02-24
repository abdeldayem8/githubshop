import axios from 'axios'
import React, {  useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import {   useQuery } from 'react-query';
import {  Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useFormik } from 'formik';
import {useDispatch, useSelector } from 'react-redux';
Modal.setAppElement('#root');

export default function Products() {

  const [modelIsOpen,setmodelIsOpen] =useState(false);
  const [errmsg, seterrmsg] = useState(null);
  const language = useSelector(state => state.language.language);
  const [translations, setTranslations] = useState(null);
  const [value,setValue] = useState('');
  
  useEffect(() => {
    import(`../../locales/${language}.json`)
      .then(module => setTranslations(module.default))
      .catch(err => {
        console.error(`Failed to load translation file: ${err}`);
        import('../../locales/en.json')
          .then(module => setTranslations(module.default))
          .catch(err => console.error(`Failed to load English translation file: ${err}`));
      });
  }, [language]);
 

  const { isLoading, data,refetch } = useQuery(
    "allProducts",
    async () => {
      const response = await axios.get(
        `https://academy-training.appssquare.com/api/products?skip&search=${value}&id&restaurant_id`
      );
      return response.data.data;
    },
    {
      cacheTime: 24 * 60 * 60 * 1000,
    }
  );
  const handleChange=(e)=>{
    setValue(e.target.value)
   }
  useEffect(()=>{
    refetch();
  },[value]);
 

   async function CreateProduct(values) {    
    const {data}= await axios.post('https://academy-training.appssquare.com/api/products', values, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=> {
        setmodelIsOpen(false);
         refetch();
         clearForm(formikObject);
          
      } ).catch((error)=>{
        console.log(error);
        seterrmsg("Error Adding Product");
      })
  }
      
 
 

  const formikObject = useFormik({
   initialValues:{
    name:'',
    price:'',
    quantity:''
   },
   validate: function(values){
    const errors ={};
    if (!values.name) {
      errors.name = 'Name is required';
    }

    if (!values.price) {
      errors.price = 'Price is required';
    } else if (isNaN(values.price) || values.price <= 0) {
      errors.price = 'Price must be a positive number';
    }

    if (!values.quantity) {
      errors.quantity = 'Quantity is required';
    } else if (isNaN(values.quantity) || values.quantity <= 0) {
      errors.quantity = 'Quantity must be a positive number';
    }
       return errors;
   },
   onSubmit:CreateProduct,
  });
  const clearForm = (formik) => {
    formik.resetForm({
      values: {
        name: '',
        price: '',
        quantity: ''
      },
      errors: {}
    });
  };

 
   
   const handleDelete = async  (id) => {
   const {data} =  await  axios.delete(`https://academy-training.appssquare.com/api/products/${id}`,{
        headers: {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      }).then((res)=>{
        refetch();
      }).catch((error)=>{
        seterrmsg(error);
      })
    }
    if(isLoading || !translations ){
      return  <div className="h-screen flex justify-center items-center">
        <TailSpin
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        />
        </div>
      }  
  return <>

  <Modal  isOpen={modelIsOpen}  onRequestClose={()=>setmodelIsOpen(false)}>
    <div className='container m-auto text-black'>    
   <h2 className='text-center font-bold'>{translations.addproduct}</h2>
   <form action='' onSubmit={formikObject.handleSubmit}>
   <input type="text" value={formikObject.values.name || ''} placeholder="Name" name='name' onChange={formikObject.handleChange} onBlur={formikObject.handleBlur} className="block w-full border-gray-300 rounded-md px-4 py-2 bg-gray-200 my-2" />
   {formikObject.touched.name && formikObject.errors.name ? (  formikObject.errors.name) : ''}
  <input type="number" value={formikObject.values.price || ''} placeholder="Price" name='price' onChange={formikObject.handleChange} onBlur={formikObject.handleBlur} className="block w-full border-gray-300 rounded-md px-4 py-2 bg-gray-200 my-2" />
  {formikObject.touched.price && formikObject.errors.price ? (
            <div className="text-red-600">{formikObject.errors.price}</div>
          ) : ''}
  <input type="number" value={formikObject.values.quantity || ''} placeholder="Quantity" name='quantity' onChange={formikObject.handleChange} onBlur={formikObject.handleBlur} className="block w-full border-gray-300 rounded-md px-4 py-2 bg-gray-200 my-2" />
  {formikObject.touched.quantity && formikObject.errors.quantity ? (
            <div className="text-red-600">{formikObject.errors.quantity}</div>
          ) : ''}
   <div className='flex justify-center'>
    <button type='submit' className='bg-blue-500 text-white rounded-md font-semibold px-4 py-2 mr-2'>{translations.add}</button>
    <button type='button' className='bg-red-500 rounded-md text-white font-semibold px-4 py-2' onClick={()=>setmodelIsOpen(false)}>{translations.close}</button>
   </div>
   <div className='text-center my-2'>
   {errmsg && <div className='text-red-500'>{errmsg}</div>}
    
    </div>
   </form>
   </div>
  </Modal>


   <div className='container mx-auto px-5'>
    <div className='flex justify-between items-center mb-3'>
      <h2 className='text-lg font-semibold mb-4'>{translations.productlist}</h2>
      <button onClick={()=>setmodelIsOpen(true)} className='px-4 py-2  text-white rounded-md font-semibold  focus:outline-none  focus:shadow-outline "'>{translations.addproduct}</button>
    </div>
    <div className="search-container">
    <input type="search" onChange={handleChange} className="search-input" placeholder="Search..." />
   </div>
    <div className='grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-4'>
      {data.map(function(product,id){ return  <div className='flex flex-col' key={id}>
        <div className='product box'>
        <Link to={`/productdetails/${product.id}`}>
          <img src={product.image}  className='w-full' alt='product'/>
          <div className='text-center'>
          <h2 className='font-bold'>{product.name}</h2>
          <h6 className='my-1'>{translations.pricE}: {product.price}</h6>
          <p >{translations.quantity}: {product.quantity}</p>
    
          </div>
          <button className="w-full mt-1 p-3 rounded-md  border  font-semibold  focus:outline-none  focus:shadow-outline ">
  {translations.details}
</button>
       </Link> 
<button onClick={() => handleDelete(product.id)}  className="w-full mt-1 p-3 rounded-md  border   font-semibold  focus:outline-none  focus:shadow-outline ">
{translations.delete}
</button>
        </div>
        
      </div>})}
     
    </div>
   </div>  
 
  
  </>
}
