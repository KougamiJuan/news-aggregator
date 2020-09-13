import { AfterViewInit, Directive, Host, Optional, Renderer2, Self, ViewContainerRef, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

/** Directive to customize paginator. */
@Directive({
  selector: '[appCustomizePaginator]'
})
export class CustomizePaginatorDirective implements AfterViewInit {
  /** Default value of the current page. */
  private currentPage = 1;
  /** Wildcard value for button. */
  private pageGapTxt = '...';
  /** Initial range. */
  private rangeStart: number;
  /** Final range. */
  private rangeEnd: number;
  /** All buttons. */
  private buttons = [];

  /** @ignore */
  @Input()

  get showTotalPages(): number { return this._showTotalPages; }
  set showTotalPages(value: number) { this._showTotalPages = value % 2 === 0 ? value + 1 : value; }

  /** Shows the number of buttons. */
  // tslint:disable-next-line: variable-name
  private _showTotalPages = 2;

  /**
   * Variables to create customization
   * @param matPag Component to provide navigation between paged information.
   * @param vr Represents a container where one or more views can be attached to a component.
   * @param ren Extend this base class to implement custom rendering.
   */
  constructor(
    @Host() @Self() @Optional() private readonly matPag: MatPaginator,
    private vr: ViewContainerRef,
    private ren: Renderer2
  ) {
    // Sub to rerender buttons when next page and last page is used
    this.matPag.page.subscribe((v: { pageIndex: number; }) => {
      this.switchPage(v.pageIndex);
    });
  }

  /** Create the buttons with their respective number. */
  private buildPageNumbers(): void {
    const actionContainer = this.vr.element.nativeElement.querySelector('div.mat-paginator-range-actions');
    const nextPageNode = this.vr.element.nativeElement.querySelector('button.mat-paginator-navigation-next');
    const rangeLabel = this.vr.element.nativeElement.querySelector('div.mat-paginator-range-label');

    // Remove buttons before creating new ones
    if (this.buttons.length > 0) {
      this.buttons.forEach(button => {
        this.ren.removeChild(actionContainer, button);
      });
      // Empty state array
      this.buttons.length = 0;
    }

    // Remove raange label
    if (!!rangeLabel) {
      rangeLabel.remove();
    }

    // Initialize next page and last page buttons
    if (this.buttons.length === 0) {
      const nodeArray = this.vr.element.nativeElement.childNodes[0].childNodes[0].childNodes[1].childNodes;
      setTimeout(() => {
        for (const node of nodeArray) {
          if (node.nodeName === 'BUTTON') {
            this.ren.setStyle(node, 'color', 'white');
            this.ren.setStyle(node, 'margin', '2px');
            if (node.disabled) {
              this.ren.setStyle(node, 'background-color', 'rgba(25, 118, 210, 0.6)');
            } else {
              this.ren.setStyle(node, 'background-color', 'rgba(25, 118, 210, 1)');
            }
          }
        }
      });
    }

    let dots = false;

    for (let i = 0; i < this.matPag.getNumberOfPages(); i = i + 1) {
      if (
        (i < this._showTotalPages && this.currentPage < this._showTotalPages && i > this.rangeStart) ||
        (i >= this.rangeStart && i <= this.rangeEnd)
      ) {
        this.ren.insertBefore(actionContainer, this.createButton(i, this.matPag.pageIndex), nextPageNode);
      } else {
        if (i > this.rangeEnd && !dots) {
          this.ren.insertBefore(actionContainer, this.createButton(this.pageGapTxt, this.matPag.pageIndex), nextPageNode);
          dots = true;
        }
      }
    }
  }

  /**
   * Create the certain button.
   * @param i Button index.
   * @param pageIndex Page index.
   */
  private createButton(i: any, pageIndex: number): any {
    const linkBtn = this.ren.createElement('mat-button');
    this.ren.addClass(linkBtn, 'mat-mini-fab');
    this.ren.setStyle(linkBtn, 'margin', '2px');

    const pagingTxt = isNaN(i) ? this.pageGapTxt : +(i + 1);
    const text = this.ren.createText(pagingTxt + '');

    this.ren.addClass(linkBtn, 'mat-custom-page');
    switch (i) {
      case pageIndex:
        this.ren.setAttribute(linkBtn, 'disabled', 'disabled');
        this.ren.setProperty(linkBtn, 'disabled', true);
        this.ren.setStyle(linkBtn, 'background-color', '#cecbcb');
        this.ren.setStyle(linkBtn, 'cursor', 'default');
        this.ren.setStyle(linkBtn, 'box-shadow', 'none');
        break;
      case this.pageGapTxt:
        this.ren.listen(linkBtn, 'click', () => {
          this.switchPage(this.currentPage + this._showTotalPages);
        });
        break;
      default:
        this.ren.listen(linkBtn, 'click', () => {
          this.switchPage(i);
        });
        break;
    }

    this.ren.appendChild(linkBtn, text);
    // Add button to private array for state
    this.buttons.push(linkBtn);
    return linkBtn;
  }

  /**
   * Method to know the range of buttons.
   */
  private initPageRange(): void {
    this.rangeStart = this.currentPage - this._showTotalPages / 2;
    this.rangeEnd = this.currentPage + this._showTotalPages / 2;
    this.buildPageNumbers();
  }

  /**
   * Method to switch pages
   * @param i Page number index.
   */
  private switchPage(i: number): void {
    this.currentPage = i;
    this.matPag.pageIndex = i;
    this.initPageRange();
  }

  /**
   * Method for making changes after customizer is created.
   */
  ngAfterViewInit(): void {
    this.initPageRange();
  }

}
