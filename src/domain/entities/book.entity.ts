import { AuthorEntity } from './author.entity'
import { GenreEntity } from './genre.entity'
import { ThemeEntity } from './theme.entity'
import { TypeEntity } from './type.entity'
import { VoteEntity } from './vote.entity'

export class BookEntity {
  constructor(
    public id: number,
    public title: string,
    public synopsis?: string,
    public publicationDate?: string,
    public magnetLink?: string,
    public imageUrl?: string,
    public numberOfPages?: number,
    public language?: string,
    public genres?: GenreEntity[],
    public themes?: ThemeEntity[],
    public types?: TypeEntity[],
    public authors?: AuthorEntity[],
    public vote?: number
  ) {}

  public static fromObject(object: { [key: string]: any }): BookEntity {
    const {
      id,
      title,
      synopsis,
      publication_date: publicationDate,
      magnet_link: magnetLink,
      image_url: imageUrl,
      number_of_pages: numberOfPages,
      language,
      books_author: booksAuthor,
      books_genre: booksGenre,
      books_theme: booksTheme,
      books_type: booksType,
      vote
    } = object

    if (!id) throw new Error('Invalid id')

    // Mapear los autores, géneros, temas y tipos
    const authors = booksAuthor?.map((a: any) =>
      AuthorEntity.fromObject(a.author)
    )
    const genres = booksGenre?.map((g: any) => GenreEntity.fromObject(g.genre))
    const themes = booksTheme?.map((t: any) => ThemeEntity.fromObject(t.theme))
    const types = booksType?.map((t: any) => TypeEntity.fromObject(t.type))
    const totalVotes = vote
      ? object.vote.reduce(
          (sum: number, vote: VoteEntity) => sum + vote.value,
          0
        )
      : 0

    return new BookEntity(
      id,
      title,
      synopsis,
      publicationDate,
      magnetLink,
      imageUrl,
      numberOfPages,
      language,
      genres,
      themes,
      types,
      authors,
      totalVotes
    )
  }
}
