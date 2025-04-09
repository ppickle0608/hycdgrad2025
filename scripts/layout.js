// layout.js - 정렬 개선 및 숫자 위치 보정

const activeModes = new Set();

function toggleLayoutMode(type) {
  if (activeModes.has(type)) {
    activeModes.delete(type);
  } else {
    activeModes.add(type);
  }
  renderLayoutOverlay();
  updateButtonStyles();
}

function renderLayoutOverlay() {
  disableLayoutOverlay();

  const allElements = document.querySelectorAll("body *:not(script):not(style):not(link):not(.layout-debug-overlay)");
  const shownLefts = new Set();
  const shownTops = new Set();

  allElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const styles = getComputedStyle(el);
    const x = Math.round(rect.left + window.scrollX);
    const y = Math.round(rect.top + window.scrollY);

    if (activeModes.has("grid")) {
      const gridBox = document.createElement("div");
      gridBox.classList.add("layout-debug-overlay");
      Object.assign(gridBox.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${Math.round(rect.width)}px`,
        height: `${Math.round(rect.height)}px`,
        backgroundColor: "rgba(173, 216, 230, 0.1)",
        border: "1px solid #0077cc",
        zIndex: 9997,
        pointerEvents: "none"
      });
      document.body.appendChild(gridBox);
    }

    if (activeModes.has("size")) {
      const borderBox = document.createElement("div");
      borderBox.classList.add("layout-debug-overlay");
      Object.assign(borderBox.style, {
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        width: `${Math.round(rect.width)}px`,
        height: `${Math.round(rect.height)}px`,
        border: "1px solid gray",
        zIndex: 9999,
        pointerEvents: "none"
      });
      const label = document.createElement("span");
      label.textContent = `${Math.round(rect.width)} x ${Math.round(rect.height)}`;
      Object.assign(label.style, {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "8pt",
        color: "gray",
        backgroundColor: "white"
      });
      borderBox.appendChild(label);
      document.body.appendChild(borderBox);
    }

    if (activeModes.has("spacing")) {
      const marginTop = Math.round(parseFloat(styles.marginTop));
      const marginLeft = Math.round(parseFloat(styles.marginLeft));

      if (marginTop > 0) {
        const line = document.createElement("div");
        line.classList.add("layout-debug-overlay");
        Object.assign(line.style, {
          position: "absolute",
          left: `${x + rect.width / 2}px`,
          top: `${y - marginTop}px`,
          width: "1px",
          height: `${marginTop}px`,
          backgroundColor: "purple",
          zIndex: 9998
        });

        const label = document.createElement("div");
        label.textContent = `${marginTop}px`;
        Object.assign(label.style, {
          position: "absolute",
          left: `${x + rect.width / 2 + 5}px`,
          top: `${y - marginTop / 2 - 6}px`,
          fontSize: "8pt",
          color: "purple",
          backgroundColor: "white",
          zIndex: 9999
        });
        document.body.appendChild(line);
        document.body.appendChild(label);
      }

      if (marginLeft > 0) {
        const line = document.createElement("div");
        line.classList.add("layout-debug-overlay");
        Object.assign(line.style, {
          position: "absolute",
          top: `${y + rect.height / 2}px`,
          left: `${x - marginLeft}px`,
          height: "1px",
          width: `${marginLeft}px`,
          backgroundColor: "purple",
          zIndex: 9998
        });

        const label = document.createElement("div");
        label.textContent = `${marginLeft}px`;
        Object.assign(label.style, {
          position: "absolute",
          top: `${y + rect.height / 2 + 5}px`,
          left: `${x - marginLeft / 2}px`,
          fontSize: "8pt",
          color: "purple",
          backgroundColor: "white",
          zIndex: 9999
        });
        document.body.appendChild(line);
        document.body.appendChild(label);
      }
    }

    if (activeModes.has("distance")) {
      if (!shownLefts.has(x) && rect.left < 1000) {
        shownLefts.add(x);
        const dist = x;
        const line = document.createElement("div");
        line.classList.add("layout-debug-overlay");
        Object.assign(line.style, {
          position: "absolute",
          top: `${y}px`,
          left: "0px",
          width: `${dist}px`,
          height: "1px",
          backgroundColor: "red",
          zIndex: 9999
        });
        const label = document.createElement("div");
        label.textContent = `${dist}px`;
        Object.assign(label.style, {
          position: "absolute",
          left: `${dist / 2}px`,
          top: `${y + 5}px`,
          fontSize: "8pt",
          color: "red",
          backgroundColor: "white",
          zIndex: 9999
        });
        line.appendChild(label);
        document.body.appendChild(line);
      }

      if (!shownTops.has(y) && rect.top < 1000) {
        shownTops.add(y);
        const dist = y;
        const line = document.createElement("div");
        line.classList.add("layout-debug-overlay");
        Object.assign(line.style, {
          position: "absolute",
          left: `${x}px`,
          top: "0px",
          width: "1px",
          height: `${dist}px`,
          backgroundColor: "red",
          zIndex: 9999
        });
        const label = document.createElement("div");
        label.textContent = `${dist}px`;
        Object.assign(label.style, {
          position: "absolute",
          left: `${x + 5}px`,
          top: `${dist / 2}px`,
          fontSize: "8pt",
          color: "red",
          backgroundColor: "white",
          zIndex: 9999
        });
        line.appendChild(label);
        document.body.appendChild(line);
      }
    }
  });
}

function disableLayoutOverlay() {
  document.querySelectorAll(".layout-debug-overlay").forEach((el) => el.remove());
}

function updateButtonStyles() {
  document.querySelectorAll(".layout-debug-button").forEach((btn) => {
    const type = btn.dataset.type;
    btn.style.backgroundColor = activeModes.has(type) ? "#0077cc" : "white";
    btn.style.color = activeModes.has(type) ? "white" : "black";
  });
}

window.addEventListener("DOMContentLoaded", () => {
  const buttons = [
    { text: "📐 요소 사이즈", type: "size" },
    { text: "📏 여백/간격", type: "spacing" },
    { text: "🔷 그리드", type: "grid" },
    { text: "📎 거리", type: "distance" },
  ];

  buttons.forEach((btnInfo, i) => {
    const btn = document.createElement("button");
    btn.textContent = btnInfo.text;
    btn.dataset.type = btnInfo.type;
    btn.className = "layout-debug-button";
    Object.assign(btn.style, {
      position: "fixed",
      top: `${10 + i * 40}px`,
      right: "10px",
      zIndex: 10001,
      padding: "6px 10px",
      fontSize: "12px",
      cursor: "pointer",
      border: "1px solid #ccc",
      backgroundColor: "white"
    });
    btn.addEventListener("click", () => toggleLayoutMode(btnInfo.type));
    document.body.appendChild(btn);
  });
});
