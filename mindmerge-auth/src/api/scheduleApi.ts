const BASE_URL = "http://localhost:5000/api/schedule";

export const createSchedule = async (
  schedule: any
) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedule),
  });

  return response.json();
};