"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

export const GoogleButton = ({
  text = "Continue with Google"
}: {
  text?: string;
}) => {
  const handleLogin = async () => {
    await signIn("google");
  };

  return (
    <Button
      type="button"
      EndIcon={GoogleIcon}
      startIconClassName="ml-3"
      onClick={handleLogin}
      variant="secondary"
      className="w-full justify-center">
      {text}
    </Button>
  );
};
