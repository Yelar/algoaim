'use client'
// pages/contact.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Dashboard } from '@/components/dashboard';


const DashboardPAge = () => {
    useEffect(() => {
        localStorage.clear();
    }, []);
  return (
    <Dashboard/>
  );
};

export default DashboardPAge;