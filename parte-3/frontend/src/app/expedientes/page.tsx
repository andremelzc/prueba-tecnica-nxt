"use client";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useExpediente } from "@/hooks/useExpediente";
import EditModal from "@/components/EditModal";

interface Expediente {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export default function ExpedientesPage() {
  const router = useRouter();

  // Hacemos uso del hook
  const {
    expedientes,
    loading,
    error,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    estado,
    setEstado,
    crearError,
    crearLoading,
    handleCreate,
    eliminarError,
    eliminarLoading,
    handleDelete,
    editarError,
    editarLoading,
    handleUpdate,
  } = useExpediente();

  // Estado para el manejo del modal de expediente
  const [editingExpediente, setEditingExpediente] = useState<Expediente | null>(
    null
  );

  // Lógica para cerrar sesión
  const handleLogout = () => {
    // Eliminar la cookie del token
    Cookie.remove("token");

    // Redirigir al login
    router.push("/login");
  };

  if (loading) {
    return <div>Cargando expedientes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-20">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestión de Expedientes</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-red-700 transition"
        >
          Cerrar Sesión
        </button>
      </div>

      <hr className="my-8 border-gray-300" />

      <div className="mt-4 p-4 border border-gray-300 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Crear Expediente</h2>
        <form onSubmit={handleCreate} className="space-y-4 mb-8">
          <div>
            <label className="block">Nombre:</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              id="descripcion"
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label>Estado:</label>
            <select
              id="newEstado"
              value={estado}
              onChange={(e) =>
                setEstado(e.target.value as "activo" | "cerrado" | "pendiente")
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="activo">Activo</option>
              <option value="pendiente">Pendiente</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          {/* Mensaje de error para el formuulario */}
          {crearError && <p className="text-red-500 text-sm">{crearError}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
            disabled={crearLoading}
          >
            {crearLoading ? "Creando..." : "Crear Expediente"}
          </button>
        </form>
      </div>

      <hr className="my-8 border-gray-300" />

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-4">Expedientes Actuales</h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Encabezado */}
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Descripción
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Estado
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>

            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {expedientes.map((expediente) => (
                <tr key={expediente.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {expediente.nombre}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {expediente.descripcion}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        expediente.estado === "activo"
                          ? "bg-green-100 text-green-800"
                          : expediente.estado === "cerrado"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {expediente.estado}
                    </span>
                  </td>

                  {/* Acciones */}
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-8">
                    <button
                      onClick={() => setEditingExpediente(expediente)}
                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      {editarLoading && !eliminarLoading
                        ? "Guardando..."
                        : "Editar"}
                    </button>
                    <button
                      onClick={() => handleDelete(expediente.id)}
                      className="text-red-600 hover:text-red-900 cursor-pointer"
                    >
                      {eliminarLoading && !editarLoading
                        ? "Eliminando..."
                        : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {editingExpediente && (
        <EditModal
          expediente={editingExpediente}
          onClose={() => setEditingExpediente(null)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}
