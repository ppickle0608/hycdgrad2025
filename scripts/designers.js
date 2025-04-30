function loadDesigners(container) {
  container.innerHTML = `
    <section>
      <h2>Designers</h2>
      <div id="designerGrid" class="thumbnail-grid designer-grid"></div>
      <div style="height: 1500px;"></div> <!-- 스크롤 테스트용 -->
    </section>
  `;

  fetch("data/designers.json")
    .then((res) => res.json())
    .then((data) => {
      displayDesigners(data);
    });
}

function displayDesigners(designers) {
  const grid = document.getElementById("designerGrid");
  grid.innerHTML = "";

  designers.forEach((designer) => {
    const designerId = designer.link.split("/")[1]; // e.g., designer1
    const imagePath = `artworks/${designerId}/1.png`;

    const box = document.createElement("a");
    box.href = designer.link;
    box.className = "thumbnail-box";
    box.innerHTML = `
      <img src="${imagePath}" alt="${designer.name}" onerror="this.style.display='none';" />
      <p>${designer.name}</p>
    `;
    grid.appendChild(box);
  });
}

