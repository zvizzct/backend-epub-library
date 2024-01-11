import { BookEntity } from '../../entities/book.entity'
import { BookRepository } from '../../repositories/book.repository'

export interface GetBookByIdUseCase {
  execute(id: number): Promise<BookEntity>
}

export class GetBook implements GetBookByIdUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  execute(id: number): Promise<BookEntity> {
    return this.bookRepository.findBookById(id)
  }
}
