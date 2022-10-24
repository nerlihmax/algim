export type VectorObject = { x: number; y: number };

export class Vector {
  readonly x: number;
  readonly y: number;

  get x() {
    return this.x;
  }

  private constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static of({ x, y }: VectorObject): Vector {
    return new Vector(x, y);
  }

  public unwrap(): VectorObject {
    return { x: this.x, y: this.y };
  }

  public toString(): string {
    return `Vector(x=${this.x}, y=${this.y})`;
  }
}
