// client/src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5555";

export const messageService = {
  // GET all messages
  getAll: () => fetch(`${API_URL}/messages`).then(r => r.json()),

  // POST a new message
  create: (body) => fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(r => r.json()),

  // DELETE a message
  delete: (id) => fetch(`${API_URL}/messages/${id}`, { method: "DELETE" }),

  // PATCH a message
  update: (id, body) => fetch(`${API_URL}/messages/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  }).then(r => r.json())
};