'use client';

import { IsPasswordValid } from "@/app/(auth)/auth/signup/components/isPasswordValid";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { resetPassword } from "@/lib/utils/users";
import { XCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


export const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [password, setPassword] = useState<string | null>(null);
    const [confirmedPassword, setConfirmedPassword] = useState<string | null>(null);
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (password !== confirmedPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        const token = searchParams?.get("token");
        try {
            if (!token) throw new Error("No token provided");
            await resetPassword(token, e.target.elements.password.value);

            router.push("/auth/forgot-password/reset/success");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && (
                <div className="absolute top-10 rounded-md bg-red-50 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">An error occurred when logging you in</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <p className="space-y-1 whitespace-pre-wrap">{error}</p>
                    </div>
                    </div>
                </div>
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-800">
                            New password
                        </label>
                        <PasswordInput 
                            id="password"
                            name="password"
                            value={password ?? ""}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="*******"
                            required
                            className="focus:border-brand focus:ring-brand mt-2 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-800">
                            Confirm password
                        </label>
                        <PasswordInput 
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmedPassword ?? ""}
                            onChange={(e) => setConfirmedPassword(e.target.value)}
                            autoComplete="current-password"
                            placeholder="*******"
                            required
                            className="focus:border-brand focus:ring-brand mt-2 block w-full rounded-md border-slate-300 shadow-sm sm:text-sm"
                        />
                    </div>

                    <IsPasswordValid password={password} setIsValid={setIsValid} />
                </div>

                <div>
                    <Button
                        type="submit"
                        variant="darkCTA"
                        disabled={!isValid}
                        className="w-full justify-center"
                        loading={loading}
                    >
                        Reset password
                    </Button>
                </div>
            </form>
        </>
    );
};