import React from 'react'
import Header from '../components/Header'
import Alldata from '../untils/AllDataFatch';

const page = async() => {
     let HeaderData;
     let MenusData;
      try {
        HeaderData = await Alldata("header");
        MenusData = await Alldata("menus");
      } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading data.</div>;
      }
    
      if (!HeaderData || !MenusData) {
        return <div>No data available.</div>;
      }
  return (
    <Header HeaderData={HeaderData} MenusData={MenusData}/>
  )
}

export default page