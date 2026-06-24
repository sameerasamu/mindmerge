const BASE_URL = "http://localhost:5000/api/flow";

export const createFlow = async (
  token: string,
  flow: any
) => {
  const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flow),
  });

  return response.json();
};

export const getMyFlows = async (
  token: string
) => {
  const response = await fetch(`${BASE_URL}/myflows`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

export const updateFlow = async (
  token: string,
  id: string,
  flow: any
) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(flow),
  });

  return response.json();
};

export const deleteFlow = async (
  token: string,
  id: string
) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};