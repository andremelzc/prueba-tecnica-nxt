# Prueba Técnica TEC (Parte 3) - Gestión de Expedientes

El proyecto está dividido en dos carpetas:
* `/backend`: Una API RESTful construida con **Express.js** y **TypeScript** .
* `/frontend`: Una aplicación cliente construida con **Next.js 14+**, **TypeScript** y **Tailwind CSS** .

Este proyecto está configurado para ejecutarse con **un solo comando** desde la carpeta raíz (`/parte-3/`) usando `concurrently`.

---

## 🚀 Cómo Ejecutar la Aplicación Localmente 

Solo necesitas una terminal para ejecutar todo el proyecto.

### 1. Instalación (Solo la primera vez)

1.  Navega a la carpeta raíz `/parte-3/` (esta carpeta).
2.  Ejecuta `npm install`.

    ```bash
    cd parte-3/
    npm install
    ```
    *(El script `postinstall` en `package.json` se encargará automáticamente de instalar las dependencias de `/backend` y `/frontend` por ti).*

### 2. Ejecución

1.  Asegúrate de estar en la carpeta raíz `/parte-3/`.
2.  Ejecuta el script de desarrollo:

    ```bash
    npm run dev
    ```

`concurrently` iniciará ambos servidores al mismo tiempo:
* ✅ **Backend (API)** estará activo en `http://localhost:5000`
* ✅ **Frontend (App)** estará activo en `http://localhost:3000`

---

### 3. 🔑 Credenciales de Acceso

Una vez que la aplicación esté en funcionamiento, abre `http://localhost:3000` en tu navegador. Serás redirigido a la página de login .

Para iniciar sesión , utiliza las siguientes credenciales:

* **Usuario:** `admin`
* **Contraseña:** `password`