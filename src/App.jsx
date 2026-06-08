import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookList from "./components/BookList";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/books/:id" element={<p>Book details coming soon.</p>} />
          <Route path="/account" element={<p>Account page coming soon.</p>} />
          <Route path="/register" element={<p>Register page coming soon.</p>} />
          <Route path="/login" element={<p>Login page coming soon.</p>} />
        </Routes>
      </main>
    </>
  );
}
