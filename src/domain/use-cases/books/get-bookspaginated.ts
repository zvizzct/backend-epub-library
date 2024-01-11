import { BookEntity } from '../../entities/book.entity'
import { BookRepository } from '../../repositories/book.repository'

export interface GetBooksPaginatedUseCase {
  execute(page: number, limit: number): Promise<BookEntity[]>
}

export class GetBooksPaginated implements GetBooksPaginatedUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  execute(page: number, limit: number): Promise<BookEntity[]> {
    return this.bookRepository.getBooksPaginated(page, limit)
  }
}
