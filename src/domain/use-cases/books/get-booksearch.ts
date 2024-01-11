import { BookEntity } from '../../entities/book.entity'
import { BookRepository } from '../../repositories/book.repository'

export interface GetBookSearchUseCase {
  execute(title: string): Promise<BookEntity[]>
}

export class GetBookSearch implements GetBookSearchUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  execute(title: string): Promise<BookEntity[]> {
    return this.bookRepository.getBookSearch(title)
  }
}
