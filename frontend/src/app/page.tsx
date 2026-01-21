import Link from "next/link";
import AuthButton from "@/components/Auth/AuthButton";
import { MessageCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* 穏やかな稲妻フラッシュ */}
      <div className="subtle-lightning absolute inset-0 z-40 pointer-events-none" />

      {/* 裏側の世界エフェクト */}
      <div className="upside-down-red absolute inset-0">
        {/* 赤黒グラデーション背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/30 to-black" />

        {/* グリッド */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220, 38, 38, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220, 38, 38, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* 赤いスキャンライン */}
        <div className="red-scanline absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-red-600/60 to-transparent blur-sm" />
        </div>
      </div>

      {/* 微かなノイズオーバーレイ */}
      <div
        className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* メインコンテンツ */}
      <div className="subtle-shake w-full max-w-md p-8 relative z-10">
        {/* アイコン */}
        <div className="flex justify-center mb-8 slow-float">
          <div className="relative">
            {/* 赤いグロー */}
            <div className="absolute inset-0 blur-3xl bg-red-600/40 rounded-full" />
            <MessageCircle
              className="w-16 h-16 relative z-10 gentle-flicker"
              style={{
                color: "#dc2626",
                filter: "drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))",
              }}
            />
          </div>
        </div>

        {/* タイトル */}
        <h1
          className="text-5xl font-bold text-center mb-3 red-neon-pulse tracking-widest"
          style={{
            fontFamily: "monospace",
            color: "#fff",
            letterSpacing: "0.3em",
          }}
        >
          CHAT APP
        </h1>

        <p
          className="text-center mb-12 text-base tracking-wider gentle-flicker"
          style={{
            fontFamily: "monospace",
            color: "#dc2626",
            textShadow: "0 0 10px rgba(220, 38, 38, 0.8)",
          }}
        >
          ━━━ ENTER THE UPSIDE DOWN ━━━
        </p>

        {/* 認証カード */}
        <div
          className="relative red-glow rounded-lg overflow-hidden backdrop-blur-md"
          style={{
            background:
              "linear-gradient(135deg, rgba(20, 5, 5, 0.95), rgba(40, 10, 10, 0.9))",
            border: "1px solid rgba(220, 38, 38, 0.4)",
          }}
        >
          <div className="relative p-8">
            <AuthButton />
          </div>
        </div>

        {/* フッターリンク */}
        <div className="text-center mt-8">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-all duration-300 group"
            style={{
              fontFamily: "monospace",
              textShadow: "0 0 10px rgba(220, 38, 38, 0.6)",
            }}
          >
            <span className="border-b border-red-600 group-hover:border-red-400">
              ENTER CHAT ROOMS
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 角の装飾 */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-red-600/40" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-red-600/40" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-red-600/40" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-red-600/40" />
      </div>

      {/* 背景のパーティクル*/}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full particle-fade"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: "#dc2626",
            animationDelay: `${Math.random() * 3}s`,
            filter: "blur(0.5px)",
            boxShadow: "0 0 4px rgba(220, 38, 38, 0.8)",
          }}
        />
      ))}
    </main>
  );
}
