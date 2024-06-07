"use client"
import React, { useState } from "react";
import {
  Button,
  Link,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter
} from "@nextui-org/react";
import { Logo } from "@/components/Icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/footer";


export default function Signin() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      } else {
        const responseData = await response.json();
        console.log("Sign-in successful:", responseData);
        // Redirect to another page or handle successful sign-in
        handleClose();
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <Button color="secondary" onClick={handleOpen}>SignIn</Button>
        <Modal placement="center" backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen}>
          <ModalContent>
            {(onClose) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader className="flex flex-row gap-1">
                  <span><Logo /></span>
                  <p className="font-bold text-inherit mt-1">NetQuest</p>
                </ModalHeader>
                <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
                <ModalBody>
                  {error && <span className="text-red-500">{error}</span>}
                </ModalBody>
                <ModalBody>
                  <Input
                    type="email"
                    label="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </ModalBody>
                <ModalBody>
                  <Input
                    type={isVisible ? "text" : "password"}
                    label="Password"
                    required
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
                  />
                  <Link href="#" size="sm">Forgot Password?</Link>
                </ModalBody>
                <ModalBody>
                  <Link href="/user/signup" size="sm">Don't have an account? Signup.</Link>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </ModalFooter>
              </form>
            )}
          </ModalContent>
        </Modal>
      </div>
      <FooterContent/>
    </>
  );
}
