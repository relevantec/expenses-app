import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
import { glfx } from 'src/typings';

const DOT_WIDTH = 16;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @ViewChild('previewRef') preview?: ElementRef<HTMLCanvasElement>;
  @ViewChild('outputRef') output!: ElementRef<HTMLDivElement>;

  img?: HTMLImageElement;

  // a ------- b
  //  \       /
  //   c --- d
  a = { x: 0, y: 0 };
  b = { x: 0, y: 0 };
  c = { x: 0, y: 0 };
  d = { x: 0, y: 0 };

  proxy = { x: 0, y: 0, w: 0, h: 0 };
  boundry = { x: 0, y: 0, w: 0, h: 0, s: 1 };

  old = {
    a: { x: 0, y: 0 },
    b: { x: 0, y: 0 },
    d: { x: 0, y: 0 },
    c: { x: 0, y: 0 },
  };

  constructor() {}

  ngOnInit(): void {
    this.calcProxy();
  }

  getPath() {
    return `
      ${this.a.x}, ${this.a.y} ${this.b.x}, ${this.b.y}
      ${this.d.x}, ${this.d.y} ${this.c.x}, ${this.c.y}
    `;
  }

  calcProxy() {
    this.proxy.x = Math.min(this.a.x, this.c.x, this.b.x, this.d.x);
    this.proxy.y = Math.min(this.a.y, this.b.y, this.c.y, this.d.y);
    this.proxy.w =
      Math.max(this.a.x, this.c.x, this.b.x, this.d.x) - this.proxy.x;
    this.proxy.h =
      Math.max(this.a.y, this.b.y, this.c.y, this.d.y) - this.proxy.y;
  }

  calcBoundry() {
    const canvas = this.preview?.nativeElement;
    if (!canvas) return;
    if (!canvas.parentElement) return;
    const cvRect = canvas.getBoundingClientRect();
    const wrRect = canvas.parentElement.getBoundingClientRect();
    this.boundry.w = cvRect.width + DOT_WIDTH;
    this.boundry.h = cvRect.height + DOT_WIDTH;
    this.boundry.x = cvRect.left - wrRect.left - DOT_WIDTH / 2;
    this.boundry.y = cvRect.top - wrRect.top - DOT_WIDTH / 2;
    this.boundry.s = canvas.width / cvRect.width;

    this.a.x = this.c.x = DOT_WIDTH / 2;
    this.b.x = this.d.x = this.boundry.w - DOT_WIDTH / 2;
    this.a.y = this.b.y = DOT_WIDTH / 2;
    this.c.y = this.d.y = this.boundry.h - DOT_WIDTH / 2;
    this.calcProxy();
  }

  onDragStarted() {
    this.old.a = Object.assign({}, this.a);
    this.old.b = Object.assign({}, this.b);
    this.old.d = Object.assign({}, this.d);
    this.old.c = Object.assign({}, this.c);
  }

  onDragMoved(el: 'a' | 'b' | 'c' | 'd' | 'all', e: CdkDragMove) {
    const move: Array<'a' | 'b' | 'c' | 'd'> =
      el == 'all' ? ['a', 'b', 'c', 'd'] : [el];
    move.forEach((point) => {
      this[point].x = e.distance.x + this.old[point].x;
      this[point].y = e.distance.y + this.old[point].y;
    });
    this.calcProxy();
  }

  onResize() {
    this.calcBoundry();
  }

  loadPhoto(e: any) {
    const render = new FileReader();
    render.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = this.preview?.nativeElement;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        this.calcBoundry();
      };
      img.src = event.target?.result as string;
      this.img = img;
    };
    render.readAsDataURL(e.target.files[0]);
  }

  takeRectangleFromImg() {
    if (!this.preview) return;

    try {
      var fx = glfx.canvas();
    } catch (err) {
      console.error(err);
      return;
    }

    const crop = document.createElement('canvas');
    const ctx = crop.getContext('2d');
    if (!ctx) return;

    const ab = Math.hypot(this.b.x - this.a.x, this.b.y - this.a.y);
    const cd = Math.hypot(this.d.x - this.c.x, this.d.y - this.c.y);
    const ow = (this.boundry.s * (ab + cd)) / 2;

    const ac = Math.hypot(this.c.x - this.a.x, this.c.y - this.a.y);
    const bd = Math.hypot(this.d.x - this.b.x, this.d.y - this.b.y);
    const oh = (this.boundry.s * (ac + bd)) / 2;

    const min = {
      x: this.proxy.x,
      y: this.proxy.y,
    };

    const cw = this.proxy.w;
    const ch = this.proxy.h;

    let scale = {
      x: ow / cw,
      y: oh / ch,
    };

    crop.width = ow;
    crop.height = oh;

    const src = this.preview.nativeElement;
    const sx = min.x * this.boundry.s;
    const sy = min.y * this.boundry.s;
    const sw = cw * this.boundry.s;
    const sh = ch * this.boundry.s;
    ctx.drawImage(src, sx, sy, sw, sh, 0, 0, ow, oh);

    this.output.nativeElement.replaceChildren();
    this.output.nativeElement.appendChild(crop);

    const dot = (pos: string) => {
      const ind = pos[0] as 'a' | 'b' | 'c' | 'd';
      const axis = pos[1] as 'x' | 'y';
      return (this[ind][axis] - min[axis]) * scale[axis];
    };

    let img = new Image();
    img.src = crop.toDataURL('image/png');
    img.addEventListener('load', () => {
      let before = [];
      before.push(dot('ax'), dot('ay'), dot('bx'), dot('by'));
      before.push(dot('cx'), dot('cy'), dot('dx'), dot('dy'));

      let after = [];
      after.push(0, 0, img.width, 0);
      after.push(0, img.height, img.width, img.height);

      fx.draw(fx.texture(img)).perspective(before, after).update();
      this.output.nativeElement.appendChild(fx);
    });
  }
}
