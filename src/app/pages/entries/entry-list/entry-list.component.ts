import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components'

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component'
import { Entry } from '../shared/entry.model'
import { EntryService } from '../shared/entry.service'

@Component({
  selector: 'app-entry-list',
  templateUrl: './entry-list.component.html',
  styleUrls: ['./entry-list.component.css']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {
  override basePath = 'entries'
  tableColumns: PoTableColumn[] = [
    { label: 'Lançamento', property: 'name' },
    { label: 'Data', property: 'date', type: 'date' },
    { label: 'Descrição', property: 'description' },
    { label: 'Categoria', property: 'category.name' },
    { label: 'Valor', property: 'amount', color: this.getColorByType.bind(this) },
    {
      label: 'Status',
      property: 'paidText',
      type: 'label',
      labels: [
        { value: 'Pago', color: 'color-11', label: 'Pago' },
        { value: 'Pendente', color: 'color-07', label: 'Pendente' }
      ]
    }
  ]

  tableActions: PoTableAction[] = [
    {
      action: this.editResource.bind(this),
      label: 'Editar',
      icon: 'po-icon-edit'
    },
    {
      action: this.deleteResource.bind(this),
      icon: 'po-icon-delete',
      label: 'Excluir',
      type: 'danger'
    }
  ]

  constructor (
    private readonly entryService: EntryService,
    router: Router
  ) {
    super(entryService, router)
  }

  protected getColorByType (entry: Entry): 'color-07' | 'color-10' {
    return entry.type === 'expense' ? 'color-07' : 'color-10'
  }
}
