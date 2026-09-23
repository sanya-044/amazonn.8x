 "use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isCreatingAccount && !name)) {
      alert("Please fill in all required fields.");
      return;
    }
    if (password.length < 6) {
      alert("Passwords must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    // Simulate slight network delay for premium feel
    setTimeout(() => {
      login(isCreatingAccount ? name : email.split("@")[0], email);
      setLoading(false);
      router.push("/");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#eaeded] flex flex-col items-center justify-between py-10 px-4 font-sans select-none">
      {/* Brand Header */}
      <div className="flex flex-col items-center cursor-pointer mb-4" onClick={() => router.push("/")}>
        <span className="text-3xl font-extrabold tracking-tight text-[#111]">
          amazon<span className="text-[#ff9900]">.in</span>
        </span>
      </div>

      {/* Auth Card */}
      <div className="max-w-[380px] w-full bg-white border border-[#d5d9d9] rounded-lg p-7 shadow-sm mb-auto">
        <h1 className="text-3xl font-normal text-[#0f1111] mb-5 tracking-normal">
          {isCreatingAccount ? "Create Account" : "Sign in"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isCreatingAccount && (
            <div>
              <label className="block text-xs font-bold text-[#0f1111] mb-1.5">Your name</label>
              <input
                type="text"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#888c8c] focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/20 rounded-[4px] text-sm text-[#0f1111] outline-none transition-all shadow-inner"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#0f1111] mb-1.5">
              Email or mobile phone number
            </label>
            <input
              type="text"
              placeholder="Enter email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#888c8c] focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/20 rounded-[4px] text-sm text-[#0f1111] outline-none transition-all shadow-inner"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-[#0f1111]">Password</label>
              {!isCreatingAccount && (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-xs text-[#0066c0] hover:text-[#c45500] hover:underline"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              placeholder={isCreatingAccount ? "At least 6 characters" : "Enter password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#888c8c] focus:border-[#e77600] focus:ring-2 focus:ring-[#e77600]/20 rounded-[4px] text-sm text-[#0f1111] outline-none transition-all shadow-inner"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#deb887] active:from-[#deb887] active:to-[#deb887] text-[#0f1111] font-medium py-2 rounded-[4px] border border-[#a88734] text-sm shadow-sm transition-all cursor-pointer mt-2 disabled:opacity-50"
          >
            {loading ? "Processing..." : isCreatingAccount ? "Verify email" : "Sign in"}
          </button>
        </form>

        <p className="text-[11px] text-[#555] mt-4 leading-relaxed">
          By continuing, you agree to Amazon&apos;s{" "}
          <span className="text-[#0066c0] hover:underline cursor-pointer">Conditions of Use</span> and{" "}
          <span className="text-[#0066c0] hover:underline cursor-pointer">Privacy Notice</span>.
        </p>

        {/* Divider / Toggle section */}
        {!isCreatingAccount ? (
          <div className="mt-6">
            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-[#d5d9d9]"></div>
              <span className="flex-shrink mx-3 text-xs text-[#767676]">New to Amazon?</span>
              <div className="flex-grow border-t border-[#d5d9d9]"></div>
            </div>

            <button
              onClick={() => setIsCreatingAccount(true)}
              className="w-full bg-gradient-to-b from-[#f7f8fa] to-[#e7e9ec] hover:from-[#f0f2f5] hover:to-[#d9dcd6] text-[#0f1111] py-2 rounded-[4px] border border-[#adb1b8] text-xs font-medium shadow-xs transition-all cursor-pointer mt-2"
            >
              Create your Amazon account
            </button>
          </div>
        ) : (
          <div className="mt-5 pt-4 border-t border-[#d5d9d9] text-center">
            <button
              onClick={() => setIsCreatingAccount(false)}
              className="text-xs text-[#0066c0] hover:text-[#c45500] hover:underline cursor-pointer"
            >
              Already have an account? Sign in &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-[#d5d9d9] mt-8 py-6 flex flex-col items-center text-xs text-[#555] bg-[#eaeded]">
        <div className="flex space-x-6 mb-2">
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0066c0] hover:underline">Conditions of Use</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0066c0] hover:underline">Privacy Notice</a>
          <a href="#" onClick={(e) => e.preventDefault()} className="text-[#0066c0] hover:underline">Help</a>
        </div>
        <p className="text-[11px] text-[#555]">© 1996-2026, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
}