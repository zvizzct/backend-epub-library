import { BookEntity } from '../entities/book.entity'
import { BookFilter } from '../filters/BookFilter'

export abstract class BookDatasource {
  //todo: Pagination
  abstract getBooks(): Promise<BookEntity[]>

  abstract findBookById(id: number): Promise<BookEntity>

  abstract getBooksPaginated(page: number, limit: number): Promise<BookEntity[]>

  abstract getBookSearch(title: string): Promise<BookEntity[]>

  abstract getBooksByFilter(
    filter: BookFilter,
    page: number,
    limit: number
  ): Promise<BookEntity[]>
}
