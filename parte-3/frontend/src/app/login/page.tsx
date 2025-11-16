"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Lógica de envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error("Error en el inicio de sesión");
      }

      // Procesar la respuesta
      // Guardamos el token en las cookies
      Cookie.set("token", data.token, { expires: 1 / 24 });

      // Redirgimos a la lista de expedientes
      router.push("/expedientes");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error desconocido");
      }
    }

    fetch("http://localhost:5000/login");
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Usuario:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm "
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}
