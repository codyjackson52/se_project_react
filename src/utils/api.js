const baseUrl = "http://localhost:3001";

export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Fetch error: ${res.status}`);
  }
  return res.json();
};

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`)
    .then(checkResponse)
    .then((items) =>
      items.map((item) => ({
        ...item,
        link: item.imageUrl,
        id: item._id ?? item.id,
      }))
    );
};

export const addClothingItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  }).then(checkResponse);
};

export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};

export const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
