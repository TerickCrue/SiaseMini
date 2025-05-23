import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogComponent, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent implements OnInit, OnDestroy {

  public msg: string | undefined;

  instance: DynamicDialogComponent | undefined;

  constructor(public ref: DynamicDialogRef, private dialogService: DialogService){
    this.instance = this.dialogService.getInstance(this.ref);
  }

  ngOnInit(): void {
    if (this.instance && this.instance.data) {
      this.msg = this.instance.data['msg'];
    }
  }

    ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
    }
}
