'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Illustration from '../images/hero-illustration.svg';
import Avatar01 from '../images/avatar-01.jpg';
import Avatar02 from '../images/avatar-02.jpg';
import Avatar03 from '../images/avatar-03.jpg';
import Avatar04 from '../images/avatar-04.jpg';

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Bg */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-white pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Illustration */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2 pointer-events-none -z-10"
        aria-hidden="true"
      >
        <Image
          src={Illustration}
          className="max-w-none"
          width="1440"
          height="749"
          alt="Hero Illustration"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-28 pb-8 md:pt-36 md:pb-16">
          {/* Hero content */}
          <div className="max-w-4xl text-center md:text-left">
            {/* Copy */}
            <h2 className="h2 font-inter mb-6">
              Introducing{' '}
              <span className="font-nycd text-indigo-500 font-normal">
                Elncr
              </span>
              , the ultimate platform that revolutionizes the way you find your
              dream job{' '}
            </h2>
            <p className="text-lg text-gray-500 mb-8">
              With{' '}
              <span className="font-nycd text-indigo-500 font-normal">
                Elncr
              </span>
              , you can say goodbye to the overwhelming and time-consuming job
              search.
            </p>
            {/* Button + Avatars */}
            <div className="sm:flex sm:items-center sm:justify-center md:justify-start space-y-6 sm:space-y-0 sm:space-x-5">
              <div>
                <Link
                  className="btn text-white bg-indigo-500 hover:bg-indigo-600 shadow-sm"
                  href="/post-a-job"
                >
                  Post a job
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
