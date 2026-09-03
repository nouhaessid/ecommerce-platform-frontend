import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-confirm-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './admin-confirm-dialog.html',
  styleUrl: './admin-confirm-dialog.scss',
})
export default class AdminConfirmDialog {

  data = inject(MAT_DIALOG_DATA) as {
    title: string;
    message: string;
    confirmText: string;
  };

  private dialogRef = inject(MatDialogRef<AdminConfirmDialog>);

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}