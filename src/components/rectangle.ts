import * as PIXI from 'pixi.js';
import { Vector } from '../common/vector';

type RectangleArguments = {
  position: Vector;
  size: Vector;
};

export const Rectangle = ({ position, size }: RectangleArguments) =>
  new PIXI.Graphics()
    .beginFill(0xffffff)
    .lineTo(position.x, size.y)
    .lineTo(size.x, size.y)
    .lineTo(size.x, position.y)
    .lineTo(position.x, position.y)
    .endFill();
