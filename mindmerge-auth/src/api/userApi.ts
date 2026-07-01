const BASE_URL = "http://localhost:5000/api/users";

export const getProfile = async (token: string) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};