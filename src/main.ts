import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Vector } from './common/vector';
import { Triangle } from './components/triangle';
import { Rectangle } from './components/rectangle';
import { DisplayObject, InteractionEvent } from 'pixi.js';

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
});
document.body.appendChild(app.view);
app.renderer.view.style.backgroundColor = 'rgba(0,0,0,0.1)';

const viewport = new Viewport({
  screenWidth: app.view.width,
  screenHeight: app.view.height,
  worldHeight: 1000,
  worldWidth: 1000,
  interaction: app.renderer.plugins.interaction,
});

window.addEventListener('resize', () => {
  app.view.width = window.innerWidth;
  app.view.height = window.innerHeight;
  viewport.resize(window.innerWidth, window.innerHeight, 1000, 1000);
});

app.stage.addChild(viewport);

viewport
  .drag()
  .pinch()
  .wheel()
  .clampZoom({
    maxHeight: 1000,
    maxWidth: 1000,
    minHeight: 50,
    minWidth: 50,
  })
  .clamp({
    bottom: 1000,
    right: 1000,
    top: 0,
    left: 0,
  });

viewport.fit();

const spawnButton = document.querySelector<HTMLButtonElement>('.spawn')!;

const grid = new PIXI.Container();
const points = new PIXI.Graphics().beginFill(0xffffff);
Array.from({ length: 100 }).forEach((_, x) =>
  Array.from({ length: 100 }).forEach((_, y) => {
    points.drawRect(x * 10, y * 10, 1, 1);
  })
);
grid.addChild(points);

viewport.addChild(grid);

viewport.on('click', (e: InteractionEvent) => {
  const worldPos = viewport.toWorld(e.data.global.x, e.data.global.y);
  const pos = Vector.of({
    x: Math.round(Math.trunc(worldPos.x) / 10) * 10 - 20,
    y: Math.round(Math.trunc(worldPos.y) / 10) * 10 - 20,
  });
  const rect = Rectangle({
    position: pos,
    size: Vector.of({ x: pos.x + 41, y: pos.y + 41 }),
  });
  rect.interactive = true;
  let drag: DisplayObject | null;
  rect.on('mousedown', (e: InteractionEvent) => {
    drag = e.target;
  });
  rect.on('mouseup', (e: InteractionEvent) => {
    drag = null;
  });
  rect.on('mousemove', (e: InteractionEvent) => {
    if (drag) {
      const worldPos = viewport.toWorld(e.data.global.x, e.data.global.y);
      console.log(rect.position);
      const screenPos = viewport.toScreen(worldPos.x, worldPos.y);
      drag.position.x = screenPos.x;
      drag.position.y = screenPos.y;
    }
  });
  grid.addChild(rect);
});

spawnButton.addEventListener('click', () => {
  const bounds = viewport.getVisibleBounds();
  const side = 150;
  const cameraPosition = Vector.of({
    x: Math.round((bounds.x + bounds.width / 2 - side / 2) / 10) * 10,
    y:
      Math.round(
        (bounds.y + bounds.height / 2 - (side * Math.sin(Math.PI / 3)) / 2) / 10
      ) * 10,
  });

  const triangle = Triangle({ position: cameraPosition, side });
  triangle.interactive = true;
  triangle.buttonMode = true;
  triangle.on('pointerdown', () => {
    const color = Math.trunc(Math.random() * Math.pow(2, 24));
    console.log(color.toString(16));
    triangle.tint = color;
  });
  grid.addChild(triangle);
  setTimeout(() => {
    console.log(triangle.geometry);
  }, 30);
});
