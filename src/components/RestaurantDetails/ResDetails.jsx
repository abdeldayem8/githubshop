import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ResDetails() {
    
   const {id} = useParams();
   const language = useSelector(state => state.language.language);
   const [translations, setTranslations] = useState(null);
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
    function GetRestaurantDetails(){
        return axios.get(`https://academy-training.appssquare.com/api/restaurants/${id}`);
    }
  const {data,isLoading} =  useQuery("restaurantdetails",GetRestaurantDetails);
 
  if(isLoading || !translations){
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
  
  return<>
   <div className="grid justify-center">
      <div className="w-full  p-4">
        <div className="flex items-center">
          <figure>
          <img src={data.data.data.image} alt="Your Image" className="w-full rounded-full mr-4" />
          </figure>
          <div>
            <h2 className="text-lg font-semibold">{data.data.data.name}</h2>
            <p className="my-1"><strong>{translations.Address}:</strong> {data.data.data.address}</p>
            <p><strong>{translations.numberOfProducts}:</strong> {data.data.data.products.length}</p>
          </div>
        </div>
      </div>
      
    </div>
  </>
}
