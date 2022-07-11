import { Component } from '@angular/core'

import { PoMenuItem } from '@po-ui/ng-components'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  readonly menus: PoMenuItem[] = [
    { label: 'Relatórios', shortLabel: 'Relatórios', link: '/reports', icon: 'po-icon-chart-columns' },
    { label: 'Lançamentos', shortLabel: 'Lançamentos', link: '/entries', icon: 'po-icon-finance' },
    { label: 'Categorias', shortLabel: 'Categorias', link: '/categories', icon: 'po-icon-list' }
  ]
}
