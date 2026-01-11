"use client";

import { signIn, signOut, useSession } from "@/lib/auth-client";

export default function AuthButton() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <p>読み込み中...</p>;
  }

  if (session) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <p>ログイン中: {session.user?.email}</p>
        <button onClick={async () => await signOut()}>ログアウト</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p>ログインしていません</p>
      <button
        onClick={async () =>
          await signIn.social({
            provider: "github",
            callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
          })
        }
      >
        GitHubでログイン
      </button>
      <button
        onClick={async () =>
          await signIn.social({
            provider: "google",
            callbackURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
          })
        }
      >
        Googleでログイン
      </button>
    </div>
  );
}
