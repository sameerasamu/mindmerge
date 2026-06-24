const BASE_URL = "http://localhost:5000/api/protected";

export const getProtectedProfile = async (
  token: string
) => {
  const response = await fetch(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};