import { Component, Injector } from '@angular/core'
import { Validators } from '@angular/forms'
import { PoNotificationService } from '@po-ui/ng-components'

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component'
import { Category } from '../shared/category.model'
import { CategoryService } from '../shared/category.service'

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent extends BaseResourceFormComponent<Category> {
  override basePath = '/categories'
  constructor (
    protected categoryService: CategoryService,
    protected override injector: Injector,
    protected override notificationService: PoNotificationService
  ) {
    super(injector, new Category(), categoryService, Category.fromJson, notificationService)
  }

  protected buildResourceForm (): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, Validators.compose([Validators.required, Validators.minLength(2)])],
      description: [null]
    })
  }

  protected override creationPageTitle (): string {
    return 'Cadastro de Nova Categoria'
  }

  protected override editionPageTitle (): string {
    const categoryName = this.resource.name ?? ''
    return 'Editando Categoria: ' + categoryName
  }
}
