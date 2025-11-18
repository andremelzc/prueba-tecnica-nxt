# Prueba Técnica: Consumo de API con Next.js (Parte 1 - Nivel Básico)

Este proyecto es la solución a la Parte 1 de la prueba técnica. Es una pequeña aplicación en **Next.js 14+** y **TypeScript** que consume la API pública de [Gutendex](https://gutendex.com/) para mostrar una lista de libros.

El objetivo principal es demostrar la construcción de componentes, el consumo de APIs (fetch), el manejo de estado (carga, error, datos) y el uso de TypeScript para un tipado seguro.

---

## ✅ Características Principales

* **Componente Reutilizable:** Todo el consumo de la API está encapsulado en el componente `app/components/BooksList.tsx`.
* **Consumo de API:** Utiliza `fetch` nativo para obtener datos del endpoint `https://gutendex.com/books/?page=1`.
* **Tipado con TypeScript:** Define interfaces (`Book`, `Author`) para asegurar la estructura de los datos de la API.
* **Manejo de Estados:** Muestra un mensaje "Cargando..." mientras se obtienen los datos.
* **Manejo de Errores:** Muestra un mensaje de error si la llamada a la API falla.
* **Renderizado de Datos:** Mapea la respuesta y muestra los 10 primeros títulos de libros y el nombre de su autor principal, tal como se solicitó.

---

## 🛠️ Tecnologías Utilizadas

* **Next.js 14+** (App Router)
* **React 18**
* **TypeScript**

---

## 🏃 Cómo ejecutar el proyecto

Sigue estos pasos para levantar el proyecto en tu máquina local:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://[URL-DE-TU-REPOSITORIO].git
    cd [NOMBRE-DEL-PROYECTO]
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  **Abrir en el navegador:**
    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación en funcionamiento.

---
