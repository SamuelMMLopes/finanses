import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components'

import { BaseResourceListComponent } from '../../../shared/components/base-resource-list/base-resource-list.component'
import { Category } from '../shared/category.model'
import { CategoryService } from '../shared/category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent extends BaseResourceListComponent<Category> {
  override basePath = 'categories'
  tableColumns: PoTableColumn[] = [
    { label: 'Categoria', property: 'name' },
    { label: 'Descrição', property: 'description' }
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
    private readonly categoryService: CategoryService,
    router: Router
  ) {
    super(categoryService, router)
  }
}
