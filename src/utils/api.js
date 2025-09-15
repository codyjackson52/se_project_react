const baseUrl = "http://localhost:3001";

// Handle fetch responses
export const checkResponse = (res) => {
  if (!res.ok) {
    return res.json().then((err) => {
      throw new Error(err.message || `Fetch error: ${res.status}`);
    });
  }
  return res.json();
};

// Get stored JWT
const getToken = () => localStorage.getItem("jwt");

// Common headers
const getAuthHeaders = (isJson = true) => {
  const headers = {
    Authorization: `Bearer ${getToken()}`,
  };
  if (isJson) {
    headers["Content-Type"] = "application/json";
  }
  return headers;
};

// GET all clothing items
export const getClothingItems = () =>
  fetch(`${baseUrl}/items`, {
    headers: getAuthHeaders(),
  })
    .then(checkResponse)
    .then((items) =>
      items.map((item) => ({
        ...item,
        imageUrl: item.imageUrl, // ✅ consistent with backend
        id: item._id ?? item.id,
      }))
    );

// POST a new clothing item
export const addClothingItem = (item) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(item),
  }).then(checkResponse);

// DELETE a clothing item
export const deleteClothingItem = (id) =>
  fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then(checkResponse);

// PUT (like) an item
export const addCardLike = (id) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: getAuthHeaders(false),
  }).then(checkResponse);

// DELETE (unlike) an item
export const removeCardLike = (id) =>
  fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: getAuthHeaders(false),
  }).then(checkResponse);
