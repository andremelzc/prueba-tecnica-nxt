"use client";
import { useBooks } from "../hooks/useHook";

const BooksList = () => {
  const { books, loading, error } = useBooks();

  if (loading) {
    return <div className="font-bold">Cargando libros...</div>;
  }

  if (error) {
    return <div className="font-bold">Error al cargar los libros: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de libros</h1>
      <ul>
        {books.slice(0, 10).map((book) => (
          <li key={book.id} className="mb-4">
            <strong className="block">{book.title}</strong>
            <span>
              Autor:{" "}
              {book.authors.length > 0 ? book.authors[0].name : "Desconocido (no hay data)"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
