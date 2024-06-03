import React from 'react'
import { Navigationbar } from "@/components/navbar";
import { Searchbar } from "@/components/searchbar";
import { FooterContent } from '@/components/footer';

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