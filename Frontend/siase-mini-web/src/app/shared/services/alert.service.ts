import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AlertComponent } from '../components/alerts/alert/alert.component';
import { FooterComponent } from '../components/alerts/footer/footer.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) { }

  private show(msg: string, header: string){
    this.ref = this.dialogService.open(AlertComponent, {
      data: {
        msg: msg
      },
      header: header,
      width: '20vw',
      height: '20vw',
      modal: true,
      templates: {
        footer: FooterComponent
      }
      
    });

    this.ref.onClose.subscribe(
      (data) => {
        console.log(data)
      }
    )
  }

  public presentAlertError(header: string, error: string){
    console.log(header, error)
    this.show(error, header);
  }
}
