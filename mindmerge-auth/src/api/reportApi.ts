const BASE_URL = "http://localhost:5000/api/reports";

const getToken = () => localStorage.getItem("token");

// Get Reports
export const getReports = async () => {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

// Create Report
export const createReport = async (report: any) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(report),
  });

  return response.json();
};

// Delete Report
export const deleteReport = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};