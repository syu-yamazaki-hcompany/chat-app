import Link from "next/link";
import AuthButton from "@/components/Auth/AuthButton";

export default function Home() {
  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Chat App</h1>
      <p style={{ marginBottom: "20px" }}>
        チャットを始めるにはログインしてください。
      </p>

      {/* ログインボタンコンポーネント */}
      <div style={{ display: "inline-block", marginBottom: "30px" }}>
        <AuthButton />
      </div>

      <nav>
        <Link
          href="/rooms/357422c8-e2cf-4a7c-8481-261a0df03bc4"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          → チャットルーム一覧へ
        </Link>
      </nav>
    </main>
  );
}
