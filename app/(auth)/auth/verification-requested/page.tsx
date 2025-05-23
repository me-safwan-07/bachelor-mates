'use client';

import { z } from "zod";
import { FormWrapper } from "../components/FormWrapper";
import { RequestVerificationEmail } from "./components/RequestVerificationEmail";
import { useSearchParams } from "next/navigation";

const VerificationPageSchema = z.string().email();

const Page = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    try {
        const parsedEmail = VerificationPageSchema.parse(email).toLowerCase();

        return (
            <FormWrapper>
                <>
                    <h1 className="leading-2 mb-4 text-center text-lg font-semibold text-slate-900">
                        Please confirm your email address
                    </h1>
                    <p className="text-center text-sm text-slate-700">
                        We sent an email to <span className="font-semibold italic">{parsedEmail}</span>. Please click the 
                        link in the email to activate your account.
                    </p>
                    <hr className="my-4" />
                    <p className="text-center text-xs text-slate-500">
                        You didn&apos;t receive an email or your link expired?
                    </p>
                    <div className="mt-5">
                        <RequestVerificationEmail email={parsedEmail} />
                    </div>
                </>
            </FormWrapper>
        )
    } catch (error: unknown) {
        console.error('Email validation error:', error);
        return (
            <FormWrapper>
                <p className="text-center">Invalid email address</p>
            </FormWrapper>
        );
    }
};
export default Page;
