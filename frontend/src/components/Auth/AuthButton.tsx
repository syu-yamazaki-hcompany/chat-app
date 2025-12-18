"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div style={{ border: "1px solid #ccc", padding: "10px" }}>
        <p>ログイン中: {session.user?.email}</p>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <p>ログインしていません</p>
      <button onClick={() => signIn("github")}>GitHubでログイン</button>
      <button onClick={() => signIn("google")}>Googleでログイン</button>
    </div>
  );
}
