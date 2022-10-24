import * as PIXI from 'pixi.js';
import { Vector } from '../common/vector';

type TriangleArguments = {
  position: Vector;
  side: number;
};

export const Triangle = ({ position, side }: TriangleArguments) => {
  const { x, y } = position.unwrap();

  const template = new PIXI.Graphics();
  template.beginFill(0xffffff);
  template.moveTo(x, y);
  template.lineTo(x + side, y);
  template.lineTo(x + side / 2, y + side * Math.sin(Math.PI / 3));
  template.lineTo(x, y);
  template.endFill();

  return template;
};
