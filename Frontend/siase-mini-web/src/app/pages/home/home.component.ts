import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from '../../shared/services/auth.service';
import { GeneralConstant } from '../../shared/general-constant';
import { LoginResponse } from '../../shared/dto/login/login-response.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, ButtonModule, AvatarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  private avatarPlaceholder = "/user-avatar-placeholder.svg"
  protected userImg: string = "";

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userImg = this.getUserImg();
  }

  protected logout() {
    this.authService.logout();
  }

  private getUserImg(){
    const userData = this.storageService.getItem(GeneralConstant.USER_DATA_KEY) as LoginResponse;
    return  userData?.foto ?? this.avatarPlaceholder;
  }
}
