# Prueba Técnica (Parte 2) - API Serverless en AWS

Este proyecto implementa un endpoint REST serverless utilizando **AWS Lambda**, **API Gateway** y **DynamoDB** para gestionar una lista de tareas (to-do items) .

La API soporta dos métodos :
* `POST /`: Crea una nueva tarea.
* `GET /`: Obtiene la lista completa de tareas.

---

## 🚀 Instrucciones para el Despliegue (Usando la Consola de AWS) 

Estos son los pasos manuales para desplegar esta función y sus recursos asociados en AWS.

### 1. Crear la Tabla en DynamoDB 

1.  Ir al servicio **DynamoDB** en la consola de AWS.
2.  Hacer clic en **"Crear tabla"**.
3.  **Nombre de la tabla:** `tec-practicantes-todo`
4.  **Clave de partición:** `id` (Tipo: `String`)
5.  Hacer clic en **"Crear tabla"**.

### 2. Crear la Función Lambda 

1.  Ir al servicio **AWS Lambda**.
2.  Hacer clic en **"Crear función"**.
3.  Seleccionar **"Autor desde cero"**.
4.  **Nombre de la función:** `todoFunction`
5.  **Tiempo de ejecución:** `Node.js 22.x` (o superior) .
6.  **Permisos:** Seleccionar "Crear un nuevo rol con permisos básicos de Lambda".
7.  Hacer clic en **"Crear función"**.

### 3. Asignar Permisos a la Lambda

1.  Dentro de la página de la función, ir a la pestaña **Configuración** > **Permisos**.
2.  Hacer clic en el **Nombre del rol** para abrir la consola de IAM.
3.  En la página del rol, hacer clic en **Añadir permisos** > **Asociar políticas**.
4.  Buscar y añadir la política `AmazonDynamoDBFullAccess`.

### 4. Preparar el Código y Subirlo

1.  Localmente, crear una carpeta, ejecutar `npm init -y` y añadir `"type": "module"` al `package.json`.
2.  Instalar las dependencias necesarias:
    ```bash
    npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
    ```
3.  Colocar el código (`index.mjs`) en esta carpeta.
4.  Crear un archivo `.zip` que contenga la carpeta `node_modules` y el archivo `index.mjs` en su raíz.
5.  En la pestaña **Código** de la función Lambda, hacer clic en **"Subir desde"** > **"Archivo .zip"** y subir el archivo.

### 5. Configurar el Controlador (Handler)

1.  En la pestaña **Código**, ir a **Configuración del tiempo de ejecución** > **Editar**.
2.  Asegurarse de que el **Controlador (Handler)** esté configurado como:
    ```
    index.handler
    ```
    *(O `aws/index.handler` si el .zip se subió con una carpeta contenedora).*

### 6. Añadir el Disparador (API Gateway) 

1.  En la página de la función Lambda, hacer clic en **"+ Agregar desencadenador"**.
2.  Seleccionar **API Gateway** .
3.  Elegir **"Crear una nueva API"** del tipo **"REST API"** .
4.  **Seguridad:** Seleccionar **"Abierto"**.
5.  Hacer clic en **"Añadir"**.

---

## 🧪 Pruebas

El despliegue genera una "URL de punto de enlace de API".

**URL del Endpoint:** `https://cvkej8xhu9.execute-api.us-east-2.amazonaws.com/default/todoFunction`

### POST (Crear Tarea)
* **Método:** `POST`
* **Body (raw/JSON):**
    ```json
    {
      "titulo": "Hacer el README de la Parte 2"
    }
    ```

### GET (Leer Tareas)
* **Método:** `GET`