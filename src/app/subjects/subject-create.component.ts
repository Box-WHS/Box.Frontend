import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './subject-create.component.html'
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
