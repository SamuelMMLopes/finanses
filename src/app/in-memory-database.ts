import { InMemoryDbService } from 'angular-in-memory-web-api'

export class InMemoryDatabase implements InMemoryDbService {
  createDb (): any {
    const categories: any[] = [
      { id: 1, name: 'Moradia', description: 'Pagamentos de Contas da Casa' },
      { id: 2, name: 'Saúde', description: 'Plano de Saúde e Remédios' },
      { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
      { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
      { id: 5, name: 'Freelas', description: 'Trabalhos como freelancer' }
    ]

    const entries: any[] = [
      { id: 1, name: 'Gás de Cozinha', categoryId: categories[0].id, category: categories[0], paid: true, date: '2022-06-10', amount: 70.80, type: 'expense', description: 'Qualquer descrição para essa despesa' } as any,
      { id: 2, name: 'Suplementos', categoryId: categories[1].id, category: categories[1], paid: false, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 3, name: 'Salário na Empresa X', categoryId: categories[3].id, category: categories[3], paid: true, date: '2022-07-10', amount: 4405.49, type: 'revenue' } as any,
      { id: 4, name: 'Aluguel de Filme', categoryId: categories[2].id, category: categories[2], paid: true, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 5, name: 'Suplementos', categoryId: categories[1].id, category: categories[1], paid: true, date: '2022-07-10', amount: 30.00, type: 'expense' } as any,
      { id: 6, name: 'Video Game da Filha', categoryId: categories[2].id, category: categories[2], paid: false, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 11, name: 'Uber', categoryId: categories[1].id, category: categories[1], paid: true, date: '2022-07-10', amount: 30.00, type: 'expense' } as any,
      { id: 12, name: 'Aluguel', categoryId: categories[2].id, category: categories[2], paid: false, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 13, name: 'Gás de Cozinha', categoryId: categories[1].id, category: categories[1], paid: false, date: '2022-07-10', amount: 30.00, type: 'expense' } as any,
      { id: 14, name: 'Pagamento Pelo Projeto XYZ', categoryId: categories[4].id, category: categories[4], paid: true, date: '2022-06-10', amount: 2980.00, type: 'revenue' } as any,
      { id: 19, name: 'Aluguel de Filme', categoryId: categories[2].id, category: categories[2], paid: false, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 21, name: 'Video Game da Filha', categoryId: categories[1].id, category: categories[1], paid: true, date: '2022-07-10', amount: 30.00, type: 'expense' } as any,
      { id: 22, name: 'Cinema', categoryId: categories[2].id, category: categories[2], paid: true, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 23, name: 'Jiu Jitsu', categoryId: categories[1].id, category: categories[1], paid: false, date: '2022-07-10', amount: 130.00, type: 'expense' } as any,
      { id: 44, name: 'Uber', categoryId: categories[2].id, category: categories[2], paid: true, date: '2022-07-10', amount: 15.00, type: 'expense' } as any,
      { id: 55, name: 'Cinema', categoryId: categories[1].id, category: categories[1], paid: false, date: '2022-07-10', amount: 30.00, type: 'expense' } as any
    ]

    return { categories, entries }
  }
}
