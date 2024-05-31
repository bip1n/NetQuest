"use client";

import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button ,Input} from "@nextui-org/react";
import { Logo } from "@/components/icons";
import {EyeFilledIcon} from "./Assets/EyeFilledIcon";
import {EyeSlashFilledIcon} from "./Assets/EyeSlashFilledIcon";

export default function SigninModel() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <Button onPress={handleOpen}>SignIn</Button>
      <Modal backdrop={"opaque"} isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent>
          {(onClose) => (
            <> 
            
               <ModalHeader className="flex flex-row gap-1">  <span>  <Logo /> </span>  <p className="font-bold text-inherit mt-1">NetQuest</p></ModalHeader>
              <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
             
             
              <ModalBody >
                <Input type="email" label="Email" />
              </ModalBody>
              
              <ModalBody >
              <Input
                  type="email"
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
                  type={isVisible ? "text" : "password"}
                />
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
  );
}
