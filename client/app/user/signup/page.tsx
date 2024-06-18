"use client";
import React, { use, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Link,
  Input,
} from "@nextui-org/react";
import { Logo } from "@/components/Icons";
import { EyeFilledIcon } from "@/components/Assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/Assets/EyeSlashFilledIcon";
import { FooterContent } from "@/components/Footer";
import { useRouter } from "next/navigation";


export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termsAgreed) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("password", password);

    setLoading(true);
    console.log("Submitting form, please wait...");

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        body: formData,

        // without using FormData
        // body: JSON.stringify({username: username, phone: phone, email: email, password: password}),
        // headers: {
        //  'Content-Type': 'application/json'
        // }

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
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to register. Please try again.");
    } finally {
      setLoading(false);
      console.log("Form submission complete.");
    }
  };

  return (
    <>
     <div className="flex items-center justify-center mt-8">
      <form onSubmit={handleSubmit}>
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
            <p className="font-bold text-inherit mt-1">SignUp</p>
            <Link isExternal showAnchorIcon href="/venue/register">
              Register as a venue owner.
            </Link>
          </CardHeader>

          <CardBody>
            {error && <span className="text-red-500">{error}</span>}
          </CardBody>

          <CardBody className="flex gap-4">
            <div className="flex flex-1 gap-4">
              <Input
                fullWidth
                type="text"
                label="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                fullWidth
                type="number"
                placeholder="98XXXXXXXX"
                label="Phone Number"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </CardBody>

          <CardBody>
            <Input
              fullWidth
              type="email"
              label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </CardBody>
          <CardBody>
            <Input
              required
              type={isVisible ? "text" : "password"}
              label="Password"
              value={password}
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
            ></Input>
          </CardBody>
          <CardBody>
            <Input
              required
              type={isVisible ? "text" : "password"}
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <Checkbox
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
            >
              I agree to the terms and conditions.
            </Checkbox>
          </CardBody>

          <CardFooter className="flex justify-center">
            <Button
              color="primary"
              radius="lg"
              className="w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Sign Up"}
            </Button>
          </CardFooter>

          <Divider />
          <CardFooter>
            <Link href="/user/signin">Already have an account? Sign In.</Link>
          </CardFooter>
        </Card>
      </form>
      </div>
      <FooterContent />
    
    </>
  );
}
