import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTextPopupComponent } from '../edit-text-popup/edit-text-popup.component';
import { RetroService } from '../retro-list/retro-service.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawer } from '@angular/material/sidenav';
import IRetro, { IAction } from 'src/app/interfaces/IRetro';
import { ACTION_TAG } from 'src/app/enums/dashboard';

export enum RETRO {
  GOOD,
  OK,
  ACTIONS
}

@Component({
  selector: 'app-retro-detail',
  templateUrl: './retro-detail.component.html',
  styleUrls: ['./retro-detail.component.scss'],
})
export class RetroDetailComponent implements OnInit {
  constructor(public dialog: MatDialog, private service: RetroService, private route: ActivatedRoute, private _snackBar: MatSnackBar) { }

  selectedTaskId: string | undefined;
  selectedTaskTitle: string | undefined;
  @ViewChild(MatDrawer, { static: true }) drawer!: MatDrawer;

  goodList: string[] = [];
  okList: string[] = [];
  actionList: IAction[] = [];
  RETRO = RETRO;
  id?: string | null = null;
  loadData$ =
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        let id = params.get('id') && params.get('id') !== "today" ? params.get('id') : null;
        // if (id === "0") {
        //   id = null;
        // }
        return this.service.getRetro(id);
      })
    );

  form = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    good: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    ok: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    action: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
  });

  ngOnInit(): void {
    this.loadData$.subscribe(data => {
      if (data) {
        const retro = { ...data };
        this.title?.setValue(retro.title);
        this.goodList = [...retro.good];
        this.okList = [...retro.ok];
        this.actionList = [...retro.actions];
      }
    });
  }

  get title() {
    return this.form.get('title');
  }

  get good() {
    return this.form.get('good');
  }

  get ok() {
    return this.form.get('ok');
  }

  get action() {
    return this.form.get('action');
  }

  saveForm() {
    console.log({
      title: this.title,
      good: this.goodList,
      ok: this.okList,
      actions: this.actionList
    })

    let api$;
    if (this.id) {
      api$ = this.service.updateRetro(this.id, {
        title: this.title?.value,
        good: this.goodList,
        ok: this.okList,
        actions: this.actionList
      } as IRetro);
    } else {
      api$ = this.service.saveTodo({
        title: this.title?.value,
        date: new Date().toISOString(),
        good: this.goodList,
        ok: this.okList,
        actions: this.actionList
      } as IRetro);
    }

    api$.subscribe(data => {
      console.log(data);
      this.openSnackBar("Saved", "success");
    });

  }

  openSnackBar(message: string, className?: string) {
    this._snackBar.open(message, "Close", {duration: 1000, panelClass: className});
  }

  onClickHandler(event: { type: ACTION_TAG, index: number, tag: RETRO }) {
    const { type, index, tag } = event;
    switch (type) {
      case ACTION_TAG.delete:
        this.removeItem(index, tag);
        break;
      case ACTION_TAG.edit:
        this.edititem(index, tag);
        break;
      case ACTION_TAG.create_todo:
        this.attachTodoWithitem(this.actionList[index]);
        break;
      case ACTION_TAG.open_todo:
        this.showAttachedTodoWithitem(this.actionList[index]);
    }
  }

  removeItem(index: number, type: RETRO) {
    switch (type) {
      case RETRO.GOOD:
        this.goodList.splice(index, 1);
        break;
      case RETRO.OK:
        this.okList.splice(index, 1);
        break;
    }
  }

  attachTodoWithitem(item: IAction) {
    // show popup if you wana attach

    // create a basic todo and open in side panel
    this.showAttachedTodoWithitem(item);
  }

  showAttachedTodoWithitem(item: IAction) {
    this.selectedTaskId = item.taskId;
    this.selectedTaskTitle = item.title;
    this.drawer.open();
  }

  edititem(index: number, type: RETRO) {
    let text = '';
    switch (type) {
      case RETRO.GOOD:
        text = this.goodList[index];
        break;
      case RETRO.OK:
        text = this.okList[index];
        break;
        case RETRO.ACTIONS:
          text = this.actionList[index].title;
          break;
    }

    const dialogRef = this.dialog.open(EditTextPopupComponent, {
      width: '50%',
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (!result) {
        return;
      }
      switch (type) {
        case RETRO.GOOD:
          this.goodList[index] = result;
          break;
        case RETRO.OK:
          this.okList[index] = result;
          break;
          case RETRO.ACTIONS:
            this.actionList[index].title = result;
            break;
      }
    });
  }

  onEnter(event: Event, tag: RETRO) {
    const { id, value } = (event.target as HTMLInputElement);
    if (tag === RETRO.GOOD) {
      this.goodList.push(value);
      this.good?.setValue('');
    } else if (tag === RETRO.OK){
      this.okList.push(value);
      this.ok?.setValue('');
    } else{
      this.actionList.push({title: value, taskId: ''});
      this.action?.setValue('');
    }
  }
}
