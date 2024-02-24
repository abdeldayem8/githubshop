import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { MdNavigateNext } from "react-icons/md";
import { Link } from 'react-router-dom';
import image1 from '/Images/slider-image-1.jpeg';
import rest1 from '/Images/rest-1.jpg';
import rest2 from '/Images/rest-2.webp';
import prod1 from '/Images/prod-1.jpg';
import prod2 from '/Images/prod-2.jpg'
export default function Home() {
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
  
 if(!translations){
  return <div className="h-screen flex justify-center items-center">
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
  <div className='container mx-auto px-5 '>
     <figure>
      <img src={image1} alt='image' className='w-full height' />
     </figure>
     <h2 className='my-4 py-4 text-center'>{translations.analyse}</h2>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-4 my-4'>
      
       <div className='box text-center '>
            <h2>{translations.sales}</h2>
            <h3>12000</h3>
            <h4>{translations.decrese}</h4>
       </div>
       <div className='box text-center '>
            <h2>{translations.sales}</h2>
            <h3>12000</h3>
            <h4>{translations.decrese}</h4>
       </div>
       <div className='box text-center '>
            <h2>{translations.sales2}</h2>
            <h3>17000</h3>
            <h4>{translations.increase}</h4>
       </div>
       <div className='box text-center '>
            <h2>{translations.sales}</h2>
            <h3>12000</h3>
            <h4>{translations.decrese}</h4>
       </div>
     </div>
     <ul className='flex items-center justify-between'>
     <li className='my-4 py-4 '>{translations.rest}</li>
     <li className='my-4 py-4'> <Link className='flex items-center text-red-500' to='/restaurants'>{translations.all }<MdNavigateNext/></Link>  </li>
     </ul>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-2 gap-4 my-4'>
     <div className='box text-center '>
      <figure>
      <img src={rest1} alt='restaurant' className='w-full'/>
      </figure>
      <h3 className='my-2'>{translations.bing}</h3>
       </div>
       <div className='box text-center '>
      <figure>
      <img src={rest2} alt='restaurant' className='w-full'/>
      </figure>
      <h3 className='my-2'>{translations.ch}</h3>
       </div>
     </div>
     <ul className='flex items-center justify-between'>
     <li className='my-4 py-4 '>{translations.prod}</li>
     <li className='my-4 py-4'> <Link className='flex items-center text-red-500' to='/products'>{translations.all }<MdNavigateNext/></Link>  </li>
     </ul>
     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 mt-2 gap-4 my-4'>
     <div className='box text-center '>
      <figure>
      <img src={prod1} alt='restaurant' className='w-full'/>
      </figure>
      <h3 className='my-2'>{translations.bing}</h3>
       </div>
       <div className='box text-center '>
      <figure>
      <img src={prod2} alt='restaurant' className='w-full'/>
      </figure>
      <h3 className='my-2'>{translations.ch}</h3>
       </div>
     </div>
    </div>
  
  </>
}
