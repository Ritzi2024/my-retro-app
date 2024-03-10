import { AfterContentInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ACTION_TAG } from 'src/app/enums/dashboard';
import { IActionSheetBtn } from 'src/app/interfaces/IActionSheetBtn';

@Component({
  selector: 'app-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss']
})
export class ActionButtonComponent implements AfterContentInit{
  @Input() btns: IActionSheetBtn[] = [];
  @Input() parentIndex: number = 0;
  @ContentChild('customContent', { static: false }) customContent: any;
  showSheet: boolean = false;

  hasCustomContent: boolean = false;

  ngAfterContentInit() {
    this.hasCustomContent = !!this.customContent;
  }
}
