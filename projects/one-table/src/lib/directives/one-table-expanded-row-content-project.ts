import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[OneTableExpandedRowContentProjection]'
  })
  export class OneTableExpandedRowContentProjectDirective {
  
    constructor(public templateRef: TemplateRef<unknown>) { }
  
  }