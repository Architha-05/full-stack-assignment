const backendURL = "http://localhost:5000/api";

/* ================= PROJECTS ================= */
fetch(`${backendURL}/projects`)
  .then(res => res.json())
  .then(projects => {
    const list = document.querySelector(".project-list");
    list.innerHTML = ""; // clear previous content

    // If no projects in DB, show a placeholder
    if (projects.length === 0) {
      list.innerHTML = "<p>No projects available yet.</p>";
      return;
    }

    projects.forEach(p => {
      const div = document.createElement("div");
      div.className = "project-card";
      div.innerHTML = `
        <img src="${p.imageUrl}" alt="${p.name}">
        <div class="content">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <button>Read More</button>
        </div>
      `;
      list.appendChild(div);
    });
  })
  .catch(err => console.error("Projects fetch error:", err));

/* ================= CLIENTS ================= */
fetch(`${backendURL}/clients`)
  .then(res => res.json())
  .then(clients => {
    const list = document.querySelector(".client-list");
    list.innerHTML = "";

    if (clients.length === 0) {
      list.innerHTML = "<p>No clients added yet.</p>";
      return;
    }

    clients.forEach(c => {
      const div = document.createElement("div");
      div.className = "client-card";
      div.innerHTML = `
        <img src="${c.imageUrl}" alt="${c.name}">
        <p>"${c.description}"</p>
        <h4>${c.name}</h4>
        <span>${c.designation}</span>
      `;
      list.appendChild(div);
    });
  })
  .catch(err => console.error("Clients fetch error:", err));

/* ================= CONTACT FORM ================= */
document.getElementById("contactForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());

  const res = await fetch(`${backendURL}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("Contact submitted successfully!");
    e.target.reset();
  } else {
    alert("Error submitting contact. Try again.");
  }
});

/* ================= NEWSLETTER ================= */
document.getElementById("subscribeBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("newsletterEmail").value;
  if (!email) return alert("Enter email");

  const res = await fetch(`${backendURL}/newsletter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });

  if (res.ok) {
    alert("Subscribed successfully!");
    document.getElementById("newsletterEmail").value = "";
  } else {
    alert("Subscription failed. Try again.");
  }
});
