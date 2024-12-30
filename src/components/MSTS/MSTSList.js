import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MSTSNav from './MSTSNav';

const MSTSList = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">MSTS Data Viewer</h1>
      <MSTSNav />
    </div>
  );
};

export default MSTSList;
