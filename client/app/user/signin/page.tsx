// import { title } from "@/components/primitives";
"use client"
import React , {useState} from "react";
import {Button, Card, CardHeader, CardBody, CardFooter,Checkbox, Divider, Link, Input,Modal,ModalBody,ModalHeader, ModalContent,ModalFooter} from "@nextui-org/react";
import { Logo } from "@/components/icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/footer";

export default function SigninPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  
  return (
    <>
       <div>
      <Button color="secondary" onClick={handleOpen}>SignIn</Button>
      <Modal placement="center" backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <> 
              <ModalHeader className="flex flex-row gap-1">  
                <span><Logo /></span>  
                <p className="font-bold text-inherit mt-1">NetQuest</p>
              </ModalHeader>
              <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
              <ModalBody>
                <span className="text-red-500">ERROR HERE!</span>
              </ModalBody>
              <ModalBody>
                <Input type="email" label="Email" />
              </ModalBody>
              <ModalBody>
                <Input
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
                ></Input>
                  <Link href="#" size="sm">Forgot Password?</Link>
              </ModalBody>

              <ModalBody>
                <Link href="/user/signup" size="sm" >Don't have an account? Signup.</Link>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign In
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
    </>
  );
}
