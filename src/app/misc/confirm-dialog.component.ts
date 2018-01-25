import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {

  public static open(dialog: MatDialog, title: string, content: string, noLabel = 'Nein', yesLabel = 'Ja', yesLabelWarn = false): Observable<any> {
    const ref = dialog.open(ConfirmDialogComponent, {
      data: { title: title, content: content, noLabel: noLabel, yesLabel: yesLabel, yesLabelWarn: yesLabelWarn }
    });

    return ref.afterClosed();
  }

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onClose(value: boolean): void {
    this.dialogRef.close(value);
  }
}
