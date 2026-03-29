const API = "https://rbac-task-api-fastapi.onrender.com/api/v1";

// ================= REGISTER =================
async function register() {
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await res.json();
  console.log("REGISTER RESPONSE:", data);
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
    const msg = document.getElementById("message");
    if (msg) msg.innerText = "Login failed";
  }
}

// ================= CREATE TASK =================
async function createTask() {
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDesc").value;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/tasks/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      title,
      description
    })
  });

  const data = await res.json();
  console.log("CREATE TASK:", data);

  // clear inputs
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";

  loadTasks();
}

// ================= LOAD TASKS =================
async function loadTasks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/tasks/`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const data = await res.json();
  console.log("TASKS:", data);

  renderTasks(data);
}

// ================= RENDER TASKS =================
function renderTasks(tasks) {
  const list = document.getElementById("taskList");
  if (!list) return;

  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = `<p class="text-gray-500 text-sm">No tasks yet</p>`;
    return;
  }

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded-xl shadow flex justify-between items-start";

    div.innerHTML = `
      <div>
        <h3 class="font-semibold">${task.title}</h3>
        <p class="text-sm text-gray-600">${task.description || ""}</p>
      </div>
      <button onclick="deleteTask(${task.id})"
        class="text-red-500 text-sm hover:underline">
        Delete
      </button>
    `;

    list.appendChild(div);
  });
}

// ================= DELETE TASK =================
async function deleteTask(id) {
  const token = localStorage.getItem("token");

  await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  loadTasks();
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

// ================= AUTO LOAD =================
if (window.location.pathname.includes("dashboard")) {
  loadTasks();
}