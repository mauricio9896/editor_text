import { DOCUMENT } from '@angular/common';
import {Component, ElementRef, Inject, ViewChild } from '@angular/core';

@Component({
  selector: 'app-resizable',
  templateUrl: './resizable.component.html',
  styleUrls: ['./resizable.component.scss']
})
export class ResizableComponent {

  @ViewChild('resizeCorner',{
    static: true
  }) resizeCornerRef!: ElementRef;

  @ViewChild('wrapper',{
    static: true
  }) wrapperRef!: ElementRef;

  @ViewChild('topBar',{
    static: true
  }) topBarRef!: ElementRef;

  public statusDrag: boolean = false;

  public position: { x: number; y: number } = { x: 100, y: 100 };

  public size: { w: number; h: number } = { w: 200, h: 200 }; // degrees

  public lastPosition !: { x: number; y: number } ; // modificated

  public lastSize !: { w: number; h: number }  // modificated

  public minSize: { w: number; h: number } = { w: 0, h: 0 };

  public isDragging = false;

  constructor(@Inject(DOCUMENT) private _document: Document) {}


  startDrag($event : any): void {
    this.isDragging = true;
    if (!this.statusDrag) {
      $event.preventDefault();
      const mouseX = $event.clientX;
      const mouseY = $event.clientY;

      const positionX = this.position.x;
      const positionY = this.position.y;

      const duringDrag = (e:any) => {
        const dx = e.clientX - mouseX;
        const dy = e.clientY - mouseY;
        let newX = positionX + dx;
        let newY = positionY + dy;

        this.position.x = newX;
        this.position.y = newY;
        this.lastPosition = { ...this.position };
      };

      const finishDrag = (e: any) => {
        this._document.removeEventListener('mousemove', duringDrag);
        this._document.removeEventListener('mouseup', finishDrag);
        this.isDragging = false;
      };

      this._document.addEventListener('mousemove', duringDrag);
      this._document.addEventListener('mouseup', finishDrag);
    }
  }

  OnStatusDrag(status: boolean) {
    this.statusDrag = status;
  }
  startResize($event:any, anchors: any, direction: any): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;
    const lastX = this.position.x;
    const lastY = this.position.y;
    const dimensionWidth =
      this.resizeCornerRef.nativeElement.parentNode.offsetWidth;
    const dimensionHeight =
      this.resizeCornerRef.nativeElement.parentNode.offsetHeight;

    const duringResize = (e:any) => {
      let dw = dimensionWidth;
      let dh = dimensionHeight;
      if (direction === 'x' || direction === 'xy') {
        if (anchors.includes('left')) {
          dw += mouseX - e.clientX;
        } else if (anchors.includes('right')) {
          dw -= mouseX - e.clientX;
        }
      }
      if (direction === 'y' || direction === 'xy') {
        if (anchors.includes('top')) {
          dh += mouseY - e.clientY;
        } else if (anchors.includes('bottom')) {
          dh -= mouseY - e.clientY;
        }
      }

      if (anchors.includes('left')) {
        this.position.x = lastX + e.clientX - mouseX;
        this.size.w = Math.max(dw, this.minSize.w);
      }

      if (anchors.includes('top')) {
        this.position.y = lastY + e.clientY - mouseY;
        this.size.h = Math.max(dh, this.minSize.h);
      }

      if (anchors.includes('bottom') || anchors.includes('right')) {
        this.size.w = Math.max(dw, this.minSize.w);
        this.size.h = Math.max(dh, this.minSize.h);
      }

      this.lastSize = { ...this.size };
    };

    const finishResize = (e:any) => {
      this._document.removeEventListener('mousemove', duringResize);
      this._document.removeEventListener('mouseup', finishResize);
    };

    this._document.addEventListener('mousemove', duringResize);
    this._document.addEventListener('mouseup', finishResize);
  }

//   startDrag($event): void {
//     this.isDragging = true;
//     if (!this.statusDrag) {
//       $event.preventDefault();
//       const mouseX = $event.clientX;
//       const mouseY = $event.clientY;

//       const positionX = this.position.x;
//       const positionY = this.position.y;

//       const page = document.getElementById('text-input');

//       const containerWidth = page.offsetWidth;
//       const containerHeight = page.offsetHeight;
//       const componentWidth = this.widget.position.width;
//       const componentHeight = this.widget.position.height;
//       const maxX = containerWidth - componentWidth;
//       const maxY = containerHeight - componentHeight;

//       const duringDrag = (e) => {
//         const dx = e.clientX - mouseX;
//         const dy = e.clientY - mouseY;
//         let newX = positionX + dx;
//         let newY = positionY + dy;

//         if (newX < 0) {
//           newX = 0;
//         } else if (newX > maxX) {
//           newX = maxX;
//         }
//         if (newY < 0) {
//           newY = 0;
//         } else if (newY > maxY) {
//           newY = maxY;
//         }

//         this.position.x = newX;
//         this.position.y = newY;
//         this.lastPosition = { ...this.position };
//       };

//       const finishDrag = (e) => {
//         this.widget.position.left = this.position.x;
//         this.widget.position.top = this.position.y;
//         this._document.removeEventListener('mousemove', duringDrag);
//         this._document.removeEventListener('mouseup', finishDrag);
//         this.isDragging = false;
//       };

//       this._document.addEventListener('mousemove', duringDrag);
//       this._document.addEventListener('mouseup', finishDrag);
//     }
//   }

}
