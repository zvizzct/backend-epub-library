export class VoteEntity {
  constructor(
    public id: number,
    public userId: number,
    public bookId: number,
    public value: number
  ) {}

  public static fromObject(object: any): VoteEntity {
    const { id, user_id: userId, book_id: bookId, value } = object
    if (!id) throw new Error('Invalid id')
    return new VoteEntity(id, userId, bookId, value)
  }
}
