import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PoButtonModule, PoDividerModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { CategoriesRoutingModule } from './categories-routing.module'
import { CategoryFormComponent } from './category-form/category-form.component'
import { CategoryListComponent } from './category-list/category-list.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
  declarations: [
    CategoryFormComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    PoFieldModule,
    PoPageModule,
    PoTableModule,
    PoButtonModule,
    PoDividerModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class CategoriesModule { }
