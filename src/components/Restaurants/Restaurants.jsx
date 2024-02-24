import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import {  useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Restaurants() {

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
    "allrestaurants",
    async () => {
      const response = await axios.get(
        `https://academy-training.appssquare.com/api/restaurants?skip=0&search=${value}&id`
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
   <div className='container mx-auto px-5'>
   <div className='flex justify-between items-center mb-3'>
      <h2 className='text-lg font-semibold mb-4'>{translations.restaurantsTitle}</h2>
    </div>
    <div className="search-container">
    <input type="search"  onChange={handleChange}    className="search-input" placeholder="Search..." />
   </div>
    <div className='grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>
      {data.map(function(restaurant,id){ return  <div className='flex flex-col ' key={id}>
        <div className='restaurant box'>
          <Link to={`/restaurantdetails/${restaurant.id}`}>
          <img src={restaurant.image}  className='w-full' alt='product'/>
          <div className='text-center'>
          <h2 className='font-bold'>{restaurant.name}</h2>
          <h6 className='my-1'>{restaurant.address.split(' ').slice(0,4).join("-")}</h6>
          <p className='text-green-500'>{translations.numberOfProducts}: {restaurant.products.length}</p>
          </div>
          </Link>
        </div>
        
      </div>})}
     
    </div>
   </div>  
 
  
  </>
}
