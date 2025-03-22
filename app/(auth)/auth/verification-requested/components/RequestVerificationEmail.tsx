'use client';

import { Button } from '@/components/ui/Button';
import { resendVerificationEmail } from '@/lib/utils/users';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

interface RequestEmailVerificationProps {
    email: string | null;
}

export const RequestVerificationEmail = ({ email }: RequestEmailVerificationProps) => {
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                location.reload();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange)
        };
    }, []);

    const requestVerificationEmail = async () => {
        try {
            if (!email) throw new Error("No email provided");
            await resendVerificationEmail(email);
            toast.success("Verification email successfully sent. Please check your inbox.");
        } catch(e: any) {
            toast.error(`Error: ${e.message}`);
        }
    };

  return (
    <>
        <Button variant="secondary" onClick={requestVerificationEmail} className="w-full justify-center">
            Request a new verification mail
        </Button>
    </>
  )
}

