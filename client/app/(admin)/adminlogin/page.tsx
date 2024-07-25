"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Input,
} from "@nextui-org/react";
import Cookies from "js-cookie"; // Import js-cookie library
import { Logo } from "@/components/Icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/Footer";

export default function RegisterVenue() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//   const [venueID, setVenueID] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(""); // Clear any existing errors

    try {
      const response = await fetch("http://localhost:4000/api/login-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password}),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        setError(errorResponse.error || "Failed to login. Please try again.");
      } else {
        // Handle successful login
        const responseData = await response.json();

        // Set cookies with high security
        Cookies.set("__securedAccess", responseData.access_token, {
          expires: 7, // token expiry in days
          secure: true,
          sameSite: "strict",
          path: "/",
        });
        Cookies.set("__securedRefresh", responseData.refresh_token, {
          expires: 30, // refresh token expiry in days
          secure: true,
          sameSite: "strict",
          path: "/",
        });

        // Redirect to the dashboard or home page after successful login
        router.push(`/admin`); // Replace with your desired route
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
        <form onSubmit={handleSubmit}>
        <Card className="w-full min-w-[400px] md:min-w-[500px] max-w-[500px]">
          <CardHeader className="flex gap-3">
            <Link color="foreground" href="/">
              <span>
                <Logo />
              </span>
              <p className="font-bold text-inherit mt-1">NetQuest - Admin</p>
            </Link>
          </CardHeader>
          <CardHeader className="flex justify-between items-center">
            <p className="font-bold text-inherit mt-1">Login as Admin</p>
          </CardHeader>

          <CardBody>
            <Input
              fullWidth
              type="email"
              label="Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardBody>

          <CardBody>
            <Input
              type={isVisible ? "text" : "password"}
              label="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
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
            />
          </CardBody>

          <CardBody>
            <Input
              fullWidth
              type="text"
              label="Key"
            //   value={venueID}
            //   required
            //   onChange={(e) => setVenueID(e.target.value)}
            />
          </CardBody>

          {error && (
            <CardBody>
              <p className="text-red-500">{error}</p>
            </CardBody>
          )}

          <CardFooter className="flex justify-center">
            <Button
              color="primary"
              radius="lg"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>

          <Divider />
        </Card>
      </form>
        </div>
      </section>
      
      <FooterContent />
    </>
  );
}
