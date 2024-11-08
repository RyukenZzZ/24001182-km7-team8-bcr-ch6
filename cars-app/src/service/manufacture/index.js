export const getManufactures = async (manufacture) => {
  const token = localStorage.getItem("token");
  let params = {};
  if (manufacture) {
    params.manufacture = manufacture;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/manufactures` +
    new URLSearchParams(params);
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getManufacturesById = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const getDetailManufactures = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/manufactures/${id}`;

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "GET",
  });

  // get data
  const result = await response.json();
  return result;
};

export const createManufacture = async (request) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token is missing.");

  const formData = new FormData();
  formData.append("name", request.name);
  if (request.logo) {
    formData.append("logo", request.logo);
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/manufactures`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const updateManufacture = async (id, request) => {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", request.name);
  if (request.logo) {
    formData.append("logo", request.logo);
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/manufactures/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: formData,
    }
  );

  const result = await response.json();
  return result;
};
export const deleteManufacture = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/manufactures/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }
  );

  const result = await response.json();
  return result;
};
