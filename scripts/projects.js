function loadProjects(container) {
  container.innerHTML = `
    <section>
      <h2>Projects</h2>
      <div id="projectGrid" class="thumbnail-grid project-grid"></div>
      <div style="height: 1500px;"></div> <!-- 스크롤 테스트용 -->
      <aside class="category-menu">
        <button onclick="filterProjects('All')">All</button>
        <button onclick="filterProjects('Brand')">Brand</button>
        <button onclick="filterProjects('UIUX')">UIUX</button>
        <button onclick="filterProjects('Character')">Character</button>
      </aside>
    </section>
  `;

  fetch("data/projects.json")
    .then((res) => res.json())
    .then((data) => {
      window.allProjects = data;
      displayProjects(data);
    });
}

function displayProjects(projects) {
  const grid = document.getElementById("projectGrid");
  grid.innerHTML = "";

  projects.forEach((proj) => {
    const box = document.createElement("a");
    box.href = proj.link;
    box.className = "thumbnail-box";
    box.innerHTML = `
      <img src="${proj.thumbnail}" alt="${proj.title}" />
      <p>${proj.title}</p>
    `;
    grid.appendChild(box);
  });
}

function filterProjects(category) {
  if (category === "All") {
    displayProjects(window.allProjects);
  } else {
    const filtered = window.allProjects.filter((p) => p.category === category);
    displayProjects(filtered);
  }
}
