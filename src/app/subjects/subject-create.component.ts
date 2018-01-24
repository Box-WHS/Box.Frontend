import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './subject-create.component.html',
  styles: [
    ' .button-container-outer { display: flex; justify-content: center; margin-top: 1rem; } ',
    ' .button-container-inner { display: flex; justify-content: space-between; width: 70%; } ',
    ' button { margin-right: 1rem; } ',
    ' mat-form-field { width: 95% } '
  ]
})
export class SubjectCreateComponent {

  createSubjectForm = this.formBuilder.group({
    name: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<SubjectCreateComponent>) { }

  public onSubmit(): void {
    this.dialogRef.close(this.createSubjectForm.controls.name.value);
  }

  public onAbort(): void {
    this.dialogRef.close();
  }
}
