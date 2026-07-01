const API = "http://localhost:5000/api/templates";

const token = () => localStorage.getItem("token");

export async function getTemplates() {
  const res = await fetch(API, {
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.json();
}

export async function createTemplate(template: any) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(template),
  });

  return res.json();
}

export async function updateTemplate(id: string, template: any) {
  const res = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(template),
  });

  return res.json();
}

export async function deleteTemplate(id: string) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  return res.json();
}