const BASE_URL = "http://localhost:5000/api/campaigns";

// Get all campaigns
export const getCampaigns = async (token: string) => {
  const res = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// Get one campaign
export const getCampaign = async (
  token: string,
  id: string
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// Create campaign
export const createCampaign = async (
  token: string,
  campaign: any
) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(campaign),
  });

  return res.json();
};

// Update campaign
export const updateCampaign = async (
  token: string,
  id: string,
  campaign: any
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(campaign),
  });

  return res.json();
};

// Delete campaign
export const deleteCampaign = async (
  token: string,
  id: string
) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};