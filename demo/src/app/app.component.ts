import { Component } from '@angular/core';
import { Ng2Offcanvas } from '../../../lib/ng2-offcanvas';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [Ng2Offcanvas]
})
export class AppComponent {
	title = 'app works!';
	mouseover: boolean = false;
	transitionEndEvent: any;

	ngOnInit() { }

	constructor(private Ng2Offcanvas: Ng2Offcanvas) { }

	showSideCanvas(): void {
		//document.querySelector('ng2-offcanvas.side-nav').classList.add('show');
		this.Ng2Offcanvas.showOffCanvas();

		setTimeout(() => {
			this.Ng2Offcanvas.hideOffCanvas();
		}, 3000);
	}

}