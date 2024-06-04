// import { title } from "@/components/primitives";
"use client"
import React , {useState} from "react";
import {Button, Card, CardHeader, CardBody, CardFooter,Checkbox, Divider, Link, Input} from "@nextui-org/react";
import { Logo } from "@/components/icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/footer";

export default function SignupPage() {
    const [isVisible, setIsVisible] = useState(false);
  
    const toggleVisibility = () => setIsVisible(!isVisible);
  
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
            <p className="font-bold text-inherit mt-1">SignUp</p>
            <Link
                isExternal
                showAnchorIcon
                href="/venue/register"
            >
                Register as a venue owner.
            </Link>
        </CardHeader>

        <CardBody>
                <span className="text-red-500">ERROR HERE!</span>
              </CardBody>

      <CardBody className="flex gap-4">
          <div className="flex flex-1 gap-4">
            <Input fullWidth type="text" label="Username" required />
            <Input fullWidth type="number" placeholder="98XXXXXXXX" label="Phone Number" required />
          </div>
        </CardBody>

      <CardBody >
            <Input fullWidth type="email" label="Email" required/>
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
        <CardBody>
              <Checkbox  >I agree to the terms and conditions.</Checkbox>
       </CardBody>
      
      <CardFooter className="flex justify-center">
        <Button   color="primary" radius="lg" className="w-full"> Sign Up</Button>
      </CardFooter>

       <Divider />
      <CardFooter>
        <Link href="/" >
            Already have an account? SignIn.
        </Link>
      </CardFooter>
    </Card>
    <FooterContent/>
  </>
  );
}
