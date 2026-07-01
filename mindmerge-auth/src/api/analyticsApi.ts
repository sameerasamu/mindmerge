const BASE_URL = "http://localhost:5000/api/analytics";

const getToken = () => localStorage.getItem("token");

// Get Analytics
export const getAnalytics = async () => {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};