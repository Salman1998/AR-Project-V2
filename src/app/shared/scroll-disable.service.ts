import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  disableScroll() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  enableScroll() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
