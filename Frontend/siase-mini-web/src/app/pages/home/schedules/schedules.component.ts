import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../shared/http/schedule.service';
import { StorageService } from '../../../shared/services/storage.service';
import { GeneralConstant } from '../../../shared/general-constant';
import { LoginResponse } from '../../../shared/dto/login/login-response.interface';
import { Period } from '../../../shared/dto/schedule/period.interface';
import { UserData } from '../../../shared/dto/user/user-data.interface';
import { WeekSchedule } from '../../../shared/dto/schedule/week-schedule.interface';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from "./schedule/schedule.component";
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-schedules',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    ScheduleComponent,
    SelectModule
],
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.scss',
})
export class SchedulesComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  protected userData!: LoginResponse;
  protected userSelectedCareer!: number;

  protected careerPeriods: Period[] = [];
  protected selectedPeriod!: Period;
  protected schedule!: WeekSchedule;

  constructor(
    private scheduleService: ScheduleService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadPeriods();
  }

  private loadUserData() {
    this.userSelectedCareer = this.storageService.getItem(GeneralConstant.USER_SELECTED_CAREER_KEY) ?? 0;
    this.userData = this.storageService.getItem(GeneralConstant.USER_DATA_KEY) as UserData;
  }

  private loadPeriods() {
    this.scheduleService.getCareerSchedules(this.userSelectedCareer).subscribe({
      next: (data) => {
        this.careerPeriods = data;
        console.log(data)
      },
    });
  }

  protected onPeriodChange(){
    this.loadSchedule(this.selectedPeriod);
  }

  private loadSchedule(period: Period) {
    this.loadingSubject.next(true);
    
    return this.scheduleService.getScheduleDetail(this.userSelectedCareer, period.periodo).subscribe({
      next: (data) => {
        this.schedule = data;
        console.log(data);
      },
      complete: () => {
        this.loadingSubject.next(false)
      }
    });
  }
}
