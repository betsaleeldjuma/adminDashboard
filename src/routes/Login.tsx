import { useState } from "react";
import { useNavigate } from "react-router";
import { MdLogin, MdEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import IconInput from "../components/IconInput";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const loginMutation = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(form, {
      onSuccess: () => {
        navigate("/dashboard");
      },
    });
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="card p-6 max-w-2xl w-[90%] lg:w-[60%] mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6"
        >
          {/* HEADER */}
          <div className="bg-white p-5 rounded-3xl shadow-xl">
            <MdLogin size={48} />
          </div>

          <div className="flex flex-col items-center text-center w-full md:w-[60%]">
            <h1 className="font-bold text-2xl">Sign in</h1>
            <p className="opacity-60">
              Login with your username and password
            </p>
          </div>

          {/* FORM */}
          <div className="w-full md:w-[90%]">
            <IconInput
              icon={<MdEmail size={20} />}
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            <IconInput
              icon={<MdLock size={20} />}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <p className="text-right text-sm opacity-60 cursor-pointer">
              Forgot password?
            </p>
          </div>

          {/* ACTIONS */}
          <div className="w-full flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="
                w-[90%] py-3 rounded-xl
                bg-gradient-to-b from-zinc-800 to-black
                text-white font-medium shadow-lg
                hover:scale-[1.02] transition
                disabled:opacity-50
              "
            >
              {loginMutation.isPending ? "Signing in..." : "Get Started"}
            </button>

            <p className="opacity-60">Or sign in with</p>

            <div className="flex gap-4">
              <button className="bg-white shadow-xl rounded-lg p-4">
                <FcGoogle size={28} />
              </button>
              <button className="bg-white shadow-xl rounded-lg p-4">
                <FaFacebook className="text-blue-700" size={28} />
              </button>
              <button className="bg-white shadow-xl rounded-lg p-4">
                <FaApple size={28} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;