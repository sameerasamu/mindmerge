const BASE_URL = "http://localhost:5000/api/contacts";

const getToken = () => localStorage.getItem("token");

// Get Contacts
export const getContacts = async () => {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};

// Add Contact
export const addContact = async (contact: any) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(contact),
  });

  return response.json();
};

// Update Contact
export const updateContact = async (id: string, contact: any) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(contact),
  });

  return response.json();
};

// Delete Contact
export const deleteContact = async (id: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.json();
};