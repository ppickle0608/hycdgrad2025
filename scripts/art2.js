function runArtSketch() {
    return new p5((p) => {
      let letters = [];
      let textStr = "RE: BOILING POINT";
      let fontSize = 32;
  
      p.setup = function () {
        let canvas = p.createCanvas(600, 300);
        canvas.parent("art-holder");
        p.textSize(fontSize);
        p.textAlign(p.CENTER, p.CENTER);
        for (let i = 0; i < textStr.length; i++) {
          let x = p.map(i, 0, textStr.length - 1, 80, p.width - 80);
          let y = p.height - 50;
          letters.push(new BubbleLetter(textStr[i], x, y));
        }
      };
  
      p.draw = function () {
        p.background(255);
        for (let l of letters) {
          l.update();
          l.display();
        }
      };
  
      class BubbleLetter {
        constructor(char, x, y) {
          this.char = char;
          this.basePos = p.createVector(x, y);
          this.pos = p.createVector(x, y);
          this.vel = p.createVector(p.random(-0.5, 0.5), p.random(-0.5, 0.5));
          this.acc = p.createVector(0, 0);
        }
  
        update() {
          let mouse = p.createVector(p.mouseX, p.mouseY);
          let d = p5.Vector.dist(this.pos, mouse);
          let boilZone = (p.mouseY > p.height - 100); // 끓는 조건
  
          // 기본 복원력
          if (!boilZone) {
            let homeward = p5.Vector.sub(this.basePos, this.pos);
            homeward.mult(0.01);
            this.acc.add(homeward);
          }
  
          // 마우스 주변에서 요동치는 힘
          if (d < 150) {
            let jitter = p5.Vector.random2D().mult(p.map(d, 0, 150, 5, 0));
            this.acc.add(jitter);
          }
  
          // 끓는 조건 시 격렬한 요동
          if (boilZone) {
            let chaos = p5.Vector.random2D().mult(3);
            this.acc.add(chaos);
          }
  
          // 가속도 적용
          this.vel.add(this.acc);
          if (boilZone) {
            this.vel.limit(6);
          } else {
            this.vel.limit(3);
          }
  
          this.pos.add(this.vel);
          this.acc.mult(0);
  
          // 마찰 적용
          this.vel.mult(boilZone ? 0.99 : 0.95);
  
          // 벽에 닿으면 반사
          if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x *= -1;
          } else if (this.pos.x > p.width) {
            this.pos.x = p.width;
            this.vel.x *= -1;
          }
  
          if (this.pos.y < 0) {
            this.pos.y = 0;
            this.vel.y *= -1;
          } else if (this.pos.y > p.height) {
            this.pos.y = p.height;
            this.vel.y *= -1;
          }
        }
  
        display() {
          p.fill(0);
          p.text(this.char, this.pos.x, this.pos.y);
        }
      }
    });
  }
  