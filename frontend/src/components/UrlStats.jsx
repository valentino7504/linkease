import { useState, useEffect, useCallback } from 'react';
import Countup from 'react-countup';
import urlService from '../services/urlService';
import logger from '../utils/logger';
import Button from './Button';
import roundDownToOneDP from '../utils/roundDown';

const UrlStats = () => {
  const [urlStats, setUrlStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    averageClicks: 0
  });

  const getStats = () => {
    urlService.getStats()
      .then(stats => {
        setUrlStats({
          totalUrls: stats.totalUrls,
          totalClicks: stats.totalClicks,
          averageClicks: stats.averageClicks
        });
      })
      .catch(err => logger.error(err));
  };

  useEffect(getStats, []);

  const animatedStats = [
    {
      title: 'total shortened URLs',
      value: urlStats.totalUrls
    },
    {
      title: 'total clicks on shortened URLs',
      value: urlStats.totalClicks
    },
    {
      title: `${urlStats.averageClicks !== 1 ? 'clicks' : 'click'} per URL on average`,
      value: urlStats.averageClicks
    }
  ];

  const statFormatter = useCallback((num) => {
    const ranges = [
      { divider: 1000000, suffix: 'M' },
      { divider: 1000, suffix: 'k' }
    ];
    const range = ranges.find(r => num >= r.divider);
    if (range) {
      const prefix = roundDownToOneDP(num / range.divider);
      return `${prefix}${range.suffix}`;
    }
    return num.toString();
  }, []);

  return (
    <>
      <h2 className='mt-20 text-center font-bold text-3xl'>Real-Time URL Statistics</h2>
      <div className='stats flex flex-row flex-wrap justify-around mt-20 gap-16 mb-32'>
        {
          animatedStats.map((stat, index) => {
            return (
              <div key={index}>
                <Countup
                  duration={2}
                  className='text-pri text-center font-bold text-9xl block'
                  end={stat.value}
                  formattingFn={statFormatter}
                />
                <h3 className='font-semibold text-2xl text-center'>{stat.title}</h3>
              </div>
            );
          })
        }
      </div>
      <Button text={'Refresh Stats'} handleClick={getStats} extraStyles='block mx-auto' />
    </>
  );
};

export default UrlStats;
