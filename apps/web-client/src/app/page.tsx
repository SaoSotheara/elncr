import React from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import PressLogos from './components/PressLogos';
import JobList from './components/JobList';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page sections */}
        <Hero />
        <PressLogos />

        {/*  Page content */}
        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="py-8 md:py-16">
              <div className="md:flex md:justify-between" data-sticky-container>
                <Sidebar />

                {/* Main content */}
                <div className="md:grow">
                  <JobList />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  );
}
