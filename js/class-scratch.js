function drawFleet() {
  for (let i = 2; i < 8; i++) {
    grid[i].classList.add('typeC1', 'invader');
    invaders.push(grid[i]);
  }
  for (let i = 12; i < 18; i++) {
    grid[i].classList.add('typeC1', 'invader');
    invaders.push(grid[i]);
  }
  for (let i = 22; i < 28; i++) {
    grid[i].classList.add('typeB1', 'invader');
    invaders.push(grid[i]);
  }
  for (let i = 32; i < 38; i++) {
    grid[i].classList.add('typeB1', 'invader');
    invaders.push(grid[i]);
  }
  for (let i = 42; i < 48; i++) {
    grid[i].classList.add('typeA1', 'invader');
    invaders.push(grid[i]);
  }
  for (let i = 52; i < 58; i++) {
    grid[i].classList.add('typeA1', 'invader');
    invaders.push(grid[i]);
  }
}

for (let i = 2; i < 8; i++) {}
for (let i = 12; i < 18; i++) {}
for (let i = 22; i < 28; i++) {}
for (let i = 32; i < 38; i++) {}
for (let i = 42; i < 48; i++) {}
for (let i = 52; i < 58; i++) {}
