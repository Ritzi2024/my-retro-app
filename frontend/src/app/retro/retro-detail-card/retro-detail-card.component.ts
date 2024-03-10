import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RETRO } from '../retro-detail/retro-detail.component';

@Component({
  selector: 'app-retro-detail-card',
  templateUrl: './retro-detail-card.component.html',
  styleUrls: ['./retro-detail-card.component.scss']
})
export class RetroDetailCardComponent {
  @Input() list: any[] = [];
  @Input() tag: RETRO = RETRO.GOOD;
  @Input() title: string = "";
  @Input() formElement: any;

  @Output() onClick = new EventEmitter<any>();
  @Output() onItemAdd = new EventEmitter<any>();

  RETRO = RETRO;

}
