import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

@Directive({
    selector: 'ng2-offcanvas'
})
export class Ng2Offcanvas {
    mouseover: boolean = false;
    mousedown: boolean = false;
    mouseup: boolean = false;
    startX: number = 0;
    currentX: number = 0;

    offCanvasContent: ElementRef = undefined;
    offCanvasCloseButton: any = undefined;

    constructor(private el: ElementRef, private renderer: Renderer) { }

    ngOnInit() {
        let mouseover = this.mouseover;
        let el = this.el;
        this.offCanvasContent = this.el.nativeElement.firstElementChild;
        let transitionEndEvent = this.whichTransitionEndEvent(this.offCanvasContent);
        transitionEndEvent && (this.offCanvasContent as any).addEventListener(transitionEndEvent, function() {
        	if(el.nativeElement.classList.value.indexOf('show') !== -1) {
                el.nativeElement.style.pointerEvents = 'auto';
            } else {
                el.nativeElement.style.pointerEvents = 'none';
            }
        });

        // Mouse over event
        (this.offCanvasContent as any).addEventListener('mouseover', () => {
            this.mouseover = true;
        });

        // Mouse out event
        (this.offCanvasContent as any).addEventListener('mouseout', () => {
            this.mouseover = false;
        });

        // Click
        this.offCanvasCloseButton = document.querySelector('ng2-offcanvas .side-nav-close-button');
        this.offCanvasCloseButton.addEventListener('click', () => {
            // Close only when user click over modal overlay
            this.renderer.setElementClass(this.el.nativeElement, 'show', false);
        });

        // Touch start
        (this.offCanvasContent as any).addEventListener('touchstart', (event) => {
            this.mousedown = true;

            this.startX = event.touches[0].pageX;
            this.currentX = this.startX;
        }, {passive: true});

        // Touch end
        (window as any).addEventListener('touchend', (event) => {
            this.mousedown = false;

            (this.offCanvasContent as any).style.willChange = 'transform';
            (this.offCanvasContent as any).style.transitionDuration = '';
            (this.offCanvasContent as any).style.transform = '';

            let x = Math.min(0, this.currentX - this.startX);
            if (x < 0) {
                // Close
                this.renderer.setElementClass(this.el.nativeElement, 'show', false);
            }
        });

        // Touch move
        (window as any).addEventListener('touchmove', (event) => {
            if(this.mousedown) {
                this.currentX = event.touches[0].pageX;
                let x = Math.min(0, event.touches[0].pageX - this.startX);
                (this.offCanvasContent as any).style.willChange = 'transform';
                (this.offCanvasContent as any).style.transitionDuration = '0s';
                (this.offCanvasContent as any).style.transform = `translateX(${x}px)`;
            }
        }, {passive: true});

    }

    whichTransitionEndEvent(elementObject) {
        let el = elementObject;
        let transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }

        for (let t in transitions) {
            if ((el as any).style[t] !== undefined) {
                return transitions[t];
            }
        }
    }

    @HostListener('mouseover') onMouseOver() {
        //this.mouseover = true;
    }

    @HostListener('mouseout') onMouseOut() {
        //this.mouseover = false;
    }

    @HostListener('click', ['$event']) onClick(event) {
        // Don't close if mouse over offcanvas
        if(this.mouseover) return;

        // Close only when user click over modal overlay
        this.renderer.setElementClass(this.el.nativeElement, 'show', false);
    }

    showOffCanvas(): void {
		document.querySelector('ng2-offcanvas.side-nav').classList.add('show');
	}

	hideOffCanvas(): void {
		document.querySelector('ng2-offcanvas.side-nav').classList.remove('show');
	}

}