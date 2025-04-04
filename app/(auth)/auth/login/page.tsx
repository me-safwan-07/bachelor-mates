import { Metadata } from "next";
import { FormWrapper } from "../components/FormWrapper"
import { SigninForm } from "./components/SigninForm";

export const metadata: Metadata ={
  title: "Login",
  description: "Bachloremates login page"
}

const Page = async () => {
  return (
    <div className="grid min-h-screen w-full bg-gradient-to-tr from-slate-100 to-slate-50">
      <div className="flex flex-col item-center justify-center">
        <FormWrapper>
          <SigninForm />
        </FormWrapper>
      </div>
    </div>
  )
}

export default Page;