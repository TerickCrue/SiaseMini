import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  menuItems: MenuItem[] = [
    {
      label: 'Inicio',
      routerLink: '/home/dashboard'
    },
    {
      label: 'Carreras',
      routerLink: '/home/careers'
    },
    {
      label: 'Horarios',
      routerLink: '/home/schedules'
    },
    {
      label: 'Kardex',
      routerLink: '/home/kardex'
    },
    {
      label: 'Calificaciones',
      routerLink: '/home/grades'
    },
    {
      label: 'AFIs',
      routerLink: '/home/afis'
    }
  ];
}
