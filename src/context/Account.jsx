import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { returnBook } from "../API/index.js";
import { getAccount } from "../API/index.js";
import { useAuth } from "../AuthContext";

export default function Account() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [returningId, setReturningId] = useState(null);

  useEffect(() => {
    if (!token) return;

    const syncAccount = async () => {
      try {
        setError(null);
        const data = await getAccount(token);
        setAccount(data);
      } catch (e) {
        setError(e.message);
      }
    };

    syncAccount();
  }, [token]);

  const tryReturn = async (reservationId) => {
    try {
      setError(null);
      setReturningId(reservationId);
      await returnBook(token, reservationId);
      setAccount({
        ...account,
        reservations: account.reservations.filter(
          (reservation) => reservation.id !== reservationId,
        ),
      });
      navigate("/books");
    } catch (e) {
      setError(e.message);
    } finally {
      setReturningId(null);
    }
  };

  if (!token) {
    return (
      <>
        <h1>Account</h1>
        <p>You need to log in or register to view your account.</p>
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </>
    );
  }

  if (error) return <p role="alert">{error}</p>;
  if (!account) return <p>Loading account...</p>;

  return (
    <>
      <h1>Account</h1>
      <section>
        <h2>Your Details</h2>
        <p>
          {account.firstname} {account.lastname}
        </p>
        <p>{account.email}</p>
      </section>

      <section>
        <h2>Your Reservations</h2>
        {account.reservations.length ? (
          <ul>
            {account.reservations.map((reservation) => (
              <li key={reservation.id}>
                <img
                  src={reservation.coverimage || "/books.png"}
                  alt={`Cover of ${reservation.title}`}
                  className="bookCover"
                />
                <h3>{reservation.title}</h3>
                <p>{reservation.author}</p>
                <button
                  type="button"
                  onClick={() => tryReturn(reservation.id)}
                  disabled={returningId === reservation.id}
                >
                  {returningId === reservation.id ? "Returning..." : "Return"}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>You do not have any reserved books.</p>
        )}
      </section>
    </>
  );
}
