import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../api";

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <div>
      <h1>Library Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              <img src={book.coverimage} alt={book.title} width="100" />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
