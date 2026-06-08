import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookList from "./components/BookList";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path="/books" element={<CatalogPage />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/account" element={<Account />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}
