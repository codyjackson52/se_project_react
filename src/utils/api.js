const baseUrl = "http://localhost:3001";

export const getClothingItems = () => {
  return fetch(`${baseUrl}/items`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Fetch error: ${res.status}`);
      }
      return res.json();
    })
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
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`POST failed: ${res.status}`);
    }
    return res.json();
  });
};

export const deleteClothingItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`DELETE failed: ${res.status}`);
    }
    return res;
  });
};
