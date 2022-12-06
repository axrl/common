import { isValue } from '@axrl/common';
import type { BaseListRequest } from "./all-items-data-source";
import type { OneTableData } from "../one-table";

export interface ActionEvent<T extends {}, Q extends BaseListRequest = BaseListRequest> {
  action: string;
  element: T | null;
  inputData: OneTableData<T, Q>;
  customEventData?: any | undefined;
}


export class ActionButton<T extends {}> {
  action: string;
  canShow: (row?: T) => boolean = () => true;
  routerLink?: (row?: T) => (string | any)[];
  iconName: string | null;

  /**
   * @param options.action     - название действия
   * @param options.canShow    - условие, при выполнении которого будет отображаться кнопка.
   *                             По умолчанию = () => true
   * @param options.routerLink - (необязательный) url, по которому необходимо перейти при клике на кнопку
   * @param options.iconName   - (необязательный) название иконки <mat-icon>, используемое для кнопки
   *                    
   */
  constructor(options: {
    action: string,
    canShow?: (row?: T) => boolean,
    routerLink?: (row?: T) => (string | any)[],
    iconName?: string | null
  }) {

    if (isValue(options.canShow)) {
      this.canShow = options.canShow;
    };
    [this.action, this.routerLink, this.iconName] = [options.action, options.routerLink, options.iconName ?? null];
  }

}