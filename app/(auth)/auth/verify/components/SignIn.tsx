import { signIn } from "next-auth/react"
import { useEffect } from "react"

interface SignInProps {
    token: string | null;
}

export const SignIn = ({ token }: SignInProps) => {
    useEffect(() => {
        if (token) {
            signIn("token", {
                token: token,
                callbackUrl: '/',
            });
        }

        console.log(token);
    }, [token]);
    
    return <></>;
}