import { BookDatasource, BookEntity, BookRepository } from '../../domain'
import { BookFilter } from '../../domain/filters/BookFilter'

export class BookRepositoryImpl implements BookRepository {
  constructor(private readonly datasource: BookDatasource) {}

  getBooks(): Promise<BookEntity[]> {
    return this.datasource.getBooks()
  }
  findBookById(id: number): Promise<BookEntity> {
    return this.datasource.findBookById(id)
  }
  getBooksPaginated(page: number, limit: number): Promise<BookEntity[]> {
    return this.datasource.getBooksPaginated(page, limit)
  }

  getBookSearch(title: string): Promise<BookEntity[]> {
    return this.datasource.getBookSearch(title)
  }

  getBooksByFilter(
    filter: BookFilter,
    page: number,
    limit: number
  ): Promise<BookEntity[]> {
    return this.datasource.getBooksByFilter(filter, page, limit)
  }
}
