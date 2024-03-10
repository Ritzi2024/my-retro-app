import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-text-popup',
  templateUrl: './edit-text-popup.component.html',
  styleUrls: ['./edit-text-popup.component.scss']
})
export class EditTextPopupComponent {

  constructor(
    public dialogRef: MatDialogRef<EditTextPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public text: string) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
