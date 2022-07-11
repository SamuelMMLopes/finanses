import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { mergeMap, catchError, map } from 'rxjs/operators'

import { BaseResourceService } from '../../../shared/services/base-resource.service'
import { CategoryService } from '../../categories/shared/category.service'
import { Entry } from './entry.model'
import { Category } from '../../categories/shared/category.model'

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {
  constructor (
    protected override injector: Injector,
    private readonly categoryService: CategoryService
  ) {
    super('api/entries', injector, Entry.fromJson)
  }

  override create (entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.create.bind(this))
  }

  override update (entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToServer(entry, super.update.bind(this))
  }

  getByMonthAndYear (month: number, year: number): Observable<Entry[]> {
    return this.getAll().pipe(
      map(entries => this.filterByMonthAndYear(entries, month, year))
    )
  }

  private setCategoryAndSendToServer (entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId!).pipe(
      mergeMap<Category, Observable<Entry>>(category => {
        entry.category = category
        return sendFn(entry)
      }),
      catchError(this.handleError)
    )
  }

  private filterByMonthAndYear (entries: Entry[], month: number, year: number): Entry[] {
    const entriesFiler: Entry[] = []
    for (const entry of entries) {
      const entryDate = new Date(entry.date!)
      const monthMatches = entryDate.getMonth() + 1 === month
      const yearMatches = entryDate.getFullYear() === year
      if (monthMatches && yearMatches) entriesFiler.push(entry)
    }
    return entriesFiler
  }
}
