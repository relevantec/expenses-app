import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CdkDragDrop, CdkDragMove, CdkDragStart } from '@angular/cdk/drag-drop';
import { glfx } from 'src/typings' ;

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('wrapper') wrapperEl!: ElementRef<HTMLDivElement>;
  @ViewChild('placeholder') placeholder!: ElementRef<HTMLDivElement>;

  context!: any;

  offSet = { x: 0, y: 0 };

  topLeft = { x: 120, y: 120 };
  topRight = { x: 260, y: 120 };
  bottomRight = { x: 300, y: 270 };
  bottomLeft = { x: 100, y: 270 };

  proxy = {
    y: 0,
    x: 0,
    width: 0,
    height: 0,
  };

  offsetProxy = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: 0, y: 0 },
    bottomRight: { x: 0, y: 0 },
    bottomLeft: { x: 0, y: 0 }
  }

  constructor() {
  }

  ngOnInit(): void {
    this.calcProxy();
    console.log(glfx)
  }

  getPaths() {
    return `
    ${this.topLeft.x}, ${this.topLeft.y} 
    ${this.topRight.x}, ${this.topRight.y} 
    ${this.bottomRight.x}, ${this.bottomRight.y} 
    ${this.bottomLeft.x}, ${this.bottomLeft.y}
    `;
  }

  calcProxy() {
    this.proxy.y = Math.min(
      this.topLeft.y,
      this.topRight.y,
      this.bottomLeft.y,
      this.bottomRight.y
    );
    
    this.proxy.x = Math.min(
      this.topLeft.x,
      this.bottomLeft.x,
      this.topRight.x,
      this.bottomRight.x
    );
    this.proxy.width =
      Math.max(this.topRight.x, this.bottomRight.x) - this.proxy.x;
    this.proxy.height =
      Math.max(this.bottomLeft.y, this.bottomRight.y) - this.proxy.y;
  }

  onDragProxyStart() {
    this.offsetProxy.topLeft = Object.assign({}, this.topLeft);
    this.offsetProxy.topRight = Object.assign({}, this.topRight);
    this.offsetProxy.bottomRight = Object.assign({}, this.bottomRight);
    this.offsetProxy.bottomLeft = Object.assign({}, this.bottomLeft);
  }

  onDragProxy(e: CdkDragMove) {
    this.topLeft.x = e.distance.x + this.offsetProxy.topLeft.x;
    this.topLeft.y = e.distance.y + this.offsetProxy.topLeft.y;
    this.topRight.x = e.distance.x + this.offsetProxy.topRight.x;
    this.topRight.y = e.distance.y + this.offsetProxy.topRight.y;
    this.bottomRight.x = e.distance.x + this.offsetProxy.bottomRight.x;
    this.bottomRight.y = e.distance.y + this.offsetProxy.bottomRight.y;
    this.bottomLeft.x = e.distance.x + this.offsetProxy.bottomLeft.x;
    this.bottomLeft.y = e.distance.y + this.offsetProxy.bottomLeft.y;
    this.calcProxy();
  }

  onDrag(
    circle: 'topLeft' | 'topRight' | 'bottomRight' | 'bottomLeft' | 'proxy',
    e: CdkDragMove
  ) {
    this[circle].x = e.pointerPosition.x - this.offSet.x;
    this[circle].y = e.pointerPosition.y - this.offSet.y;
    this.calcProxy();
  }

  onDragStart(e: CdkDragStart) {
    let el = e.source.boundaryElement as HTMLDivElement;
    const rect = el.getBoundingClientRect();
    this.offSet.x = rect.x;
    this.offSet.y = rect.y;
  }

  uploadPhoto(e: any) {
    let render = new FileReader();
    if (this.canvas.nativeElement.getContext('2d')) {
      this.context = this.canvas.nativeElement.getContext('2d');
    }
    render.onload = (event) => {
      let img = new Image();
      img.onload = () => {
        img.width = this.canvas.nativeElement.width;
        img.height = this.canvas.nativeElement.height;
        this.context.drawImage(img, 0, 0);
      };
      img.src = event.target?.result as string;
    };
    render.readAsDataURL(e.target.files[0]);
  }

  takeRectangleFromImg() {
    const canvasCrop = glfx.canvas();
    const image = this.canvas.nativeElement;
    const texture = canvasCrop.texture(image);
    // canvasCrop.draw(texture).ink(0.25).update();
    // canvasCrop.draw(texture).perspective(
    //   [5, 10, 120, 10, 120, 200, 10, 200],
    //   [
    //         this.topLeft.x,
    //         this.topLeft.y,
    //         this.topRight.x,
    //         this.topRight.y,
    //         this.bottomRight.x,
    //         this.bottomRight.y,
    //         this.bottomLeft.x,
    //         this.bottomLeft.y
    //       ]
    // )
    image.parentNode?.insertBefore(this.placeholder.nativeElement, image);
    // console.log(this.topRight.x + this.offSet.x);
    // image.parentNode?.removeChild(image);
    // const texture = canvasCrop.texture(this.placeholder.nativeElement);
      // this.placeholder.nativeElement.insertAdjacentElement('afterend' ,canvasCrop)
      
      // canvasCrop.draw(texture);
    // texture.draw().perspective(
    //   [
    //     0,0,0,0,0,0,0,0
    //   ],
    //   [
    //     this.topLeft.x,
    //     this.topLeft.y,
    //     this.topRight.x,
    //     this.topRight.y,
    //     this.bottomRight.x,
    //     this.bottomRight.y,
    //     this.bottomLeft.x,
    //     this.bottomLeft.y
    //   ]
    // ).update();
  }
}
