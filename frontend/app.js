const API = "http://127.0.0.1:8000/api/v1";

// ================= REGISTER =================
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  document.getElementById("message").innerText =
    res.status === 201 ? "Registered successfully" : "Registration failed";
}

// ================= LOGIN =================
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.access_token) {
    localStorage.setItem("token", data.access_token);
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("message").innerText = "Login failed";
  }
}

// ================= CREATE TASK =================
async function createTask() {
  const token = localStorage.getItem("token");
  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;

  await fetch(`${API}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description }),
  });

  loadTasks();
}

// ================= LOAD TASKS =================
async function loadTasks() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/tasks/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const tasks = await res.json();
  const list = document.getElementById("taskList");

  if (!list) return;

  list.innerHTML = "";
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.innerText = t.title + " - " + (t.description || "");
    list.appendChild(li);
  });
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// auto-load tasks on dashboard
if (window.location.pathname.includes("dashboard")) {
  loadTasks();
}