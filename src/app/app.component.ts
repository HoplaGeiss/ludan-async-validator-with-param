import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CatValidator } from './cat-validator';

@Component({
  selector: 'app-root',
  styleUrls: ['app.component.scss'],
  template: ` <h1>Name your cat</h1>
    <form [formGroup]="form">
      <mat-form-field appearance="standard">
        <mat-label>Name</mat-label>
        <input matInput formControlName="name" />
      </mat-form-field>
      <div class="error-messages">
        <div *ngIf="name.errors && name.errors.duplicateError">This name already exists</div>
      </div>

      <button
        type="submit"
        mat-raised-button
        color="primary"
        aria-label="Save"
        [disabled]="!form.valid"
      >
        Save
      </button>
    </form>`
})
export class AppComponent {
  form: FormGroup;
  allowedIds = ['2', '1'];

  constructor(private fb: FormBuilder, private catValidator: CatValidator) {
    this.form = this.fb.group({
      name: ['', [Validators.required], [this.catValidator.validate(this.allowedIds)]]
    });
  }

  get name() {
    return this.form.get('name');
  }
}
