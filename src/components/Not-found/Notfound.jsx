import React, { useEffect, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { useSelector } from 'react-redux';

export default function Notfound() {
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
  <div className=' h-screen flex justify-center items-center '>
        <h1>{translations.notfound}</h1>
    </div>
  </>
}
