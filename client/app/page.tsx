"use client";

import AboutInfo from "@/components/AboutInfo";
import { FooterContent } from "@/components/Footer";
import { FrequentlyAskedQuestions } from "@/components/FrequentlyAskedQuestions";
import { Searchbar } from "@/components/Searchbar";
import { UserNavBar } from "@/components/User/UserNavBar";
import { UserNavigationbar } from "@/components/UserNavigationbar";
import Venue from "@/components/Venue";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


const HomePage = () => {
  return (
    <div className="flex min-h-screen w-full flex-col">
        {/* <UserNavigationbar/> */}
        <UserNavBar/>
        <main className="flex flex-1 flex-col gap-4 p-3 lg:p-4 md:gap-8 md:p-8">
            <Searchbar/>          
            <Card x-chunk="dashboard-01-chunk-0">
                <CardHeader>
                    <p className="flex flex-row items-center justify-center sm:justify-start uppercase text-large font-bold">
                        Featured Venues
                    </p>
                </CardHeader>
                <CardContent>
                    <Venue/>
                </CardContent>
            </Card>
            <AboutInfo/>
            <FrequentlyAskedQuestions/>
            <FooterContent/>
        </main>
    </div>
  );
};

export default HomePage;
