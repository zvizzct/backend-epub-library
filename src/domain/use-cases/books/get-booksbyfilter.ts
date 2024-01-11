import { BookEntity } from '../../entities/book.entity'
import { BookFilter } from '../../filters/BookFilter'
import { BookRepository } from '../../repositories/book.repository'

export interface GetBooksByFilterUseCase {
  execute(
    filters: BookFilter,
    page: number,
    limit: number
  ): Promise<BookEntity[]>
}

export class GetBooksByFilter implements GetBooksByFilterUseCase {
  constructor(private readonly bookRepository: BookRepository) {}
  execute(
    filters: BookFilter,
    page: number,
    limit: number
  ): Promise<BookEntity[]> {
    return this.bookRepository.getBooksByFilter(filters, page, limit)
  }
}
