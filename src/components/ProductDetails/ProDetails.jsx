import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function ProDetails() {
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
    function GetProductDetails(){
        return axios.get(`https://academy-training.appssquare.com/api/products/${id}`);
    }
  const {data,isLoading} =  useQuery("productDetails",GetProductDetails);
 
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
  
  return <>
   <div className="grid justify-center h-full">
      <div className="w-full  p-4">
        <div className="flex items-center">
          <figure>
            <img src={data.data.data.image} alt={data.data.data.name} className="w-full rounded-full mr-4" />
          </figure>
          <div>
            <h2 className="text-lg font-semibold">{data.data.data.name}</h2>
            <p className="my-1"><strong>{translations.quantity}:</strong> {data.data.data.quantity}</p>
            <p><strong>{translations.pricE}:</strong> {data.data.data.price}</p>
          </div>
        </div>
      </div>
    </div>

  </>
}
