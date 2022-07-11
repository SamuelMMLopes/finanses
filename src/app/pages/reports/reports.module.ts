import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { ReportsRoutingModule } from './reports-routing.module'
import { ReportsComponent } from './reports/reports.component'
import { PoDividerModule, PoFieldModule, PoPageModule, PoWidgetModule } from '@po-ui/ng-components'

@NgModule({
  declarations: [
    ReportsComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    PoPageModule,
    PoFieldModule,
    PoWidgetModule,
    PoDividerModule
  ]
})
export class ReportsModule { }
