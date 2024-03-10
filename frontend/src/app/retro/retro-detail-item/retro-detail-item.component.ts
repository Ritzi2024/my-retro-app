import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RETRO } from '../retro-detail/retro-detail.component';
import { ACTION_TAG } from 'src/app/enums/dashboard';
import { IActionSheetBtn } from 'src/app/interfaces/IActionSheetBtn';

@Component({
  selector: 'app-retro-detail-item',
  templateUrl: './retro-detail-item.component.html',
  styleUrls: ['./retro-detail-item.component.scss']
})
export class RetroDetailItemComponent implements OnInit{
  ngOnInit(): void {
    switch(this.tag){
      case RETRO.GOOD:
      case RETRO.OK:
        this.btns = [
          {title: "Delete", icon:"delete", type: ACTION_TAG.delete, click:()=>{} },
          {title: "Edit", icon:"edit", type: ACTION_TAG.edit, click:()=>{} },
        ];
        break;
      case RETRO.ACTIONS:
        this.btns = [
          {title: "Delete", icon:"delete", type: ACTION_TAG.delete, click:()=>{} },
          {title: "Edit", icon:"edit", type: ACTION_TAG.edit, click:()=>{} },
          {title: "Attach a todo", icon:"add_task", type: ACTION_TAG.create_todo, click:()=>{}},
          {title: "Open todo", icon:"open_in_new", type: ACTION_TAG.open_todo, click:()=>{}},
        ];
        break;
    }

    this.btns.forEach(btn => btn.click = ($ev: any, event: IActionSheetBtn)=> {
      $ev.stopPropagation();
      this.onClick.emit({type: event.type, index: this.index, tag: this.tag});
    })
  }
  @Input() index: number = 0;
  @Input() item: any;
  @Input() tag: RETRO | undefined;
  @Output() onClick = new EventEmitter<any>();

  btns: IActionSheetBtn[] = [];

}
