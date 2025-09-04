"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  console.log(session);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    
    authClient.signUp.email(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          window.alert("Sign up successful!");
        },
        onError: (error) => {
          window.alert("Sign up failed: " + error.error.message);
        },
      }
    );
  };

  if (session) {
    return (
      <div>
        <h1>Welcome {session.user.name}</h1>
        <Button onClick={() => authClient.signOut()}>Sign out</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {/* // create a basic form to get the name, email and passsword  */}
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup} variant="destructive">
          Sign up
        </Button>
      </form>
    </div>
  );
}
