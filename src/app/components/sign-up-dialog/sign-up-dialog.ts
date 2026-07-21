import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


  export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        ...confirmPassword.errors,
        passwordMismatch: true,
      });

      return { passwordMismatch: true };
    }

    if (confirmPassword.hasError('passwordMismatch')) {
      const errors = { ...confirmPassword.errors };
      delete errors['passwordMismatch'];

      confirmPassword.setErrors(Object.keys(errors).length ? errors : null);
    }

    return null;
  };

@Component({
  selector: 'app-sign-up-dialog',
  imports: [MatIcon, MatFormField, MatInput, MatPrefix, MatSuffix, MatButton, MatIconButton, ReactiveFormsModule, MatDialogClose, MatError],
  templateUrl: './sign-up-dialog.html',
  styleUrl: './sign-up-dialog.scss',
})

export class SignUpDialog {

  store = inject(EcommerceStore)
  fb = inject(NonNullableFormBuilder)

  signUpForm = this.fb.group(
  {
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
      ],
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],

    confirmPassword: [
      '',
      [
        Validators.required,
      ],
    ],
  },
  {
    validators: passwordMatchValidator,
  }
);

  passwordVisible = signal(false)
  ConfirmPasswordVisible = signal(false)

  data = inject<{checkout: boolean}>(MAT_DIALOG_DATA)
  dialogRef = inject(MatDialogRef)
  matDialog = inject(MatDialog)

  signUp(){
    if (!this.signUpForm.valid){
      this.signUpForm.markAllAsTouched();
      return;}
    const {name, email, password} = this.signUpForm.value;
    this.store.signUp({name, email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id} as SignUpParams)
  }

  openSignInDialog(){
    this.dialogRef.close();
    this.matDialog.open(SignInDialog,{
      disableClose: true,
      data: {
        checkout : this.data?.checkout
      }
    })
  }
}
