import { InstagramLogo } from "@/components/instagram-logo"
import { FacebookIcon } from "@/components/facebook-icon"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-[350px] flex flex-col gap-3">
        {/* Main Login Card */}
        <div className="border border-[#262626] bg-black px-10 py-10 flex flex-col items-center">
          {/* Instagram Logo */}
          <div className="mb-10">
            <img src="/Adobe Express - file.png" alt="Instagram Logo" className="h-14 mx-auto" />
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* OR Divider */}
          <div className="w-full flex items-center gap-4 my-5">
            <div className="flex-1 h-px bg-[#262626]" />
            <span className="text-[#737373] text-[13px] font-semibold">OR</span>
            <div className="flex-1 h-px bg-[#262626]" />
          </div>

          {/* Facebook Login */}
          <button
            type="button"
            className="flex items-center gap-2 text-[#0095f6] hover:text-[#0095f6]/80 font-semibold text-sm"
          >
            <FacebookIcon className="text-[#0095f6]" />
            Log in with Facebook
          </button>

          {/* Forgot Password */}
          <a href="#" className="text-[#a8a8a8] text-xs mt-4 hover:text-white">
            Forgot password?
          </a>
        </div>

        {/* Sign Up Box */}
        <div className="border border-[#262626] bg-black px-10 py-6 text-center">
          <p className="text-sm text-white">
            {"Don't have an account? "}
            <a href="#" className="text-[#0095f6] font-semibold hover:text-[#0095f6]/80">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-[920px] mt-12 flex flex-col items-center gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#737373]">
          <a href="#" className="hover:text-white">
            Meta
          </a>
          <a href="#" className="hover:text-white">
            About
          </a>
          <a href="#" className="hover:text-white">
            Blog
          </a>
          <a href="#" className="hover:text-white">
            Jobs
          </a>
          <a href="#" className="hover:text-white">
            Help
          </a>
          <a href="#" className="hover:text-white">
            API
          </a>
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Locations
          </a>
          <a href="#" className="hover:text-white">
            Instagram Lite
          </a>
          <a href="#" className="hover:text-white">
            Meta AI
          </a>
          <a href="#" className="hover:text-white">
            Threads
          </a>
          <a href="#" className="hover:text-white">
            Contact Uploading & Non-Users
          </a>
          <a href="#" className="hover:text-white">
            Meta Verified
          </a>
        </nav>

        <div className="flex items-center gap-4 text-xs text-[#737373]">
          <button className="hover:text-white flex items-center gap-1">
            English
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 5l3 3 3-3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span>© 2025 Instagram from Meta</span>
        </div>
      </footer>
    </main>
  )
}
