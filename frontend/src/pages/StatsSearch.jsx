import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import InputActionBox from '../components/InputActionBox';
import UrlStats from '../components/UrlStats';
import HorizontalRule from '../components/HorizontalRule';
import ValueProp from '../components/ValueProp';
import urlService from '../services/urlService';
import ErrorMsg from '../components/ErrorMsg';
import logger from '../utils/logger';
import debounce from '../utils/debounce';

const StatsSearch = () => {
  document.title = 'URL Statistics';
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [shortId, setShortId] = useState(null);

  const handleInputChange = (e) => {
    const newVal = e.target.value.trim().replace(/\/$/, '');
    const splitSearchArr = newVal.split('/');
    const newShortId = splitSearchArr[splitSearchArr.length - 1];
    setShortId(newShortId);
    setSearchTerm(newVal);
  }

  const searchTermCheck = () => {
    const re = /^(https:\/\/linkease\.vercel\.app\/[a-zA-Z0-9]+|[a-zA-Z0-9]+)$/;
    const error = !re.test(searchTerm);
    if (!error || !searchTerm) {
      setErrorMsg(null);
      if (!searchTerm)
        return
    }
    else {
      setErrorMsg('Please enter a valid URL or short ID. It should be in the ' +
        'format of shortId, linkease.vercel.app/shortId, or https://linkease.vercel.app/shortId.')
    }
  }

  useEffect(debounce(searchTermCheck, 750), [searchTerm]);
  useEffect(debounce(searchTermCheck, 0), [errorMsg]);

  const handleClick = (e) => {
    e.preventDefault();

    urlService.getUrl(shortId)
      .then(shortUrl => {
        if (shortUrl)
          navigate(`/stats/${shortUrl.shortId}`, { state: { urlDetails: shortUrl } })
        else {
          setErrorMsg(`No entry found for requested short URL -
            ${baseUrl}/${shortId}`)
          setTimeout(() => setErrorMsg(null), 3000);
        }
      })
      .catch(err => logger.error(err));
  };

  return (
    <>
      <div className='min-h-screen'>
        <Navbar active={'/stats'} />
        <div className='mt-20 lg:mt-36'>
          <Heading text='Search URL stats' extraStyles={'text-center'} />
          <h2 className='text-center text-gray-600'>Enter a shortened URL or short ID to view statistics</h2>
          <form className='mt-5 md:mt-10'>
            <InputActionBox
              containerStyles={'flex flex-row flex-wrap justify-center sm:w-full lg:w-3/4 mx-auto items-center gap-9'}
              placeholderText={'Enter short URL or shortID.....'}
              inputClass={'border-2 border-gray-300 p-2 text-lg' +
                'focus:outline outline-2 outline-gray-500 rounded-lg w-3/4 xl:w-1/2 md:p-4'}
              buttonText={'Search for URL'}
              handleInputChange={handleInputChange}
              handleClick={handleClick}
              isButtonDisabled={!!errorMsg || !searchTerm}
              buttonExtraStyles={'disabled:bg-gray-400'}
            />
          </form>
          {errorMsg && <ErrorMsg text={errorMsg} />}
        </div>
        <HorizontalRule />
        <UrlStats />
        <HorizontalRule />
        <ValueProp handleClick={() => navigate('/')} />
      </div>
      <Footer />
    </>
  );
};

export default StatsSearch;
