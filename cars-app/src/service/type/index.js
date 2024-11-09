export const getTypes = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/type`, {
    headers: { authorization: `Bearer ${token}` },
    method: "GET",
  });
  const result = await res.json();
  return result;
};

export const getTypesById = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/type/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    method: "GET",
  });
  const result = await res.json();
  return result;
};

export const createType = async (request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  formData.append("characteristic", request?.characteristic);
  formData.append("style", request?.style);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/type`, {
    headers: { authorization: `Bearer ${token}` },
    method: "POST",
    body: formData,
  });
  const result = await res.json();
  return result;
};

export const updateType = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", request.name);
  formData.append("description", request.description);
  formData.append("characteristic", request?.characteristic);
  formData.append("style", request?.style);
  const res = await fetch(`${import.meta.env.VITE_API_URL}/type/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    method: "PUT",
    body: formData,
  });
  const result = await res.json();
  return result;
};

export const deleteType = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/type/${id}`, {
    headers: { authorization: `Bearer ${token}` },
    method: "DELETE",
  });
  const result = await res.json();
  return result;
};
