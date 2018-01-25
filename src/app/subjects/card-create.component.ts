import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './card-create.component.html',
  styles: [
    ' .button-container-outer { display: flex; justify-content: center; margin-top: 1rem; } ',
    ' .button-container-inner { display: flex; justify-content: space-between; width: 70%; } ',
    ' button { margin-right: 1rem; } ',
    ' mat-form-field { width: 95% } '
  ]
})
export class CardCreateComponent {

  createCardForm = this.formBuilder.group({
    question: ['', Validators.required],
    answer: ['', Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CardCreateComponent>) { }

  public onSubmit(): void {
    if (this.createCardForm.status !== 'VALID') {
      return;
    }
    this.dialogRef.close({ question: this.createCardForm.controls.question.value, answer: this.createCardForm.controls.answer.value });
  }

  public onAbort(): void {
    this.dialogRef.close();
  }
}
