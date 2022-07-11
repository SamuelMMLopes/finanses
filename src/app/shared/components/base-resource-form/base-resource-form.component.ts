import { OnInit, AfterContentChecked, Injector, Directive } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { switchMap } from 'rxjs/operators'
import { PoNotificationService } from '@po-ui/ng-components'
import { FormBuilder, FormGroup } from '@angular/forms'

import { BaseResourceModel } from '../../models/base-resource.model'
import { BaseResourceService } from '../../services/base-resource.service'

@Directive()
export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {
  currentAction!: 'create' | 'edit'
  pageTitle!: string
  resourceForm!: FormGroup
  submittingForm: boolean = false
  abstract basePath: string
  protected route: ActivatedRoute
  protected router: Router
  protected formBuilder: FormBuilder

  constructor (
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData: any) => T,
    protected notificationService: PoNotificationService
  ) {
    this.route = this.injector.get(ActivatedRoute)
    this.router = this.injector.get(Router)
    this.formBuilder = this.injector.get(FormBuilder)
  }

  ngOnInit (): void {
    this.setCurrentAction()
    this.buildResourceForm()
    this.loadResource()
  }

  ngAfterContentChecked (): void {
    this.setPageTitle()
  }

  submitForm (): void {
    this.submittingForm = true
    if (this.currentAction === 'create') {
      this.createResource()
    } else {
      this.updateResource()
    }
  }

  protected setCurrentAction (): void {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'create'
    } else {
      this.currentAction = 'edit'
    }
  }

  protected loadResource (): void {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(Number(params.get('id'))))).subscribe({
        next: (resource) => {
          this.resource = resource
          this.resourceForm.patchValue(resource)
        },
        error: () => this.actionsForError()
      })
    }
  }

  protected setPageTitle (): void {
    if (this.currentAction === 'create') { this.pageTitle = this.creationPageTitle() } else {
      this.pageTitle = this.editionPageTitle()
    }
  }

  protected creationPageTitle (): string {
    return 'Novo'
  }

  protected editionPageTitle (): string {
    return 'Edição'
  }

  protected createResource (): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)
    this.resourceService.create(resource).subscribe(
      {
        next: (resource) => this.actionsForSuccess(resource),
        error: () => this.actionsForError()
      }
    )
  }

  protected updateResource (): void {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value)
    this.resourceService.update(resource).subscribe(
      {
        next: (resource) => this.actionsForSuccess(resource),
        error: () => this.actionsForError()
      }
    )
  }

  protected actionsForSuccess (resource: T): void {
    this.notificationService.success('Solicitação processada com sucesso!')
    this.router.navigateByUrl(this.basePath)
  }

  protected actionsForError (): void {
    this.notificationService.success('Ocorreu um erro ao processar a sua solicitação!')
    this.submittingForm = false
  }

  protected abstract buildResourceForm (): void
}
