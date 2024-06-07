import React from 'react'
import { Navigationbar } from "@/components/Navigationbar";
import { Searchbar } from "@/components/Searchbar";
import { FooterContent } from '@/components/Footer';

interface Props {}

const HomePage = (props: Props) => {
  

  return (
    <>
      <Navigationbar />
      <Searchbar/>
      
      <FooterContent/>
    </>
  
  )
}

export default HomePage