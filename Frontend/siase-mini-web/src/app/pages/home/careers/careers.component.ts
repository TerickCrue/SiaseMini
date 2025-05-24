import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule } from 'primeng/accordion';
import { CardModule } from 'primeng/card';
import { Career } from '../../../shared/dto/career/career.interface';
import { CareerService } from '../../../shared/http/career.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [CommonModule, AccordionModule, CardModule, ButtonModule],
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss']
})
export class CareersComponent implements OnInit {
  careers: Career[] = [];
  loading: boolean = true;

  constructor(private careerService: CareerService) {}

  ngOnInit() {
    this.loadCareers();
  }

  loadCareers() {
    this.loading = true;
    this.careerService.getUserCareers().subscribe({
      next: (careers) => {
        this.careers = careers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading careers:', error);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
        this.getCareerDetails();
      }
    });
  }

getCareerDetails() {
  this.careers.forEach((career, index) => {
    this.careerService.getCareerDetail(index).subscribe({
      next: (data) => {
        career.careerDetail = data;
      },
      error: (error) => {
        console.error(`Error loading details for career at index ${index}:`, error);
      }
    });
  });
}
}
