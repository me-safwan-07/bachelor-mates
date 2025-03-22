'use client';

import { useSearchParams } from "next/navigation";
import { FormWrapper } from "../components/FormWrapper";
import { SignIn } from "./components/SignIn";

const Page = () => {
    const searchParams = useSearchParams();
    return searchParams && searchParams?.get("token")? (
        <FormWrapper>
            <p className="text-center">Verifying...</p>
            <SignIn token={searchParams.get("token")} />
        </FormWrapper>
    ) : (
        <p className="text-center">No Token procided</p>
    )
}

export default Page;