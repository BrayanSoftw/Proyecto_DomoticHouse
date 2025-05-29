import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule, // 📌 Para la barra superior
    MatCardModule, // 📌 Para los paneles de control
    MatIconModule, // 📌 Para los íconos
    MatButtonModule, // 📌 Para los botones
  ],
})
export class DashboardComponent {}