import { OnInit, Directive } from '@angular/core'
import { Router } from '@angular/router'

import { BaseResourceModel } from '../../models/base-resource.model'
import { BaseResourceService } from '../../services/base-resource.service'

@Directive()
export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {
  resources: T[] = []
  basePath = ''

  constructor (
    private readonly resourceService: BaseResourceService<T>,
    private readonly router: Router
  ) { }

  ngOnInit (): void {
    this.resourceService.getAll().subscribe({
      next: (resources) => {
        this.resources = resources
      },
      error: () => alert('Erro ao carregar a lista')
    }
    )
  }

  deleteResource (resource: T): void {
    const mustDelete = confirm('Deseja realmente excluir este item?')
    if (mustDelete && resource.id !== undefined) {
      this.resourceService.delete(resource.id).subscribe({
        next: () => { this.resources = this.resources.filter(element => element !== resource) },
        error: () => alert('Erro ao tentar excluir!')
      }
      )
    }
  }

  editResource (resource: T): void {
    this.router.navigateByUrl(`${this.basePath}/${resource.id}/edit`)
  }

  newResource (): void {
    this.router.navigateByUrl(`${this.basePath}/new`)
  }
}
