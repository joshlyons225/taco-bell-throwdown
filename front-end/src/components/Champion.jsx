// import files and dependencies
import React from 'react';
import Campeon from '../assets/images/campeon.png';

const Champion = () => {
  return (
    <section
      name='champ'
      className='bg-gradient-to-b from-red-800  to-black pb-5'
    >
      <div className=' items-center md:flex py-5'>
        <div className='flex-auto mx-auto pl-10'>
          <h1 className='text-rose-300 text-7xl py-4 font-bold sm:text-center md:text-left text-'>
            WEEKLY CHAMPION
          </h1>
          <p className='text-rose-300 sm:text-center md:text-left '>
            In life, there are winners, and there are losers. Here we present
            the cherished Taco Bell menu item that rules them all (if you spent
            all day mashing the UPVOTE button, good for you. We appreciate that
            kind of dedication, and your spot at the top is well-earned).
          </p>
        </div>

        <div className='pr-4 h-auto sm:flex-col'>
          <img
            src={Campeon}
            alt='Luchador Chihuahua with the words Taco Bell Campeon'
            className='mx-auto'
          ></img>
        </div>
      </div>

      <div className='items-center py-5 champbg h-full flex'>
        <div className='pt-auto pl-10 text-white '>
          <p className='text-6xl w-1/2 '>BLACK BEAN CHALUPA SUPREME</p>
          <p className='champtext pt-2 w-1/2'>
            And right here, we have the winner. You know. The kind of thing that
            you keep going back to time and again, although you know it just
            might be a toxic relationship. We're okay with that, too.
          </p>
        </div>
        <div className='flex container mx-auto my-auto'>
          <div className='tally outline text-white text-lg rounded-lg py-1 px-3 '>
            VOTE TOTAL COUNT | 681
          </div>
        </div>
      </div>
    </section>
  );
};

// export Champion section function
export default Champion;
