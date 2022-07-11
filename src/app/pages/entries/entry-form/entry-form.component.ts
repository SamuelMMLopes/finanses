import { Component, OnInit, Injector } from '@angular/core'
import { Validators } from '@angular/forms'

import { BaseResourceFormComponent } from '../../../shared/components/base-resource-form/base-resource-form.component'
import { Entry } from '../shared/entry.model'
import { EntryService } from '../shared/entry.service'
import { Category } from '../../categories/shared/category.model'
import { CategoryService } from '../../categories/shared/category.service'
import { PoComboOption, PoNotificationService, PoRadioGroupOption } from '@po-ui/ng-components'

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.css']
})
export class EntryFormComponent extends BaseResourceFormComponent<Entry> implements OnInit {
  override basePath = '/entries'
  categories!: Category[]
  situations: PoRadioGroupOption[] = [
    {
      label: 'Pago',
      value: 'true'
    },
    {
      label: 'Pendente',
      value: 'false'
    }
  ]

  categoriesOptions: PoComboOption[] = []

  constructor (
    protected entryService: EntryService,
    protected categoryService: CategoryService,
    protected override injector: Injector,
    protected override notificationService: PoNotificationService
  ) {
    super(injector, new Entry(), entryService, Entry.fromJson, notificationService)
  }

  override ngOnInit (): void {
    this.loadCategories()
    super.ngOnInit()
  }

  override ngAfterContentChecked (): void {
    if (this.categories?.length > 0) {
      this.categoriesOptions = this.categories.map(category => ({
        label: category.name ?? '',
        value: category.id ?? 0
      }))
    }
    super.ngAfterContentChecked()
  }

  get typeOptions (): PoComboOption[] {
    const options: PoComboOption[] = []
    for (const [value, text] of Object.entries(Entry.types)) {
      options.push({ label: text, value })
    }
    return options
  }

  protected buildResourceForm (): void {
    this.resourceForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null],
      type: ['expense', [Validators.required]],
      amount: [null, [Validators.required]],
      date: [null, [Validators.required]],
      paid: [true, [Validators.required]],
      categoryId: [null, [Validators.required]]
    })
  }

  protected loadCategories (): void {
    this.categoryService.getAll().subscribe({
      next: (categories) => { this.categories = categories }
    })
  }

  protected override creationPageTitle (): string {
    return 'Cadastro de Novo Lançamento'
  }

  protected override editionPageTitle (): string {
    const resourceName = this.resource.name ?? ''
    return 'Editando Lançamento: ' + resourceName
  }
}
