import { useState } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

const Navbar = ({ active }) => {
  const [showNav, setShowNav] = useState(false);
  const navItems = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Stats',
      path: '/stats'
    }
  ];
  navItems.map((obj) => active === obj.path ? obj.active = true : obj.active = false);
  const handleTouch = (e) => e.currentTarget.classList.toggle('tap-nav');

  return (
    <nav className='flex justify-between items-center flex-wrap mx-auto p-4 md:px-12 pt-9'>
      <div className='logo tracking-wider space-x-3 font-bold'>
        <Link to={'/'}>LinkEase</Link>
      </div>
      <button
        data-collapse-toggle='navbar-default'
        type='button'
        className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black-500 rounded-lg md:hidden'
        aria-controls='navbar-default'
        aria-expanded='true'
        onClick={() => setShowNav(!showNav)}
        onTouchStart={handleTouch}
        onTouchEnd={handleTouch}
      >
        <span className='sr-only'>Open main menu</span>
        <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
        </svg>
      </button>
      <div className={`${showNav ? 'block' : 'hidden'} w-full md:pl-16 lg:pl-auto md:block md:w-1/2 lg:w-1/3 xl:w-1/4`}>
        <ul className='flex flex-col md:flex-row absolute w-11/12 bg-white md:relative'>
          {navItems.map((link, index) => {
            return (
              <li key={index}>
                <Link to={link.path}
                  className={`${link.active ? 'active-nav':'inactive-nav'} block py-2 px-8
                    rounded mx-auto lg:hover:bg-pri lg:hover:text-black
                    lg:hover:font-semibold text-base`}
                  onTouchStart={handleTouch}
                  onTouchEnd={handleTouch}>
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
