import { Component, OnInit } from '@angular/core'
import { PoComboOption } from '@po-ui/ng-components'
import { Entry } from '../../entries/shared/entry.model'
import { EntryService } from '../../entries/shared/entry.service'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  private readonly currentYear = new Date().getFullYear()
  private readonly currentMonth = new Date().getMonth()
  year!: number
  month!: number
  mouthOptions: PoComboOption[] = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 }
  ]

  entries: Entry[] = []
  expenseTotal = 'R$ 0,00'
  revenueTotal = 'R$ 0,00'
  balance = 'R$ 0,00'

  constructor (
    private readonly entryService: EntryService
  ) {}

  ngOnInit (): void {
    this.year = this.currentYear
    this.month = this.currentMonth + 1
    this.generateReports()
  }

  get yearsOptions (): PoComboOption[] {
    return this.years.map(year => ({
      value: year,
      label: String(year)
    }))
  }

  get years (): number[] {
    const years: number[] = []
    const firstYear = this.currentYear - 5
    const lastYear = this.currentYear + 5
    for (let i = firstYear; i < lastYear; i++) {
      years.push(i)
    }
    return years
  }

  generateReports (): void {
    this.entryService.getByMonthAndYear(this.month, this.year).subscribe({
      next: (entries) => this.setValues(entries)
    })
  }

  private setValues (entries: Entry[]): void {
    this.entries = entries
    this.calculateBalance()
  }

  private calculateBalance (): void {
    let expenseTotal = 0
    let revenueTotal = 0

    for (const entry of this.entries) {
      if (entry.type === 'revenue') {
        revenueTotal += entry.amount ?? 0
      } else {
        expenseTotal += entry.amount ?? 0
      }
    }
    this.expenseTotal = expenseTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    this.revenueTotal = revenueTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    this.balance = (revenueTotal - expenseTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}
