import { Suspense } from "react";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
          <div className="card w-full max-w-lg bg-base-100 shadow-2xl border border-base-300">
            <div className="card-body p-8">
              <div className="text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-base-content/70">
                  Loading signup...
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;