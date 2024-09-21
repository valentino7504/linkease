import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import urlService from '../services/urlService';
import logger from '../utils/logger';
import Navbar from '../components/Navbar';
import HorizontalRule from '../components/HorizontalRule';
import ValueProp from '../components/ValueProp';
import UrlStats from '../components/UrlStats';
import Footer from '../components/Footer';
import ShortUrlCard from '../components/ShortUrlCard';

const StatsDetails = () => {
  const location = useLocation();
  const { shortId } = useParams();
  const [urlDetails, setUrlDetails] = useState(location.state?.urlDetails || null);
  const navigate = useNavigate();

  const getUrlDetails = useCallback(() => {
    urlService.getUrl(shortId)
      .then(url => setUrlDetails(url))
      .catch(err => logger.error(err));
  }, []);

  useEffect(() => {
    getUrlDetails();
  }, [getUrlDetails]);

  if (!urlDetails)
    return null;

  return (
    <>
      <div className='min-h-screen'>
        <Navbar active={'/stats'} />
        <ShortUrlCard extraStyles={'mt-20 lg:mt-28'} urlDetails={urlDetails} handleClick={getUrlDetails} />
        <HorizontalRule />
        <UrlStats />
        <HorizontalRule />
        <ValueProp handleClick={() => navigate('/')} />
      </div>
      <Footer />
    </>
  );
};

export default StatsDetails;
