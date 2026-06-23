const BASE_URL = "http://localhost:5000/api/auth";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return response.json();
};