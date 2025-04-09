function loadMain(container) {
  container.innerHTML = `
    <section class="main-section">
      <h1>Welcome to the Graduation Exhibition</h1>
      <p>This is the main page of our design department portfolio site.</p>
      <p>Click on the buttons above to explore the projects and designers.</p>
      <div id="art-holder" style="margin-top: 40px;"></div>
      <div style="height: 1500px;"></div>
    </section>
  `;

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  const sketch = runArtSketch(); // → p5 인스턴스를 반환하도록 art2.js에서 리턴만 해줘야 함

  if (isTouchDevice) {
    sketch.remove(); // p5 스케치 제거!
  }
}
