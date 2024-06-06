"use client"
import React, { useState } from "react";
import { Button, Card, CardHeader, CardBody, CardFooter, Divider, Link, Input } from "@nextui-org/react";
import { Logo } from "@/components/Icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/footer";


export default function Signin() {
  const [isOpen, setIsOpen] = useState(false);


  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <>
    <div className="flex items-center justify-center mt-2">
      <Card className="w-full min-w-[400px] md:min-w-[500px] max-w-[500px]">
        <CardHeader className="flex gap-3">
          <Link color="foreground" href="/">
            <span>
              <Logo />
            </span>
            <p className="font-bold text-inherit mt-1">NetQuest</p>
          </Link>
        </CardHeader>

        <CardHeader className="flex justify-between items-center">
          <p className="font-bold text-inherit mt-1">Sign In</p>
        </CardHeader>

        <CardBody>
          ERROR HERE!!!
        </CardBody>

        <CardBody>
          <Input
            fullWidth
            type="email"
            label="Email"
            required
          />
        </CardBody>
        <CardBody>
          <Input
            required
            type={isVisible ? "text" : "password"}
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          ></Input>
        </CardBody>
        

        <CardBody>
          <Link href="/forgotpassword">Forgot Password?</Link>
        </CardBody>

        <CardFooter className="flex justify-center">
          <Button
            color="primary"
            radius="lg"
            className="w-full"
            type="submit"
          >
            Sign Ip
          </Button>
        </CardFooter>

        <Divider />
        <CardFooter>
          <Link href="/user/signup">Don't have an account? SignUp here.</Link>
        </CardFooter>
      </Card>
    </div>
    <FooterContent />
    </>
  );
}
