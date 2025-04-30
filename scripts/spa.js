// ������ SPA �����
function navigateTo(page) {
  window.location.hash = page;
  loadPage(page);
}

// ���� �ε� �� �ؽ� ��ο� ���� ������ �ε�
window.addEventListener("DOMContentLoaded", () => {
  const initialPage = window.location.hash.replace("#", "") || "main";
  loadPage(initialPage);
});

// �ؽ� ���� �� ������ �ε�
window.addEventListener("hashchange", () => {
  const page = window.location.hash.replace("#", "");
  loadPage(page);
});

// �� �������� ���� �ش� JS ���� ����
function loadPage(page) {
  const content = document.getElementById("content");

  if (page === "main") {
    loadMain(content);
  } else if (page === "projects") {
    loadProjects(content);
  } else if (page === "designers") {
    loadDesigners(content);
  } else if (page.startsWith("projects/")) {
    loadProjectDetail(content, page);
  } else if (page.startsWith("designers/")) {
    loadDesignerDetail(content, page);
  } else {
    content.innerHTML = "<p>404 - 페이지를 찾을 수 없습니다.</p>";
  }
}



function loadProjectDetail(container, projectSlug) {
  const projectId = projectSlug.split("/")[1]; // e.g., work1
  const designerId = "designer" + projectId.replace("work", "");
  const imagePath = `artworks/${designerId}`;

  let imagesHTML = "";
  for (let i = 2; i <= 20; i++) { // 최대 20개까지 시도
    imagesHTML += `
      <img src="${imagePath}/${i}.png" 
           alt="Artwork ${i - 1}" 
           style="width:100%; margin-bottom:20px;" 
           onerror="this.style.display='none';" />
    `;
  }

  container.innerHTML = `
    <section class="project-detail">
      <div class="work-content">
        <h2>Project: ${projectId}</h2>
        ${imagesHTML}
      </div>
      <aside class="designer-info" onclick="location.href='#designers/${designerId}'" style="cursor:pointer;">
        <h3>Designer Info</h3>
        <img src="${imagePath}/1.png" alt="Designer" />
        <p>디자이너 이름: ${designerId}</p>
        <p>연락처: example@example.com</p>
      </aside>
    </section>
  `;
}




function loadDesignerDetail(container, designerSlug) {
  const designerId = designerSlug.split("/")[1];
  const imagePath = `artworks/${designerId}`;

  container.innerHTML = `
    <section class="designer-detail">
      <aside class="designer-basic">
        <img src="${imagePath}/1.png" alt="${designerId}" />
        <h2>${designerId}</h2>
        <p>Email: example@example.com</p>
      </aside>
      <div class="designer-main">
        <div class="designer-works">
          <h3>Works</h3>
          <ul>
            <li><a href="#projects/work1">Project 1</a></li>
          </ul>
          <h3>Project Description</h3>
          <p>작품 설명...</p>
        </div>
        <div class="designer-interview">
          <h3>Interview</h3>
          <p>인터뷰 내용...</p>
        </div>
      </div>
    </section>
  `;
}


