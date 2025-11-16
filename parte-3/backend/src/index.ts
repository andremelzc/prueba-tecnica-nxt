import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

interface Expediente {
  id: string;
  nombre: string;
  descripcion: string;
  estado: string;
}

const db: Expediente[] = [
  {
    id: "1",
    nombre: "Expediente 1",
    descripcion: "Descripcion del expediente 1",
    estado: "activo",
  },
  {
    id: "2",
    nombre: "Expediente 2",
    descripcion: "Descripcion del expediente 2",
    estado: "cerrado",
  },
  {
    id: "3",
    nombre: "Expediente 3",
    descripcion: "Descripcion del expediente 3",
    estado: "pendiente",
  },
];

// Configuración del servidor Express
const app = express();
const PORT = 5000;
const ORIGIN = "http://localhost:3000";
const JWT_SECRET = "secreto_seguro_andre_123";

// Middleware para verificar el token JWT
const autenticarToken = (req: Request, res: Response, next: NextFunction) => {
  // Buscamos el token en el header 'Authorization'
  const authHeader = req.headers["authorization"];

  // El header es "Bearer TOKEN_LARGO..."
  const token = authHeader && authHeader.split(" ")[1];

  // Si no hay token, devolvemos error 401 (No autorizado)
  if (token == null) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }

  // Si hay token, intentamos verificarlo
  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      // Si el token no es válido o expiró
      return res.status(403).json({ error: "Token inválido" });
    }

    // Si el token es válido, guardamos la info del usuario en la request
    next();
  });
};

// Para que Express pueda entender JSON
app.use(express.json());

// Para permitir llamadas desde el frontend (ORIGIN)
app.use(cors({ origin: ORIGIN }));

// 1. Endpoint de prueba: Hola, mundo
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// 2. Endpoint GET para leer todos los expedientes
app.get("/expedientes", autenticarToken, (req, res) => {
  res.json(db);
});

// 3. Endpoint POST para crear un nuevo expediente
app.post("/expedientes", autenticarToken, (req, res) => {
  const { nombre, descripcion, estado } = req.body;

  // Validar que se envíen todos los datos obligatorios, sino devolver un error 400
  if (!nombre || !descripcion || !estado) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  // Crear el nuevo expediento usando el interface
  const nuevoExpediente: Expediente = {
    id: (db.length + 1).toString(),
    nombre,
    descripcion,
    estado,
  };
  db.push(nuevoExpediente);
  res.status(201).json(nuevoExpediente);
});

// 4. Endpoint PUT para actualizar un expediente por id
app.put("/expedientes/:id", autenticarToken, (req, res) => {
  // Obtener el id de los parámetros y los datos del body
  const { id } = req.params;
  const { nombre, descripcion, estado } = req.body;

  // Buscamos el expediente por id
  const expediente = db.find((exp) => exp.id === id);

  // Si no existe, devolvemos un error 404
  if (!expediente) {
    return res.status(404).json({ error: "Expediente no encontrado" });
  }

  // Actualizamos los datos del expediente
  expediente.nombre = nombre ?? expediente.nombre;
  expediente.descripcion = descripcion ?? expediente.descripcion;
  expediente.estado = estado ?? expediente.estado;

  res.json(expediente);
});

// 5. Endpoint DELETE para eliminar un expediente por id
app.delete("/expedientes/:id", autenticarToken, (req, res) => {
  const { id } = req.params;
  const index = db.findIndex((expediente) => expediente.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Expediente no encontrado" });
  }

  const eliminado = db.splice(index, 1);
  res.json(eliminado[0]);
});

// 6. Endpoint POST para login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    // Creamos el payload del token
    const payload = {
      sub: username,
      role: "admin",
    };

    // Creamos el token (JWT)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Devolvemos el token al cliente
    return res.json({ token });
  }
  res.status(401).json({ error: "Credenciales inválidas" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
