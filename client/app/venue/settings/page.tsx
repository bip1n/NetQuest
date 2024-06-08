import React from 'react'
import { Navigationbar } from "@/components/Navigationbar";

import { FooterContent } from '@/components/Footer';

interface Props {}

const SettingPage = (props: Props) => {
  

  return (
    <>
      <Navigationbar />
     
      profile settings
      <FooterContent/>
    </>
  
  )
}

export default SettingPage