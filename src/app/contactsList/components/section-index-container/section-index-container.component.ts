import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { GroupByPipe } from "../../../core/pipes/group-by.pipe";
import { SortPipe } from "../../../core/pipes/sort.pipe";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollToElementDirective } from '../../../core/directives/scroll-to-element.directive';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { CheckTouchPositionOnElementService } from '../../../core/services/check-touch-position-on-element.service';
import { ScrollContainerBtnDirective } from '../../../core/directives/scroll-container-btn.directive';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-section-index-container',
    standalone: true,
    templateUrl: './section-index-container.component.html',
    styleUrl: './section-index-container.component.scss',
    imports: [GroupByPipe, SortPipe, FontAwesomeModule, ScrollToElementDirective, FontAwesomeModule, ScrollContainerBtnDirective, NgClass]
})
export class SectionIndexContainerComponent implements AfterViewInit {

  isMouseDown: boolean = false
  sectionIdPrefix = "sectionContactIndex"
  overflowList: boolean = false
  private touchCord = {
    x: 0,
    y: 0
  }

  private _icon = {
    faChevronDown: faChevronDown,
    faChevronUp: faChevronUp
  }

  private _cdServ = inject(ChangeDetectorRef)
  private _chechTouchPosServ = inject(CheckTouchPositionOnElementService)

  @Input({required: true, alias: 'data'}) arrayOfKey: any[] =[]
  @ViewChildren(ScrollToElementDirective) buttonsOfIndex!: QueryList<ScrollToElementDirective>
  @ViewChildren(ScrollContainerBtnDirective) buttonsOfScroll!: QueryList<ScrollContainerBtnDirective>
  @ViewChild('listContainer') listContainer !: ElementRef<HTMLDivElement>

  ngAfterViewInit(): void {
    this.overflowList = this.listContainer.nativeElement.scrollHeight > this.listContainer.nativeElement.clientHeight
    this._cdServ.detectChanges()
  }

  get icon(){
    return this._icon
  }

  elementIsInFocus(){
    this.isMouseDown = true
  }

  elementIsBlur(){
    this.isMouseDown = false
  }

  elementIsBlurTouch(): void{
    this.elementIsBlur()
    this.buttonsOfScroll.forEach(el=>{
      if(this._chechTouchPosServ.touchInArea(el.elementRef.nativeElement, {xCord: this.touchCord.x, yCord: this.touchCord.y})){
        el.clearScrollInterval()
      }
    })
  }


  onTouchMove(event: TouchEvent): void{
    event.preventDefault()
      this.touchCord.x =  event.targetTouches[0].clientX
      this.touchCord.y =  event.targetTouches[0].clientY
      if(this._chechTouchPosServ.touchInYArea(this.listContainer.nativeElement, this.touchCord.y)){
        this.buttonsOfIndex.forEach(el=>{
          if(this._chechTouchPosServ.touchInArea(el.elementRef.nativeElement, {xCord: this.touchCord.x, yCord: this.touchCord.y})){
            el.goToElement()
          }
        })
      }
      this.buttonsOfScroll.forEach(el=>{
        el.clearScrollInterval()
        if(this._chechTouchPosServ.touchInArea(el.elementRef.nativeElement, {xCord: this.touchCord.x, yCord: this.touchCord.y})){
          el.onScroll()
        }
      })
  }
}
