import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <h1 className="mb-6 text-6xl font-bold text-center">Welcome 👋</h1>
      <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl p-4">
        <div className="h-52 ">
          <Image
            src="/signin.svg"
            width={100}
            height={100}
            className="w-full h-full"
          />
        </div>
        <div className="p-4">
          <h3 className="text-2xl text-center">Please sign in to continue</h3>
          <button className="flex items-center">
            <FcGoogle /> Google
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
