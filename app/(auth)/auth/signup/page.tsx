import { FormWrapper } from "@/app/(auth)/auth/components/FormWrapper";
import { SignupForm } from "@/app/(auth)/auth/signup/components/SignupForm";
import { PRIVACY_URL, TERMS_URL, WEBAPP_URL } from "@/lib/constants";

const Page = async () => {
  return (
    <div className="grid min-h-screen w-full bg-gradient-to-tr from-slate-100 to-slate-50">
      <div className="flex flex-col items-center justify-center">
        <FormWrapper>
          <SignupForm
            webAppUrl={WEBAPP_URL}
            termsUrl={TERMS_URL}
            privacyUrl={PRIVACY_URL}
          />
        </FormWrapper>
      </div>
    </div>
  );
};

export default Page;
