import React from 'react';
import LeftBar from '../sidebarComponents/LeftBar';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className='flex w-full h-screen'>
      {/* Left sidebar */}
      <LeftBar />

      {/* Right content / main area */}
      <div className='flex-1 overflow-y-auto p-4'>
        <Outlet />
      </div>
    </div>
  );
}

export default Home;
