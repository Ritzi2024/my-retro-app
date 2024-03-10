import { Component, Input } from '@angular/core';
import IDashboardCount from '../../interfaces/IDashboardCount';

@Component({
  selector: 'app-dashboard-count-card',
  templateUrl: './dashboard-count-card.component.html',
  styleUrls: ['./dashboard-count-card.component.scss']
})
export class DashboardCountCardComponent {
  @Input() item: IDashboardCount | undefined;
  showTooltip = false;

  get toolTipText(): string{
    // return `<div>
    //   <div> Total todos - ${this.item?.count}</div>
    //   <div> Completed todos - ${this.item?.count || 0} - ${this.item?.activeCount || 0}</div>
    //   </div>`
    const completedTodos = (this.item?.count || 0) - (this.item?.activeCount || 0);
    return `Total - ${this.item?.count} \n Completed - ${completedTodos}`;
  }
}
