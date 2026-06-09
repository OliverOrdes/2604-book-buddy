import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getBook } from "../API/index.js";
import { reserveBook } from "../API/index.js";
import { useAuth } from "../context/AuthContext";
/** I need a function to call BookDetails and grab id using useParams */
export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [reserveError, setReserveError] = useState(null);
  const [isReserving, setIsReserving] = useState(false);

  useEffect(() => {
    const syncBook = async () => {
      try {
        setError(null);
        const data = await getBook(id);
        if (!data) throw Error("Book not found.");
        setBook(data);
      } catch (e) {
        setError(e.message);
      }
    };
    syncBook();
  }, [id]);

  const tryReserve = async () => {
    if (isReserving) return;

    try {
      setReserveError(null);
      setIsReserving(true);
      await reserveBook(token, book.id);
      setBook({ ...book, available: false });
      navigate("/account");
    } catch (e) {
      setReserveError(e.message);
    } finally {
      setIsReserving(false);
    }
  };

  if (error) return <p role="alert">{error}</p>;
  if (!book) return <p>Loading book...</p>;

  return (
    <article>
      <img
        src={book.coverimage || "/books.png"}
        alt={`Cover of ${book.title}`}
        className="bookCover"
      />
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.description}</p>
      {token && (
        <button
          type="button"
          onClick={tryReserve}
          disabled={isReserving || !book.available}
        >
          {isReserving ? "Reserving..." : "Reserve"}
        </button>
      )}
      {!book.available && <p>This book is already reserved.</p>}
      {reserveError && <p role="alert">{reserveError}</p>}
    </article>
  );
}
