function runArtSketch() {
   
        new p5((p) => {
          let cloth;
          let gravity;
          let spacing = 20;
          let cols, rows;
          let stiffness = 0.28;
          let damping = 0.95;
          let cutting = false;
          let grabbedParticle = null;
      
          p.setup = function () {
            let canvas = p.createCanvas(500, 500);
            canvas.parent("art-holder");
            cols = Math.floor(p.width / spacing);
            rows = Math.floor(p.height / spacing);
            gravity = p.createVector(0, 0.1);
            cloth = new Cloth(cols, rows);
          };
      
          p.draw = function () {
            p.background(0);
            cloth.update();
            cloth.display();
      
            if (cutting) {
              cloth.cut(p.mouseX, p.mouseY);
            }
          };
      
          p.mousePressed = function () {
            cloth.grab(p.mouseX, p.mouseY);
          };
      
          p.mouseDragged = function () {
            if (grabbedParticle) {
              grabbedParticle.pos.set(p.mouseX, p.mouseY);
              grabbedParticle.vel.set((p.mouseX - p.pmouseX) * 0.5, (p.mouseY - p.pmouseY) * 0.5);
            }
          };
      
          p.mouseReleased = function () {
            if (grabbedParticle) {
              grabbedParticle.vel.mult(0.5);
              grabbedParticle = null;
            }
          };
      
          p.keyPressed = function () {
            if (p.key === 'd' || p.key === 'D') {
              cutting = true;
            }
          };
      
          p.keyReleased = function () {
            if (p.key === 'd' || p.key === 'D') {
              cutting = false;
            }
          };
      
          class Cloth {
            constructor(cols, rows) {
              this.particles = [];
              this.springs = [];
      
              for (let i = 0; i < cols; i++) {
                this.particles[i] = [];
                for (let j = 0; j < rows; j++) {
                  let fixed = (j == 0);
                  this.particles[i][j] = new Particle(i * spacing, j * spacing, fixed);
                }
              }
      
              for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                  if (i > 0) {
                    this.springs.push(new Spring(this.particles[i][j], this.particles[i - 1][j], stiffness));
                  }
                  if (j > 0) {
                    this.springs.push(new Spring(this.particles[i][j], this.particles[i][j - 1], stiffness));
                  }
                }
              }
            }
      
            update() {
              for (let spring of this.springs) {
                spring.update();
              }
              for (let row of this.particles) {
                for (let p of row) {
                  p.applyForce(gravity);
                  p.update();
                }
              }
            }
      
            display() {
              for (let spring of this.springs) {
                spring.display();
              }
            }
      
            grab(x, y) {
              for (let row of this.particles) {
                for (let p of row) {
                  if (p.distTo(x, y) < spacing / 2 && !p.fixed) {
                    grabbedParticle = p;
                    return;
                  }
                }
              }
            }
      
            cut(x, y) {
              for (let i = this.springs.length - 1; i >= 0; i--) {
                let s = this.springs[i];
                let d1 = p.dist(x, y, s.p1.pos.x, s.p1.pos.y);
                let d2 = p.dist(x, y, s.p2.pos.x, s.p2.pos.y);
                if (d1 < spacing || d2 < spacing) {
                  this.springs.splice(i, 1);
                }
              }
            }
          }
      
          class Particle {
            constructor(x, y, fixed) {
              this.pos = p.createVector(x, y);
              this.prevPos = this.pos.copy();
              this.fixed = fixed;
              this.vel = p.createVector(0, 0);
              this.acc = p.createVector(0, 0);
            }
      
            applyForce(force) {
              if (!this.fixed && this !== grabbedParticle) {
                this.acc.add(force);
              }
            }
      
            update() {
              if (!this.fixed) {
                if (this !== grabbedParticle) {
                  this.vel.add(this.acc);
                }
                this.vel.mult(damping);
                this.pos.add(this.vel);
                this.acc.mult(0);
              }
            }
      
            distTo(x, y) {
              return p.dist(x, y, this.pos.x, this.pos.y);
            }
          }
      
          class Spring {
            constructor(p1, p2, stiffness) {
              this.p1 = p1;
              this.p2 = p2;
              this.length = p5.Vector.dist(p1.pos, p2.pos);
              this.stiffness = stiffness;
            }
      
            update() {
              let force = p5.Vector.sub(this.p2.pos, this.p1.pos);
              let x = force.mag() - this.length;
              force.normalize();
              force.mult(this.stiffness * x);
              this.p1.applyForce(force);
              force.mult(-1);
              this.p2.applyForce(force);
            }
      
            display() {
              p.stroke(255);
              p.line(this.p1.pos.x, this.p1.pos.y, this.p2.pos.x, this.p2.pos.y);
            }
          }
        });
      }
      