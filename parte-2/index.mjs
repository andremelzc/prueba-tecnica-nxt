import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto"; // Para IDs únicos

// Configura el cliente de DynamoDB
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

// Nombre de la tabla DynamoDB en AWS
const tableName = "tec-practicantes-todo"; 

export const handler = async (event) => {
  // El API Gateway nos dice qué método se usó 
  const method = event.httpMethod;

  try {
    if (method === "GET") {
      // Lógica GET: Leer toda la tabla 
      const command = new ScanCommand({ TableName: tableName });
      const response = await docClient.send(command);
      
      return {
        statusCode: 200, // Operación exitosa
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response.Items), 
      };
    }

    if (method === "POST") {
      // Lógica POST: Crear una nueva tarea
      const body = JSON.parse(event.body);

      // 1. Validar el 'titulo' 
      if (!body.titulo || typeof body.titulo !== 'string') {
        return {
          statusCode: 400, // Error de validación
          body: JSON.stringify({ error: "El campo 'titulo' es obligatorio y debe ser un string" }),
        };
      }

      // 2. Crear el nuevo objeto 
      const newItem = {
        id: randomUUID(), // Genera ID único 
        titulo: body.titulo,
        completada: false, // Valor por defecto 
      };

      // 3. Guardar en DynamoDB
      const command = new PutCommand({
        TableName: tableName,
        Item: newItem,
      });
      await docClient.send(command);

      return {
        statusCode: 201, // Creado exitosamente
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      };
    }

    // Si es otro método (PUT, DELETE, etc.)
    return {
      statusCode: 405, // Método no permitido
      body: JSON.stringify({ error: "Método no permitido" }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};