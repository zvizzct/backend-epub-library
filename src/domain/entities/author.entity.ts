import { BookEntity } from './book.entity'

export class AuthorEntity {
  constructor(
    public id: number,
    public name: string,
    public role?: string,
    public books?: BookEntity[]
  ) {}
  public static fromObject(object: any): AuthorEntity {
    const { id, name, rol, books } = object
    if (!id) throw new Error('Invalid id')
    const booksEntity = books?.map((book: any) => BookEntity.fromObject(book))
    return new AuthorEntity(id, name, rol, booksEntity)
  }
}
