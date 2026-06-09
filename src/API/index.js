const API = import.meta.env.VITE_API;

/** Fetches the array of all books in the catalog. */
export async function getBooks() {
  try {
    const response = await fetch(API + "/books");
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

/** Fetches the details of a single book by its ID. */
export async function getBook(id) {
  try {
    const response = await fetch(API + "/books/" + id);
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

/**
 * Registers a new user account.
 * Returns the API response, which includes the authentication token.
 */
export async function register(credentials) {
  const response = await fetch(API + "/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

/**
 * Logs in to an existing account.
 * Returns the API response, which includes the authentication token.
 */
export async function login(credentials) {
  const response = await fetch(API + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

/**
 * Fetches the logged-in user's account details, including reservations.
 * A valid token will be needed.
 */
export async function getMe(token) {
  if (!token) {
    throw Error("You must be signed in to view your account.");
  }
  const response = await fetch(API + "/users/me", {
    headers: { Authorization: "Bearer " + token },
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

/**
 * Fetches the list of books the logged-in user reserved.
 * A valid token will be needed.
 */
export async function getReservations(token) {
  if (!token) {
    throw Error("You must be signed in to view your reservations.");
  }
  const response = await fetch(API + "/reservations", {
    headers: { Authorization: "Bearer " + token },
  });
  const result = await response.json();
  if (!response.ok) {
    throw Error(result.message);
  }
  return result;
}

/**
 * Reserve a book by its ID.
 * A valid token will be needed.
 */
export async function reserveBook(token, bookId) {
  if (!token) {
    throw Error("You must be signed in to reserve books");
  }
  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ bookId }),
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

/**
 * Returns a reservation by it's reservation id.
 * Note: this is the reservation's id, not the book's id.
 * A valid token will be needed.
 */
export async function returnBook(token, id) {
  if (!token) {
    throw Error("You must be signed in to return books.");
  }
  const response = await fetch(API + "/reservations/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
