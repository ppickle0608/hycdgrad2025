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
  // 예: "projects/work1"에서 work1 추출
  const projectId = projectSlug.split("/")[1]; // "work1"
  // work 뒤의 숫자를 추출하여 디자이너 아이디 생성
  const projectNumber = projectId.replace("work", "");
  const designerId = "designer" + projectNumber; // "designer1"

  container.innerHTML = `
    <section class="project-detail">
      <div class="work-content">
        <h2>Project: ${projectId}</h2>
        <img src="assets/work1.jpg" alt="Work ${projectId}" />
        <p>여기에 해당 작업물에 대한 상세 설명이 들어갑니다.</p>
      </div>
      <aside class="designer-info" onclick="location.href='#designers/${designerId}'" style="cursor:pointer;">
        <h3>Designer Info</h3>
        <img src="assets/designer.jpg" alt="Designer" />
        <p>디자이너 이름: Designer Name</p>
        <p>연락처: example@example.com</p>
      </aside>
    </section>
  `;
}


function loadDesignerDetail(container, designerSlug) {
  // 예: "designers/designer1" → "designer1" 추출
  const designerId = designerSlug.split("/")[1];

  container.innerHTML = `
    <section class="designer-detail">
      <aside class="designer-basic">
        <img src="assets/designer.jpg" alt="${designerId}" />
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
          <p>
            여기 해당 디자이너의 작품에 대한 상세 설명이 들어갑니다. 작품의 컨셉, 제작 과정 및 특징 등을
            자유롭게 기술할 수 있습니다.
          </p>
        </div>
        <div class="designer-interview">
          <h3>Interview</h3>
          <p>
            인터뷰 내용이 스크롤에 따라 나타납니다. 긴 텍스트를 입력하여 스크롤 기능을 테스트해 보세요.  
            이 영역은 디자이너와의 인터뷰 내용, 작업 철학, 그리고 향후 계획 등에 대해 상세히 다룰 수 있습니다.
          </p>
        </div>
      </div>
    </section>
  `;
}
