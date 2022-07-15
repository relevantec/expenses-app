import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ResizeService {

    onMouseDown() {
        
    }

}














    // onMouseDown(element: any) {
       
    //     element.onmousedown = (event: MouseEvent) => {
            
    //         let pageX = event.pageX;
    //         let pageY = event.pageY;
    //         let shiftX = event.clientX - element.getBoundingClientRect().left;
    //         let shiftY = event.clientY - element.getBoundingClientRect().top;
     
        
    //     function moveAt(pageX: number, pageY: number) {
    //         element.left = pageX - element.offsetWidth / 2 + 'px';
    //         element.top = pageY - element.offsetWidth / 2 + 'px';
    //     }
    //     moveAt(pageX, pageY);

    //     function onMouseMove(event: MouseEvent) {
    //         moveAt(event.pageX, event.pageY);
    //     }
    //     document.addEventListener('mousemove', onMouseMove);

    //     element.onmouseup = function() {
    //         document.removeEventListener('mousemove', onMouseMove);
    //         element.onmouseup = null;
    //     }

    //     element.ondragstart = function() {
    //         return false;
    //       };
    //     }
    // }
