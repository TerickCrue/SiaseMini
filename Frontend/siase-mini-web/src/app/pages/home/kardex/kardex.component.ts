import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { StorageService } from '../../../shared/services/storage.service';
import { KardexService } from '../../../shared/http/kardex.service';
import { GeneralConstant } from '../../../shared/general-constant';
import { Kardex } from '../../../shared/dto/kardex/kardex.interface';
import { KardexSubject } from '../../../shared/dto/kardex/kardex-subject.interface';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-kardex',
  imports: [CommonModule, FormsModule, TableModule, CardModule],
  templateUrl: './kardex.component.html',
  styleUrl: './kardex.component.scss'
})
export class KardexComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  protected kardex: Kardex = {
    carrera: "",
    materias: [],
    nombreAlumno: "",
    planEstudios: ""
  };
  
  protected rows: KardexSubject[] = [];
  protected opportunityColumns = [1, 2, 3, 4, 5, 6] as const;

  constructor( 
    private storageService: StorageService,
    private kardexService: KardexService
  ){
    
  }

  ngOnInit(): void {
    this.loadKardex()
  }

  protected loadKardex(){
    this.loadingSubject.next(true);

    const selectedCareer = this.storageService.getItem(GeneralConstant.USER_SELECTED_CAREER_KEY) ?? 0;
    this.kardexService.getCareerKardex(selectedCareer).subscribe({
      next: (data) => {
        this.kardex = data;
      },
      complete: () => {
        this.loadingSubject.next(false);
      }
    })
  }

  
}
