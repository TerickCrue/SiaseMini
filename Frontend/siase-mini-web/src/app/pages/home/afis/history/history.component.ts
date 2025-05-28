import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { AfiService } from '../../../../shared/http/afi.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { GeneralConstant } from '../../../../shared/general-constant';
import { AfiHistory } from '../../../../shared/dto/afi/afi-history.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-history',
  imports: [CommonModule, FormsModule, TableModule, SelectModule, ButtonModule, CardModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private selectedCareer!: number;
  protected afiHistory: AfiHistory = {
    completadas: 0,
    total: 0,
    afis: []
  };

  constructor(
    private afiService: AfiService,
    private storageService: StorageService
  ){

  }

  ngOnInit(): void {
    this.selectedCareer = this.storageService.getItem(GeneralConstant.USER_SELECTED_CAREER_KEY) ?? 0;
    this.loadAfisHistory()
  }

  private loadAfisHistory(){
    this.loadingSubject.next(true);

    this.afiService.getAfisHistory(this.selectedCareer).subscribe({
      next: (data) => {
        this.afiHistory = data;
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    })
  }

  rowClass(afi: any) {
    if(afi.asistencia && afi.eventoOficial){
      return "greenRow"
    }

    return "";
  }
}
