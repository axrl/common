import { Directive, EventEmitter, HostListener, Input, Output, ElementRef } from '@angular/core';
import type { OnDestroy } from '@angular/core';
import type { BehaviorSubject } from 'rxjs';
import type { BaseListRequest, CountAndRows } from '../models';
import { isValue } from '@axrl/common';

@Directive({
  selector: '[appCmkTableKeyboardListener]'
})
export class CmkTableKeyboardListenerDirective<T extends {}, Q extends BaseListRequest> implements OnDestroy {
  @Input() dataSourceTrigger: BehaviorSubject<Q> | undefined;
  @Input() sourceData: CountAndRows<T> | null | undefined;
  @Input() selectedItemIndexSubject: BehaviorSubject<number | null> | undefined;
  @Input() isInnerTable: boolean = false;
  @Output() spaceEvent: EventEmitter<T> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  eventHandlerMatcher() {
    const tables = document.querySelectorAll('table');
    const lastTableIndex = tables.length - 1;
    return tables[lastTableIndex] && tables[lastTableIndex].id == this.elementRef.nativeElement.id;
  }

  @HostListener('window:keyup.escape') async onEscapeHandler() {
    if (
      this.eventHandlerMatcher()
    ) {
      this.selectedItemIndexSubject?.next(null);
    };
  }

  @HostListener('window:keyup.space') async onEnterHandler() {
    if (
      this.eventHandlerMatcher() &&
      isValue(this.sourceData) &&
      isValue(this.selectedItemIndexSubject) && isValue(this.selectedItemIndexSubject.value)
    ) {
      this.spaceEvent.emit(
        this.sourceData.Rows[this.selectedItemIndexSubject.value]
      );
    };
  }

  @HostListener('window:keyup.arrowup', ['"up"'])
  @HostListener('window:keyup.arrowdown', ['"down"'])
  async onArrowHandler(arrow: 'up' | 'down') {
    if (
      this.eventHandlerMatcher() &&
      isValue(this.sourceData) &&
      isValue(this.dataSourceTrigger) &&
      isValue(this.selectedItemIndexSubject) && isValue(this.selectedItemIndexSubject.value)
    ) {
      const value = this.dataSourceTrigger.value;
      if (arrow == 'down') {
        if (this.selectedItemIndexSubject.value == (+value.Next - 1) && this.sourceData.Count > (+value.Next + value.Offset)) {
          this.selectedItemIndexSubject.next(0);
          value.Offset = value.Offset + value.Next;
          this.dataSourceTrigger?.next(value);
        } else {
          const newIndex = [undefined, this.sourceData.Count - 1 - value.Offset].includes(this.selectedItemIndexSubject.value!) ? 0 : this.selectedItemIndexSubject.value! + 1;
          this.selectedItemIndexSubject.next(newIndex);
        };
      } else {
        if (this.selectedItemIndexSubject.value == 0 && +value.Offset > 0) {
          value.Offset = value.Offset - value.Next;
          this.dataSourceTrigger?.next(value);
        };
        const newIndex = [undefined, 0].includes(this.selectedItemIndexSubject.value!) ?
          this.sourceData.Count > (((value.Offset / value.Next) + 1) * value.Next) ?
            value.Next - 1 :
            this.sourceData.Count - 1 - value.Offset :
          this.selectedItemIndexSubject.value! - 1;
        this.selectedItemIndexSubject.next(newIndex);
      };
    };
  }

  ngOnDestroy() {
    this.spaceEvent.complete();
    this.dataSourceTrigger?.complete();
  }

}
