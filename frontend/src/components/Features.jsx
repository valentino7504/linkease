const Features = () => {
  const featuresDetails = [
    {
      title: 'Custom short links',
      sub: 'Easily personalise your links for easy recall and sharing',
      img: 'https://i.imgur.com/7xeEOAB.png'
    },
    {
      title: 'Track your clicks and performance',
      sub: 'Find out how many people used your link with click counts',
      img: 'https://i.imgur.com/s4KkZ71.png'
    },
    {
      title: 'Works with any URL',
      sub: 'Seamlessy shorten URLs from any website, without restrictions',
      img: 'https://i.imgur.com/WNTYFXS.png'
    }
  ];

  return (
    <div className='features flex flex-row flex-wrap justify-evenly mt-28 gap-16 mb-32'>
      {featuresDetails.map((feature, index) => {
        return (
          <div key={index} className='text-center'>
            <img src={feature.img} alt='' className='w-20 block mx-auto mb-10' />
            <h2 className='text-2xl font-bold'>{feature.title}</h2>
            <p>{feature.sub}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Features;
