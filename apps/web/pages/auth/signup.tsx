import { XCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import getConfig from "next/config";
import { useState } from "react";
import BaseLayoutUnauthorized from "../../components/layout/BaseLayoutUnauthorized";
import { createUser } from "../../lib/users";

const { publicRuntimeConfig } = getConfig();

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const { emailVerificationDisabled, privacyUrl, termsUrl } = publicRuntimeConfig;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(
        e.target.elements.firstname.value,
        e.target.elements.lastname.value,
        e.target.elements.email.value,
        e.target.elements.password.value
      );

      const url = emailVerificationDisabled
        ? `/auth/signup-without-verification-success`
        : `/auth/verification-requested?email=${encodeURIComponent(e.target.elements.email.value)}`;

      router.push(url);
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <BaseLayoutUnauthorized title="Sign up">
      <div className="bg-ui-gray-light flex min-h-screen">
        <div className="mx-auto flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
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

          <div className="shadow-cont mx-auto w-full max-w-sm rounded-xl bg-white p-8 lg:w-96">
            <div>
              <Image src="/img/snoopforms-logo.svg" alt="snoopForms logo" width={500} height={89} />
            </div>

            <div className="mt-4">
              <p className="text-center text-sm text-gray-600">Finally solid open-source forms 🤸</p>
              <div className="mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="firstname" className="text-ui-gray-dark block text-sm font-medium">
                      First name
                    </label>
                    <div className="mt-1">
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="given-name"
                        required
                        className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastname" className="text-ui-gray-dark block text-sm font-medium">
                      Last name
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="family-name"
                        required
                        className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-ui-gray-dark block text-sm font-medium">
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="text-ui-gray-dark block text-sm font-medium">
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="placeholder-ui-gray-medium border-ui-gray-medium ph-no-capture block w-full appearance-none rounded-md border px-3 py-2 shadow-sm focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="bg-red flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                      Sign up
                    </button>

                    <div className="mt-3 text-center text-xs text-gray-600">
                      Already have an account?{" "}
                      <Link href="/auth/signin">
                        <a className="text-red hover:text-red-600">Log in.</a>
                      </Link>
                    </div>
                    {(termsUrl || privacyUrl) && (
                      <div className="mt-3 text-center text-xs text-gray-400">
                        By clicking &quot;Sign Up&quot;, you agree to our
                        <br />
                        {termsUrl && (
                          <a
                            className="text-red hover:text-red-600"
                            href={termsUrl}
                            rel="noreferrer"
                            target="_blank">
                            terms of service
                          </a>
                        )}
                        {termsUrl && privacyUrl && <span> and </span>}
                        {privacyUrl && (
                          <a
                            className="text-red hover:text-red-600"
                            href={privacyUrl}
                            rel="noreferrer"
                            target="_blank">
                            privacy policy
                          </a>
                        )}
                        .<br />
                        We&apos;ll occasionally send you account related emails.
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayoutUnauthorized>
  );
}
