import { useForm } from "react-hook-form";
export default function AuthForm({ mode = "login", onSubmit, onToggleMode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const isLogin = mode === "login";

  const password = watch("password");

  const onFormSubmit = (data) => {
    onSubmit(data);
  };
  return (
    <form
      noValidate
      className="bg-black/80 w-[30%] rounded-xl px-10 py-10 flex flex-col"
      onSubmit={handleSubmit(onFormSubmit)}
    >
      <div className="mb-8">
        <h1 className="text-white text-[32px] font-bold">
          {isLogin ? "Sign In" : "Sign Up"}
        </h1>
      </div>
      <div className="flex flex-col gap-6 mb-8">
        {!isLogin && (
          <div>
            <input
              {...register("name", {
                required: "Name is required",
              })}
              type="text"
              placeholder="Enter Full Name"
              className={`w-full bg-neutral-800 bg-opacity-60 text-white placeholder-white caret-white px-4 py-3 rounded border ${
                errors.name ? "border-red-500" : "border-gray-500"
              } focus:border-red-700 focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}
        <div>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email",
              },
            })}
            type="email"
            placeholder="Enter Email address"
            className={`w-full bg-neutral-800 bg-opacity-60 text-white placeholder-white caret-white px-4 py-3 rounded border ${
              errors.email ? "border-red-500" : "border-gray-500"
            } focus:border-red-700 focus:outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            type="password"
            placeholder="Enter Password"
            className={`w-full bg-neutral-800 bg-opacity-70 text-white placeholder-white caret-white px-4 py-3 rounded border ${
              errors.password ? "border-red-500" : "border-gray-500"
            } focus:outline-none focus:border-white`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        {!isLogin && (
          <div>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords don't match",
              })}
              type="password"
              placeholder="Confirm Password"
              className={`w-full bg-neutral-800 bg-opacity-70 text-white placeholder-white caret-white px-4 py-3 rounded border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-500"
              } focus:outline-none focus:border-white`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 ">
        <button
          type="submit"
          className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded focus:outline-none"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-white text-sm text-center">
          {isLogin ? "New to NetflixGpt?" : "Already have an account?"}{" "}
          <span
            className="underline cursor-pointer hover:text-red-500"
            onClick={onToggleMode}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </form>
  );
}
