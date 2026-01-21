"use client";

import { signIn, signOut, useSession } from "@/lib/auth-client";
import { Github, Mail, LogOut, Loader2 } from "lucide-react";

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="text-center py-8">
        <Loader2
          className="w-6 h-6 animate-spin mx-auto text-red-500"
          style={{ filter: "drop-shadow(0 0 10px rgba(220, 38, 38, 0.8))" }}
        />
        <p className="mt-4 text-red-500 font-mono text-sm tracking-wider">
          LOADING...
        </p>
      </div>
    );
  }

  if (session) {
    return (
      <div className="space-y-6">
        <div
          className="p-4 rounded-lg relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(140, 20, 20, 0.15))",
            border: "1px solid rgba(220, 38, 38, 0.3)",
          }}
        >
          <p className="text-xs font-mono text-red-400 mb-1 tracking-wider">
            [ AUTHENTICATED ]
          </p>
          <p className="text-sm font-mono text-red-100 truncate">
            {session.user?.email}
          </p>
        </div>

        <button
          onClick={async () => await signOut()}
          className="w-full py-3 px-6 rounded-lg font-mono font-semibold tracking-wider transition-all duration-300 relative overflow-hidden group"
          style={{
            background:
              "linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(140, 20, 20, 0.2))",
            border: "1px solid rgba(220, 38, 38, 0.4)",
            color: "#dc2626",
            textShadow: "0 0 10px rgba(220, 38, 38, 0.5)",
          }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-800/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center justify-center gap-2">
            <LogOut className="w-4 h-4" />
            LOGOUT
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <p className="font-mono text-xs text-red-400 tracking-widest">
          [ SELECT AUTHENTICATION ]
        </p>
      </div>

      <button
        onClick={async () =>
          await signIn.social({
            provider: "github",
            callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
          })
        }
        className="w-full py-3 px-6 rounded-lg font-mono font-semibold tracking-wider transition-all duration-300 relative overflow-hidden group"
        style={{
          background:
            "linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))",
          border: "1px solid rgba(220, 38, 38, 0.3)",
          color: "#fff",
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-red-900/30 to-red-800/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        <span className="relative flex items-center justify-center gap-2">
          <Github className="w-5 h-5" />
          GITHUB
        </span>
      </button>

      <button
        onClick={async () =>
          await signIn.social({
            provider: "google",
            callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
          })
        }
        className="w-full py-3 px-6 rounded-lg font-mono font-semibold tracking-wider transition-all duration-300 relative overflow-hidden group"
        style={{
          background:
            "linear-gradient(135deg, rgba(220, 38, 38, 0.2), rgba(140, 20, 20, 0.3))",
          border: "1px solid rgba(220, 38, 38, 0.5)",
          color: "#dc2626",
          textShadow: "0 0 10px rgba(220, 38, 38, 0.6)",
        }}
      >
        <span className="absolute inset-0 bg-gradient-to-r from-red-700/30 to-red-600/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        <span className="relative flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" />
          GOOGLE
        </span>
      </button>

      <div className="pt-4 text-center">
        <p className="text-xs font-mono text-gray-600 tracking-wide">
          STRANGER THINGS
        </p>
      </div>
    </div>
  );
}
