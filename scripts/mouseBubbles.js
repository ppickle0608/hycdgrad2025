function runMouseBubbles() {
    new p5((p) => {
      let bubbles = [];
      
      p.setup = function () {
        let cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.style('position', 'fixed');
        cnv.style('top', '0');
        cnv.style('left', '0');
        cnv.style('z-index', '9999');
        cnv.style('pointer-events', 'none');
        // fill()는 사용하지 않으므로 noFill() 호출
        p.noFill();
      };
  
      p.draw = function () {
        p.clear();
        
        // 매 5 프레임마다 한 개씩 새로운 거품 생성
        if (p.frameCount % 5 === 0) {
          bubbles.push(new Bubble(p.mouseX, p.mouseY));
        }
        
        // 거품 업데이트 및 표시, 투명도가 0 이하이면 제거
        for (let i = bubbles.length - 1; i >= 0; i--) {
          bubbles[i].update();
          bubbles[i].display();
          if (bubbles[i].opacity <= 0) {
            bubbles.splice(i, 1);
          }
        }
      };
  
      p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
  
      class Bubble {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = 15;      // 초기 크기 15px
          this.opacity = 255;  // 초기 불투명도 255 (완전 불투명)
          this.vx = p.random(-0.5, 0.5);
          this.vy = p.random(-1.5, -0.5);
        }
        update() {
          // 좌우로 약간의 진동 효과 추가
          this.x += this.vx + p.random(-0.3, 0.3);
          this.y += this.vy;
          // 크기를 서서히 줄임
          this.size -= 0.1;
          // 불투명도를 감소시켜 점차 사라지게 함
          this.opacity -= 3;
        }
        display() {
          // 검정 선(0.5px)으로 원을 그리며, 선의 투명도는 opacity로 조절
          p.stroke(0, this.opacity);
          p.strokeWeight(0.5);
          p.noFill();
          p.ellipse(this.x, this.y, this.size);
        }
      }
    });
  }
  