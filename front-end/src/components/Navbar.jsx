import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import auth from '../utils/auth';

// create Navbar section function
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const clickHandler = () => setNav(!nav);

  return (
    <section
      name='navbar'
      className='w-full h-64 bg-gradient-to-b from-purple-800  to-red-200 sticky'
    >
      <div className='w-full grid grid-cols-2 flex-wrap justify-items-between p-2'>
        <div className='invisible'>
          {/* Navbar menu */}
          <ul className='flex md:visible py-4 ml-4 text-2xl text-bold divide-x'>
            <li className='nav'>
              <Link to='home' smooth={true} duration={500}>
                HOME
              </Link>
            </li>
            <li className='nav'>
              <Link to='champ' smooth={true} duration={500}>
                CHAMP
              </Link>
            </li>
            <li className='nav'>
              <Link to='throwdown' smooth={true} duration={500}>
                THROWDOWN
              </Link>
            </li>
            <li className='nav'>
              <Link to='profile' smooth={true} duration={500}>
                THUNDERDOME
              </Link>
            </li>
          </ul>
        </div>

        {/* Login / Signup */}
        {auth.loggedIn() ? (
          <ul className='hidden md:flex justify-end items-center space-x-3 mr-3 divide-x'>
            <li className='nav' onClick={auth.logout}>
              LOG OUT
            </li>
          </ul>
        ) : (
          <ul className='hidden md:flex justify-end items-center space-x-3 mr-3 divide-x'>
            <li className='nav'>
              {/* <Link to="/login" smooth={true} duration={500}> */}
              <a href='/login'>LOG IN</a>
              {/* </Link> */}
            </li>
          </ul>
        )}

        {/* Nav burger */}
        <div onClick={clickHandler} className='md:invisible z-10'>
          {!nav ? <FaBars /> : <FaTimes />}
        </div>
        <ul
          className={
            !nav
              ? 'invisible'
              : 'absolute top-0 w-full h-full flex flex-col inset-x-0 justify-content-center nav divide-y mt-2'
          }
        >
          <li className='py-2 text-xl text-center nav2'>
            {' '}
            <Link onClick={clickHandler} to='home' smooth={true} duration={500}>
              HOME
            </Link>
          </li>
          <li className='py-2 text-xl text-center nav2'>
            {' '}
            <Link
              onClick={clickHandler}
              to='throwdown'
              smooth={true}
              duration={500}
            >
              CHAMP
            </Link>
          </li>
          <li className='py-2 text-xl text-center nav2'>
            {' '}
            <Link
              onClick={clickHandler}
              to='champ'
              smooth={true}
              duration={500}
            >
              THROWDOWN
            </Link>
          </li>
          <li className='py-2 text-xl text-center nav2'>
            {' '}
            <Link
              onClick={clickHandler}
              to='profile'
              smooth={true}
              duration={500}
            >
              THUNDERDOME
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

// export Navbar section function
export default Navbar;
