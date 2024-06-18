"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Button, Card, CardHeader, CardBody, CardFooter, Checkbox, Divider, Link, Input, Spinner } from "@nextui-org/react";
import { Logo } from "../../../components/Icons";
import { EyeFilledIcon } from "../../../components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/Footer";


export default function RegisterVenue() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoError, setVideoError] = useState<string>("");

  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [venueName, setVenueName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [mapCoord, setmapCoord] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (files.length < 3 || files.length > 6) {
        setImageError("Please select between 3 and 6 images.");
      } else {
        setImageError("");
        setSelectedImages(files);
      }
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files.length > 1) {
        setVideoError("Please select only one video.");
      } else {
        setVideoError("");
        setSelectedVideo(e.target.files[0]);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side redirect to login

    // The rest of the form handling logic (currently commented out)
    if (!termsAgreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", fullname);
    formData.append("phone", phone);
    formData.append("venueName", venueName);
    formData.append("panNumber", panNumber);
    formData.append("mapCoord", mapCoord);
    formData.append("email", email);
    formData.append("password", password);
    selectedImages.forEach((image, index) => {
      formData.append(`images`, image);
    });
    if (selectedVideo) {
      formData.append("video", selectedVideo);
    }

    setLoading(true);

    try {

      const response = await fetch("http://localhost:4000/api/adminregister", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      } else {
        // Handle successful registration
        const responseData = await response.json();
        console.log("Registration successful:", responseData);
        setError("Registration successful:");

        // redirect to login
        router.push('/login');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to register the venue. Please try again.");
    } finally {
      setLoading(false);
      console.log("Form submission complete.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className="w-full min-w-[400px] md:min-w-[500px] max-w-[500px]">
          <CardHeader className="flex gap-3">
            <Link color="foreground" href="/">
              <span><Logo /></span>
              <p className="font-bold text-inherit mt-1">NetQuest</p>
            </Link>
          </CardHeader>
          <CardHeader className="flex justify-between items-center">
            <p className="font-bold text-inherit mt-1">Login into your Venue</p>
          </CardHeader>
        

         

          <CardBody>
            <Input fullWidth type="email" label="Email"  value={email} required onChange={(e) => setEmail(e.target.value)} />
          </CardBody>

      
          
          <CardBody>
            <Input 
              type={isVisible ? "text" : "password"}
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              endContent={
                <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
            >
            </Input>
          </CardBody>
          <CardBody>
            <Input fullWidth type="text" label="Venue ID"  required onChange={(e) => setmapCoord(e.target.value)} />
          </CardBody>
          <CardFooter className="flex justify-center">
            <Button color="primary" radius="lg" className="w-full" type="submit" disabled={loading}>
             Login 
            </Button>
          </CardFooter>
          <Divider />
        </Card>
      </form>
      <FooterContent />
    </>
  );
}