"use client";
import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";

interface Expediente {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

export const useExpediente = () => {
  const router = useRouter();
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el formulario de crear
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("activo");
  const [crearError, setCrearError] = useState<string | null>(null);
  const [crearLoading, setCrearLoading] = useState<boolean>(false);
  const [eliminarLoading, setEliminarLoading] = useState<boolean>(false);
  const [eliminarError, setEliminarError] = useState<string | null>(null);
  const [editarLoading, setEditarLoading] = useState<boolean>(false);
  const [editarError, setEditarError] = useState<string | null>(null);

  // READ: Obtener la lista de expedientes
  useEffect(() => {
    const fetchExpedientes = async () => {
      // Obtenemos el token de las cookies
      const token = Cookie.get("token");

      try {
        // Hacemos la llamada a la API
        const response = await fetch("http://localhost:5000/expedientes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error al obtener los expedientes");
        }

        // Guardamos los expedientes
        setExpedientes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Error desconocido");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchExpedientes();
  }, []);

  // CREATE: Función para crear un nuevo expediente
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCrearError(null);
    setCrearLoading(true);

    // Validamos los campos del formulario
    if (!nombre || !descripcion || !estado) {
      setCrearError("Todos los campos son obligatorios");
      return;
    }

    // Obtenemos el token de las cookies
    const token = Cookie.get("token");

    try {
      // Hacemos la llamada a la API para crear el expediente
      const response = await fetch("http://localhost:5000/expedientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, descripcion, estado }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al crear el expediente");
      }

      // Añadimos el nuevo expediente a la lista
      setExpedientes((prev) => [...prev, data]);

      // Limpiamos el formulario
      setNombre("");
      setDescripcion("");
      setEstado("activo");
    } catch (err) {
      if (err instanceof Error) {
        setCrearError(err.message);
      } else {
        setCrearError("Error desconocido");
      }
    } finally {
      setCrearLoading(false);
    }
  };

  // DELETE: Función para eliminar un expediente
  const handleDelete = async (id: string) => {
    setEliminarError(null);
    setEliminarLoading(true);

    // Pedir confirmación
    if (
      !window.confirm("¿Estás seguro de que quieres eliminar este expediente?")
    ) {
      setEliminarLoading(false);
      return;
    }

    // Obtenemos el token de las cookies
    const token = Cookie.get("token");

    try {
      const response = await fetch(`http://localhost:5000/expedientes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al eliminar el expediente");
      }

      setExpedientes((prev) =>
        prev.filter((expediente) => expediente.id !== id)
      );
    } catch (err) {
      if (err instanceof Error) {
        setEliminarError(err.message);
      } else {
        setEliminarError("Error desconocido");
        throw err;
      }
    } finally {
      setEliminarLoading(false);
    }
  };

  // UPDATE: Función para editar un expediente
  const handleUpdate = async (id: string, data: Partial<Expediente>) => {
    setEditarLoading(true);
    setEditarError(null);

    // Obtenemos el token de las cookies
    const token = Cookie.get("token");

    try {
      // Hacemos la llamada a la API para actualizar el expediente
      const response = await fetch(`http://localhost:5000/expedientes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const updatedExpediente = await response.json();
      if (!response.ok) {
        throw new Error(
          updatedExpediente.error || "Error al actualizar el expediente"
        );
      }

      setExpedientes((prev) =>
        prev.map((expediente) =>
          expediente.id === id ? updatedExpediente : expediente
        )
      );
    } catch (err) {
      if (err instanceof Error) {
        setEditarError(err.message);
      } else {
        setEditarError("Error desconocido");
      }
    } finally {
      setEditarLoading(false);
    }
  };

  return {
    // Estados de datos
    expedientes,
    loading,
    error,
    // Estados y setters de "Crear"
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    estado,
    setEstado,
    crearError,
    crearLoading,
    handleCreate,
    // Estados y setters de "Eliminar"
    eliminarError,
    eliminarLoading,
    handleDelete,
    // Estados y setters de "Editar"
    editarError,
    editarLoading,
    handleUpdate,
  };
};
