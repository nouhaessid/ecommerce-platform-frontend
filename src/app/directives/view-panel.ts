import { Directive } from '@angular/core';

@Directive({
  selector: '[appViewPanel]',
  host:{
    class: "border border-gray-200 rounded-2xl p-6 bg-white"
  },
})
export class ViewPanel {
  constructor() {}
}
