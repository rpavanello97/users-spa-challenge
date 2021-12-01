import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertData } from '../../models/alert-data.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnInit {

  alertData: AlertData = {
    title: "Set your title",
    description: "Set your description",
    negativeButton: "Set the value",
    positiveButton: "Set the Value",
    hasNegativeButton: false,
  }

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertData,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.alertData.title = this.data.title || this.alertData.title;
      this.alertData.description = this.data.description || this.alertData.description;
      this.alertData.negativeButton = this.data.negativeButton || this.alertData.negativeButton;
      this.alertData.positiveButton = this.data.positiveButton || this.alertData.positiveButton;
      this.alertData.hasNegativeButton = this.data.hasNegativeButton || this.alertData.hasNegativeButton;
    }
  }
}
