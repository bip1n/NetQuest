"use client";
import React, { useState } from "react";
import {
  Button,
  Link,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/Icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";

interface SigninProps {
  onLogin: () => void;
}

export default function Signin({ onLogin }: SigninProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign-in form submitted:", { email, password });

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error);
      } else {
        const responseData = await response.json();
        console.log("Sign-in successful:", responseData);

        // Set cookies with high security
        Cookies.set('__securedAccess', responseData.access_token, { 
          expires: 7, // token expiry in days
          secure: true,
          sameSite: 'strict',
          path: '/',
        });
        Cookies.set('__securedRefresh', responseData.refresh_token, { 
          expires: 30, // refresh token expiry in days
          secure: true,
          sameSite: 'strict',
          path: '/',
        });

        // Handle successful sign-in (e.g., redirect to another page)
        handleClose();
        onLogin(); // Notify parent component about the login
        //get page url
        const url = window.location.pathname;
        router.push(url);

       // reload page
        window.location.reload();
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
        <Button color="default" size="sm" variant="ghost" onClick={handleOpen}>SignIn</Button>
        <Modal placement="center" backdrop={"blur"} isOpen={isOpen} onOpenChange={setIsOpen}>
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <ModalHeader className="flex flex-row gap-1">
                <span><Logo /></span>
                <p className="font-bold text-inherit mt-1">NetQuest</p>
              </ModalHeader>
              <ModalHeader className="flex justify-between items-center">
                <p className="font-bold text-inherit mt-1">SignIn</p>
                <Link isExternal showAnchorIcon href="/venue/signin">
                    Sign is as a Venue Owner
                </Link>
              </ModalHeader>
              
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
                <Button color="danger" variant="light" onClick={handleClose}>
                  Cancel
                </Button>
                <Button color="primary" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}
