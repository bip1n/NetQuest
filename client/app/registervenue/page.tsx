"use client"
import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, Checkbox, Divider, Link, Input } from "@nextui-org/react";
import { Logo } from "@/components/icons";
import { EyeFilledIcon } from "../../components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/footer";

export default function RegisterVenue() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string>("");
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [videoError, setVideoError] = useState<string>("");

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

  return (
    <>
      <Card className="w-full min-w-[400px] md:min-w-[500px] max-w-[500px]">
        <CardHeader className="flex gap-3">
          <Link color="foreground" href="/">
            <span><Logo /></span>
            <p className="font-bold text-inherit mt-1">NetQuest</p>
          </Link>
        </CardHeader>

        <CardHeader className="flex justify-between items-center">
          <p className="font-bold text-inherit mt-1">Register your venue in NetQuest!</p>
        </CardHeader>

        <CardBody>
          <span className="text-red-500">ERROR HERE!</span>
        </CardBody>

        <CardBody className="flex gap-4">
          <div className="flex flex-1 gap-4">
            <Input fullWidth type="text" label="Name of Owner" required />
            <Input fullWidth type="number" placeholder="98XXXXXXXX" label="Phone Number" required />
          </div>
        </CardBody>

        <CardBody className="flex gap-4">
          <div className="flex flex-1 gap-4">
            <Input fullWidth type="text" label="Registered Name of Venue" required />
            <Input fullWidth type="number" label="PAN Number" required />
          </div>
        </CardBody>

        <CardBody>
          <Input fullWidth type="text" label="Google Maps Coordinate" required />
        </CardBody>

        <CardBody>
          <Input fullWidth type="email" label="Email" required />
        </CardBody>

        <CardBody>
          <Input required
            type={isVisible ? "text" : "password"}
            label="Password"
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
          <Input required
            type={isVisible ? "text" : "password"}
            label="Confirm Password"
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


        <CardBody className="flex gap-4">
          <div className="flex flex-1 gap-4">
            <Input fullWidth type="text" readOnly value={"Upload 3-6 Images"} />
            <Input  fullWidth type="file" accept="image/*" multiple onChange={handleImageChange} required />  
          </div>
          {imageError && <p className="text-red-500">{imageError}</p>}
        </CardBody>

        <CardBody>
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {selectedImages.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Selected Image ${index + 1}`}
                  className="h-32 w-full object-cover"
                />
              ))}
            </div>
          )}
        </CardBody>

        <CardBody className="flex gap-4">
          <div className="flex flex-1 gap-4">
            <Input fullWidth type="text" readOnly value={"Upload Video"} />
            <Input  fullWidth type="file" accept="video/*"  onChange={handleVideoChange} required />  
          </div>
          {videoError && <p className="text-red-500">{videoError}</p>}
        </CardBody>


        <CardBody>
          {selectedVideo && (
            <video className="w-full" controls>
              <source src={URL.createObjectURL(selectedVideo)} type={selectedVideo.type} />
              Your browser does not support the video tag.
            </video>
          )}
        </CardBody>
        <CardBody>
          <Checkbox>I agree to the <Link href="/termsandconditionsforvenueowners">terms and conditions.</Link></Checkbox>
        </CardBody>

        <CardFooter className="flex justify-center">
          <Button color="primary" radius="lg" className="w-full">Register</Button>
        </CardFooter>

        <Divider />
      </Card>
      <FooterContent />
    </>
  );
}
