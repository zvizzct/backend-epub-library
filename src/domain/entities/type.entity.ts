import { BookEntity } from './book.entity'

export class TypeEntity {
  constructor(
    public id: number,
    public name: string,
    public books?: BookEntity[]
  ) {}

  public static fromObject(object: any): TypeEntity {
    const { id, name, books } = object
    if (!id) throw new Error('Invalid id')
    const booksEntity = books?.map((book: any) => BookEntity.fromObject(book))
    return new TypeEntity(id, name, booksEntity)
  }
}
