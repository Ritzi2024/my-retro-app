import { Component, Input } from '@angular/core';
import { RetroService } from './retro-service.service';
import IRetro from 'src/app/interfaces/IRetro';

@Component({
  selector: 'app-retro-list',
  templateUrl: './retro-list.component.html',
  styleUrls: ['./retro-list.component.scss']
})
export class RetroListComponent {
  @Input() retro: IRetro | undefined;

  constructor(private service: RetroService){}

  retros$ = this.service.getRetros();
}
