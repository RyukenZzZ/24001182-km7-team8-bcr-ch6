export const getCars = async (cars) => {
  const token = localStorage.getItem("token");
  let params = {};
  if (cars) {
    params.cars = cars;
  }
  let url =
    `${import.meta.env.VITE_API_URL}/cars` + new URLSearchParams(params);

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

export const getCarById = async (id) => {
  const token = localStorage.getItem("token");
  let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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

export const getDetailCars = async (id) => {
  const token = localStorage.getItem("token");

  let url = `${import.meta.env.VITE_API_URL}/cars/${id}`;

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

export const createCar = async (request) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token is missing.");

  const formData = new FormData();
  formData.append("plate", request.plate);
  formData.append("manufacture_id", request.manufactureId);
  formData.append("model_id", request.modelId);
  formData.append("image", request.image);
  formData.append("rentPerDay", request.rentPerDay);
  formData.append("capacity", request.capacity);
  formData.append("description", request.description);
  formData.append("availableAt", request.availableAt);
  formData.append("transmission", request.transmission);
  formData.append("available", request.available);
  formData.append("type_id", request.typeId);
  formData.append("year", request.year);

  if (request.options) {
    formData.append("options", request.options);
  }
  if (request.specs) {
    formData.append("specs", request.specs);
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const updateCar = async (id, request) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("plate", request.plate);
  formData.append("manufacture_id", request.manufactureId);
  formData.append("model_id", request.modelId);
  if (request.image) {
    formData.append("image", request.image);
  }
  formData.append("rentPerDay", request.rentPerDay);
  formData.append("capacity", request.capacity);
  formData.append("description", request.description);
  formData.append("availableAt", request.availableAt);
  formData.append("transmission", request.transmission);
  formData.append("available", request.available);
  formData.append("type_id", request.typeId);
  formData.append("year", request.year);

  if (request.options) {
    formData.append("options", request.options);
  }
  if (request.specs) {
    formData.append("specs", request.specs);
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "PUT",
    body: formData,
  });

  const result = await response.json();
  return result;
};

export const deleteCar = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    method: "DELETE",
  });

  const result = await response.json();
  return result;
};
