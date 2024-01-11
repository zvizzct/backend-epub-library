import { prisma } from '../../data/postgres'
import { BookDatasource, BookEntity } from '../../domain'
import { BookFilter } from '../../domain/filters/BookFilter'

export class BookDatasourceImpl implements BookDatasource {
  async getBooks(): Promise<BookEntity[]> {
    const books = await prisma.book.findMany()
    return books.map((book) => BookEntity.fromObject(book))
  }
  async findBookById(id: number): Promise<BookEntity> {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        books_author: {
          include: {
            author: true
          }
        },
        books_genre: {
          include: {
            genre: true
          }
        },
        books_theme: {
          include: {
            theme: true
          }
        },
        books_type: {
          include: {
            type: true
          }
        },
        vote: true
      }
    })
    if (!book) throw 'Book not found'

    return BookEntity.fromObject(book)
  }
  async getBooksPaginated(page: number, limit: number): Promise<BookEntity[]> {
    const bookIdsWithVoteSum = await prisma.vote.groupBy({
      by: ['book_id'],
      orderBy: {
        _sum: {
          value: 'desc'
        }
      },
      take: limit,
      skip: (page - 1) * limit
    })

    // Extrae los IDs de los libros
    const bookIds = bookIdsWithVoteSum.map((voteSum) => voteSum.book_id)

    // Ahora, obtén los detalles completos de los libros usando los IDs obtenidos
    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds
        }
      },
      include: {
        books_author: { include: { author: true } },
        books_genre: { include: { genre: true } },
        books_theme: { include: { theme: true } },
        books_type: { include: { type: true } },
        vote: true
      }
    })
    const sortedBooks = books.sort((a, b) => {
      const aVote = a.vote.reduce((acc, curr) => acc + curr.value, 0)
      const bVote = b.vote.reduce((acc, curr) => acc + curr.value, 0)
      return bVote - aVote
    })

    // return sortedBooks.map((book) => BookEntity.fromObject(book))
    return sortedBooks.map((book) => BookEntity.fromObject(book))
  }

  async getBookSearch(title: string): Promise<BookEntity[]> {
    const books = await prisma.book.findMany({
      where: {
        title: {
          contains: title,
          mode: 'insensitive' // if you want the search to be case-insensitive
        }
      },
      include: {
        books_author: { include: { author: true } },
        books_genre: { include: { genre: true } },
        books_theme: { include: { theme: true } },
        books_type: { include: { type: true } },
        vote: true
      }
    })
    const sortedBooks = books.sort((a, b) => {
      const aVote = a.vote.reduce((acc, curr) => acc + curr.value, 0)
      const bVote = b.vote.reduce((acc, curr) => acc + curr.value, 0)
      return bVote - aVote
    })
    return sortedBooks.map((book) => BookEntity.fromObject(book))
  }

  async getBooksByFilter(
    filter: BookFilter,
    page: number,
    limit: number
  ): Promise<BookEntity[]> {
    let query: any = {
      where: {},
      include: {
        books_author: { include: { author: true } },
        books_genre: { include: { genre: true } },
        books_theme: { include: { theme: true } },
        books_type: { include: { type: true } },
        vote: true
      },
      take: limit,
      skip: (page - 1) * limit,
      orderBy: {
        votes: 'desc'
      }
    }

    if (filter.genre && filter.genre.length) {
      query.where['books_genre'] = {
        some: {
          genre: {
            name: {
              in: filter.genre,
              mode: 'insensitive'
            }
          }
        }
      }
    }

    if (filter.theme && filter.theme.length) {
      query.where['books_theme'] = {
        some: {
          theme: {
            name: {
              in: filter.theme,
              mode: 'insensitive'
            }
          }
        }
      }
    }

    if (filter.type && filter.type.length) {
      query.where['books_type'] = {
        some: {
          type: {
            name: {
              in: filter.type,
              mode: 'insensitive'
            }
          }
        }
      }
    }
    if (filter.language) {
      query.where.language = { contains: filter.language, mode: 'insensitive' }
    }

    if (filter.publicationYearRange) {
      query.where.publication_date = {
        gte: filter.publicationYearRange.startYear,
        lte: filter.publicationYearRange.endYear
      }
    }

    if (filter.numberOfPagesRange) {
      query.where.number_of_pages = {
        gte: filter.numberOfPagesRange.min,
        lte: filter.numberOfPagesRange.max
      }
    }

    if (filter.sortBy) {
      query.orderBy = { [filter.sortBy]: filter.sortDirection || 'asc' }
    }

    const books = await prisma.book.findMany(query)
    return books.map((book) => BookEntity.fromObject(book))
  }
}
