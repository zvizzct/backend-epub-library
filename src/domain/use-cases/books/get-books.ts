import { BookEntity } from '../../entities/book.entity'
import { BookRepository } from '../../repositories/book.repository'

export interface GetBooksUseCase {
  execute(): Promise<BookEntity[]>
}

export class GetBooks implements GetBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  execute(): Promise<BookEntity[]> {
    return this.bookRepository.getBooks()
  }
}
