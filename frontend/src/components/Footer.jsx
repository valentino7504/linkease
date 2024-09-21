const Footer = () => {
  const footerItems = [
    {
      title: 'Twitter',
      href: 'https://twitter.com/valentino_7504'
    },
    {
      title: 'Instagram',
      href: 'https://instagram.com/valentino_7504'
    },
    {
      title: 'E-Mail',
      href: 'mailto:edwinmobnyjr@gmail.com'
    },
    {
      title: 'Linkedin',
      href: 'https://www.linkedin.com/in/edwin-m-ade'
    },
    {
      title: 'GitHub',
      href: 'https://github.com/valentino7504'
    }
  ];
  const handleTouch = (e) => e.target.classList.toggle('bg-white text-black no-underline');

  return (
    <div className='bg-black text-white p-8 mt-6'>
      <ul className='flex flex-row flex-wrap items-center justify-center'>
        {
          footerItems.map((item, index) => {
            return (
              <li key={index} className='mx-2'>
                <a href={item.href}
                  className='underline md:hover:no-underline md:hover:bg-white md:hover:text-black p-2 rounded-3xl'
                  target='_blank'
                  onTouchStart={handleTouch}
                  onTouchEnd={handleTouch}>
                  {item.title}
                </a>
              </li>
            );
          })
        }
      </ul>
      <p className='text-center mt-4'>For more information about this project, visit the GitHub repo <a href='https://github.com/valentino7504/linkease'
        className='underline'>
        here</a></p>
      <p className='text-center mt-4'>© {new Date().getFullYear()} LinkEase. All rights reserved. | <a href='/t8k8a' target='_blank' className='underline'>
        Terms of Use</a>
      </p>
    </div>
  );
};

export default Footer;
