const API = "https://sherill-transitional-conception.ngrok-free.dev";

const request = async (path, options = {}) => {
  const res = await fetch(API + path, {
    ...options,
    headers: {
      "ngrok-skip-browser-warning": "true", // 🔥 WAJIB untuk ngrok
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API Error");
  }

  return res.json();
};


export const getStatus = () =>
  request("/status");

export const getMonitoring = () =>
  request("/monitoring");

export const getFeedingLog = () =>
  request("/feeding/log");

export const feedManual = () =>
  request("/feeding/manual", {
    method: "POST",
  });

export const deleteFeeding = (id) =>
  request(`/feeding/${id}`, {
    method: "DELETE",
  });

export const getJadwal = () =>
  request("/jadwal");

export const addJadwal = (jam) =>
  request("/jadwal", {
    method: "POST",
    body: JSON.stringify({ jam }),
  });

export const updateJadwal = (id, jam, aktif) =>
  request(`/jadwal/${id}`, {
    method: "PUT",
    body: JSON.stringify({ jam, aktif }),
  });

export const deleteJadwal = (id) =>
  request(`/jadwal/${id}`, {
    method: "DELETE",
  });
