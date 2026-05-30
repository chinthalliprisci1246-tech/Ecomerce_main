"use client";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

const SignIn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <Image
          src={session.user?.image ?? "/default-avatar.png"}
          alt={session.user?.name ?? "User"}
          width={32}
          height={32}
          className="rounded-full"
        />
        <button
          onClick={() => signOut()}
          className="text-sm font-semibold border border-red-400 text-red-400 px-4 py-1.5 rounded-full hover:bg-red-400 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google", { callbackUrl: "/" })}
      className="text-sm font-semibold border border-green-800 text-green-800 px-4 py-1.5 rounded-full hover:bg-green-800 hover:text-white transition"
    >
      Login
    </button>
  );
};

export default SignIn;