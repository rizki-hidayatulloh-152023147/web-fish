// src/api.js
const API = "http://localhost:4000";

export const getStatus = () =>
  fetch(API + "/status").then(res => res.json());

export const getMonitoring = () =>
  fetch(API + "/monitoring").then(res => res.json());

export const getFeedingLog = () =>
  fetch(API + "/feeding/log").then(res => res.json());

export const feedManual = () =>
  fetch(API + "/feeding/manual", { method: "POST" })
    .then(res => res.json());

export const getJadwal = () =>
  fetch(API + "/jadwal").then(res => res.json());

export const addJadwal = (jam) =>
  fetch(API + "/jadwal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jam })
  }).then(res => res.json());

export const updateJadwal = (id, jam, aktif) =>
  fetch(API + "/jadwal/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jam, aktif })
  }).then(res => res.json());

export const deleteJadwal = (id) =>
  fetch(API + "/jadwal/" + id, {
    method: "DELETE"
  }).then(res => res.json());

export const deleteFeeding = (id) =>
  fetch(API + "/feeding/" + id, {
    method: "DELETE"
  }).then(res => res.json());