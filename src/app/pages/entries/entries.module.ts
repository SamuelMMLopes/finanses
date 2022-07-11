import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { EntriesRoutingModule } from './entries-routing.module'
import { EntryListComponent } from './entry-list/entry-list.component'
import { EntryFormComponent } from './entry-form/entry-form.component'
import { SharedModule } from '../../shared/shared.module'
import { PoButtonGroupModule, PoButtonModule, PoDividerModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components'

@NgModule({
  declarations: [
    EntryListComponent,
    EntryFormComponent
  ],
  imports: [
    CommonModule,
    EntriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PoPageModule,
    PoTableModule,
    PoButtonModule,
    PoDividerModule,
    PoFieldModule,
    PoButtonGroupModule
  ]
})
export class EntriesModule { }
