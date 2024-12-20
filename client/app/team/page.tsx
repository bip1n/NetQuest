import React from "react";
// import { Image, Card, CardHeader, CardBody, Link } from "@nextui-org/react";
import { Image, Link } from "@nextui-org/react";
import {  Card, CardHeader, CardBody } from "@nextui-org/react";

import { UserNavigationbar } from "@/components/UserNavigationbar";
import { GithubIcon } from "@/components/Icons";
import {InstagramIcon} from "@/components/Assets/Instagram"
import { UserNavBar } from "@/components/User/UserNavBar";


interface DeveloperProps {
  name: string;
  role: string;
  github: string;
  instagram: string;
  image: string;
}

const DeveloperCard: React.FC<DeveloperProps> = ({
  name,
  role,
  github,
  instagram,
  image,
}) => (
  <Card className="w-full md:w-1/3 flex flex-col items-center justify-center mb-4 p-4">
    <CardBody className="overflow-visible py-2">
      <Image
        isBlurred
        alt={`${name} background`}
        className="object-cover rounded-xl"
        src={image}
        width="100%"
        height={200}
      />
    </CardBody>
    <CardHeader className="pb-0 pt-2 px-4 flex justify-between items-start">
      <div>
        <h4 className="font-bold text-large">{name}</h4>
        <p className="text-tiny uppercase font-bold">{role}</p>
      </div>
      <div>
        <div className="flex items-center mr-4">
          <span className="mr-1"><GithubIcon/></span>
          <Link isExternal href={github} className="text-default-900 text-sm">{`@${github.split('/').pop()}`}</Link>
        </div>
        <div className="flex items-center">
          <span className="mr-1"><InstagramIcon/></span>
          <Link isExternal href={instagram} className="text-default-900 text-sm">{`@${instagram.split('/').pop()}`}</Link>
        </div>
      </div>
    </CardHeader>
  </Card>
);

export default function AboutPage() {
  return (
    <>
      <UserNavBar/>
      <Card className="w-full h-full flex flex-col items-center justify-center overflow-auto pt-4">
        <h5 className="text-xl font-bold">THE DEV TEAM</h5>
        <div className="flex flex-col md:flex-row items-center justify-center w-full mt-4 md:space-x-4">
          <DeveloperCard
            name="Bhabishwar Khanal"
            role="Frontend Developer"
            github="https://www.github.com/bip1n"
            instagram="https://www.instagram.com/bip1n_"
            image="https://res.cloudinary.com/dwc7juq50/image/upload/q_81/v1717431727/About/bipi1n_xcxvjh.avif"
          />
          <DeveloperCard
            name="Prajwol Ghimire"
            role="Backend Developer"
            github="https://www.github.com/prajwol-ghimire"
            instagram="https://www.instagram.com/_prajwol.ghimire"
            image="https://res.cloudinary.com/dwc7juq50/image/upload/v1717429755/About/prajwol_isxunh.jpg"
          />
          <DeveloperCard
            name="Subodh Dhami"
            role="Helper"
            github="https://www.github.com/subodhami"
            instagram="https://www.instagram.com/subodhami"
            image="https://res.cloudinary.com/dwc7juq50/image/upload/v1717429705/About/subodh_nfchh8.jpg"
          />
        </div>
      </Card>
    </>
  );
}
