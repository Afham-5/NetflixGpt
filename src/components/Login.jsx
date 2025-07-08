import Header from "./Header";

export default function Login() {
  return (
    <>
      <Header />
      <div className="w-full h-screen absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/05e91faa-6f6d-4325-934e-5418dcc2567b/web/IN-en-20250630-TRIFECTA-perspective_159086b1-425f-435b-bcd5-1ed8039cdef9_small.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute w-full h-screen flex justify-center items-center z-50">
        <form className="bg-black/80 w-[30%] rounded-xl px-10 py-8 flex flex-col">
          <div className="mb-8">
            <h1 className="text-white text-[32px] font-bold">Sign In</h1>
          </div>

          <div className="flex flex-col gap-6 mb-8">
            <input
              type="email"
              placeholder="Enter Email address"
              className="w-full bg-neutral-800 bg-opacity-60 text-white placeholder-white caret-white px-4 py-3 rounded border border-gray-500 focus:border-red-700"
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full bg-neutral-800 bg-opacity-70 text-white placeholder-white caret-white px-4 py-3 rounded border border-gray-500  focus:border-red-700"
            />
          </div>

          <div className="flex flex-col gap-4 pb-2">
            <button
              type="submit"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded focus:outline-none"
            >
              Sign In
            </button>
            <p className="text-white text-sm pt-2 text-start">
              New to NetflixGpt?{" "}
              <span className="underline cursor-pointer">Sign Up</span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
