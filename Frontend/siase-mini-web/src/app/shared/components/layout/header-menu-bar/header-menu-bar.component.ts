import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StorageService } from '../../../services/storage.service';
import { AuthService } from '../../../services/auth.service';
import { GeneralConstant } from '../../../general-constant';
import { LoginResponse } from '../../../dto/login/login-response.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Career } from '../../../dto/career/career.interface';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-header-menu-bar',
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    SelectModule,
    DrawerModule,
    DividerModule
  ],
  templateUrl: './header-menu-bar.component.html',
  styleUrl: './header-menu-bar.component.scss',
})
export class HeaderMenuBarComponent {
  menuItems: MenuItem[] = [
    // {
    //   label: 'Inicio',
    //   routerLink: '/home/dashboard',
    // },
    {
      label: 'Carreras',
      routerLink: '/home/careers',
    },
    {
      label: 'Horarios',
      routerLink: '/home/schedules',
    },
    {
      label: 'Kardex',
      routerLink: '/home/kardex',
    },
    // {
    //   label: 'Calificaciones',
    //   routerLink: '/home/grades',
    // },
    {
      label: 'AFIs',
      items: [
        {
          label: 'Calendario',
          routerLink: '/home/afis/calendar'
        },
        {
          label: 'Historial',
          routerLink: '/home/afis/history'
        }
      ]
    },
  ];

  protected userData!: LoginResponse;
  protected selectedCareer!: Career;
  protected isSettingsVisible: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userData = this.getUserData();
    this.setUserCareer(this.userData);
  }

  protected logout() {
    this.authService.logout();
  }

  private getUserData() {
    const userData = this.storageService.getItem(
      GeneralConstant.USER_DATA_KEY
    ) as LoginResponse;

    return userData;
  }

  protected toggleSettingsDrawer(){
    this.isSettingsVisible = !this.isSettingsVisible;
  }

  protected setUserCareer(userData: LoginResponse){
    const lastCareerIndex = this.storageService.getItem(GeneralConstant.USER_SELECTED_CAREER_KEY);

    if(lastCareerIndex == null){
      const index = (userData.carreras.length - 1);
      this.selectedCareer = userData.carreras[index];
      this.storageService.setItem(GeneralConstant.USER_SELECTED_CAREER_KEY, index);
    }

    this.selectedCareer = userData.carreras[lastCareerIndex];
  }

  protected onCareerChange(){
    const careerIndex = this.userData.carreras.indexOf(this.selectedCareer);
    this.storageService.setItem(GeneralConstant.USER_SELECTED_CAREER_KEY, careerIndex)
    location.reload();
  }
}
