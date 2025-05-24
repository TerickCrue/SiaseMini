import { Component, OnInit } from '@angular/core';
import { AfiService } from '../../../../shared/http/afi.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { GeneralConstant } from '../../../../shared/general-constant';
import { getMonths, getValoresUnicos } from '../../../../shared/utils';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarAfi } from '../../../../shared/dto/afi/calendar-afi.interface';

@Component({
  selector: 'app-calendar',
  imports: [ CommonModule, FormsModule, CardModule, TableModule, ButtonModule, SelectModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {

  private selectedCareer!: number;
  protected monthSelector = getMonths();
  protected selectedMonth!: { number: number; name: string };
  protected afis: CalendarAfi[] = [];
  protected areaSelector: string[] = [];
  protected organizadorSelector: string[] = [];
  
  constructor(
    private afiService: AfiService,
    private storageService: StorageService
  ){

  }

  ngOnInit(): void {
    this.selectedCareer = this.storageService.getItem(GeneralConstant.USER_SELECTED_CAREER_KEY) ?? 0;
  }

  private loadAfiCalendar(month: number){
    this.afiService.getCareerAfis(this.selectedCareer, month).subscribe({
      next: (data) => {
        this.afis = data;
        console.log(data)
      },
      complete: () => {
        this.areaSelector = getValoresUnicos(this.afis, 'area');
        this.organizadorSelector = getValoresUnicos(this.afis, 'organizador');
      }
    })
  }

  protected onMonthChange(){
    this.loadAfiCalendar(this.selectedMonth.number);
  }

}
