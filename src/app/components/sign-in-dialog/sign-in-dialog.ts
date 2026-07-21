import { Component, inject, signal } from '@angular/core';
import { MatIconButton, MatButton } from "@angular/material/button";
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog'
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field'
import { MatInput } from '@angular/material/input'
import { EcommerceStore } from '../../ecommerce-store';
import { SignInParams } from '../../models/user';
import { SignUpDialog } from '../sign-up-dialog/sign-up-dialog';
import Checkout from '../../pages/checkout/checkout';


@Component({
  selector: 'app-sign-in-dialog',
  imports: [MatIconButton, MatIcon, MatDialogClose, MatFormField, MatInput, MatSuffix, MatPrefix, MatButton, ReactiveFormsModule, MatError],
  templateUrl: './sign-in-dialog.html',
  styleUrl: './sign-in-dialog.scss',
})
export class SignInDialog {

  store = inject(EcommerceStore)
  fb = inject(NonNullableFormBuilder)

  data = inject<{checkout: boolean}>(MAT_DIALOG_DATA)

  dialogRef = inject(MatDialogRef)

  matDialog = inject(MatDialog)


  signInForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ]
  });

  passwordVisible = signal(false)

  signIn(){
    if (!this.signInForm.valid){
      this.signInForm.markAllAsTouched();
      return;}

    const {email, password} = this.signInForm.value;
    this.store.signIn({email, password, checkout: this.data?.checkout, dialogId: this.dialogRef.id} as SignInParams)
  }
  openSignUpDialog(){
    this.dialogRef.close()
    this.matDialog.open(SignUpDialog, {
      disableClose: true,
      data: {
        checkout: this.data?.checkout
      }
    })
    
  }
}
