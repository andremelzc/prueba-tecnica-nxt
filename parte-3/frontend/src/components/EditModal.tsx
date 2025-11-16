import React, { useState } from "react";

interface Expediente {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

// Define las props que recibirá el modal
interface EditModalProps {
  expediente: Expediente;
  onClose: () => void;
  // Recibe la función 'handleUpdate' del hook
  onSave: (id: string, data: Partial<Expediente>) => Promise<void>;
}

export default function EditModal({
  expediente,
  onClose,
  onSave,
}: EditModalProps) {
  // Estados *internos* para el formulario del modal
  const [nombre, setNombre] = useState(expediente.nombre);
  const [descripcion, setDescripcion] = useState(expediente.descripcion);
  const [estado, setEstado] = useState(
    expediente.estado as "activo" | "cerrado" | "pendiente"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Llama a la función 'onSave' (que es 'handleUpdate' del hook)
      await onSave(expediente.id, { nombre, descripcion, estado });
      onClose(); // Cierra el modal si tiene éxito
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Fondo oscuro (overlay)
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      {/* Contenedor del Modal */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Editar Expediente</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Formulario (igual al de "Crear") */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción:
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estado:
            </label>
            <select
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button" // Importante
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition disabled:bg-gray-400"
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
