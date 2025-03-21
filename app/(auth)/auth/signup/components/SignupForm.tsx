"use client";

import { XCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SignupOptions } from "./SignupOptions";

interface SignupFormProps {
  webAppUrl: string;
  privacyUrl: string | undefined;
  termsUrl: string | undefined;
}

export const SignupForm = ({
  privacyUrl,
  termsUrl,
}: SignupFormProps) => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");
  
  return (
    <>
      {error && (
        <div className="absolute top-10 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">An error occurred when signing you up</h3>
              <div className="mt-2 text-sm text-red-700">
                <p className="space-y-1 whitespace-pre-wrap">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="text-center">
        <h1 className="mb-4 text-slate-700">Create your Formbricks account</h1>
        <SignupOptions
          emailFromSearchParams={searchParams?.get("email") || ""}
          setError={setError}
        />
        {(termsUrl || privacyUrl) && (
          <div className="mt-3 text-center text-xs text-slate-500">
            By signing up, you agree to our
            <br />
            {termsUrl && (
              <Link className="font-semibold" href={termsUrl} rel="noreferrer" target="_blank">
                Terms of Service
              </Link>
            )}
            {termsUrl && privacyUrl && <span> and </span>}
            {privacyUrl && (
              <Link className="font-semibold" href={privacyUrl} rel="noreferrer" target="_blank">
                Privacy Policy.
              </Link>
            )}
            <hr className="mx-6 mt-3"></hr>
          </div>
        )}

        <div className="mt-9 text-center text-xs">
          <span className="leading-5 text-slate-500">Have an account?</span>
          <br />
          <Link
            href={"/auth/login"}
            className="font-semibold text-slate-600 underline hover:text-slate-700">
            Log in.
          </Link>
        </div>
      </div>
    </>
  );
};
