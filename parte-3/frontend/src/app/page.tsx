"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-whitesm:items-start">
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-700 transition"
        >
          Ir a iniciar sesión
        </button>
      </main>
    </div>
  );
}
