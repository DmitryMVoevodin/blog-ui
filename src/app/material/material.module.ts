import { NgModule } from '@angular/core';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule
} from '@angular/material';

const material = [
  MatBadgeModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatExpansionModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
];

@NgModule({
  declarations: [],
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
