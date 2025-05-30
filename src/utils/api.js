// utils/api.js

const baseUrl = "http://localhost:3002";

// Get all clothing items
export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => res.json());
};

// Post new item
export const addClothingItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then((res) => res.json());
};

// Delete item
export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};
