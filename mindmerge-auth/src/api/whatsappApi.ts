const API = "http://localhost:5000/api/whatsapp";

export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
) => {
  const response = await fetch(`${API}/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber,
      message,
    }),
  });

  return await response.json();
};