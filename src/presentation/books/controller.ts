import { Request, Response } from 'express'
import {
  BookRepository,
  GetBook,
  GetBookSearch,
  GetBooks,
  GetBooksByFilter,
  GetBooksPaginated
} from '../../domain'
import { BookFilter } from '../../domain/filters/BookFilter'

export class BooksController {
  constructor(private readonly bookRepository: BookRepository) {}

  public getBooks = (req: Request, res: Response) => {
    new GetBooks(this.bookRepository)
      .execute()
      .then((books) => {
        return res.json(books)
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  }
  public getBookById = async (req: Request, res: Response) => {
    const id = +req.params.id
    new GetBook(this.bookRepository)
      .execute(id)
      .then((book) => {
        return res.json(book)
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  }

  public getBooksPaginated = async (req: Request, res: Response) => {
    let page = +req.query.page! || 1
    let limit = +req.query.limit! || 10
    if (!limit) limit = 10
    new GetBooksPaginated(this.bookRepository)
      .execute(page, limit)
      .then((books) => {
        return res.json(books)
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  }

  public getBookSearch = async (req: Request, res: Response) => {
    const title = req.params.title
    console.log(title)
    if (!title) return res.status(400).json({ error: 'Invalid name' })
    new GetBookSearch(this.bookRepository)
      .execute(title)
      .then((books) => {
        return res.json(books)
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  }

  public getBooksByFilter = async (req: Request, res: Response) => {
    const filters: BookFilter = {
      genre: req.query.genre
        ? (req.query.genre as string).split(',')
        : undefined,
      theme: req.query.theme
        ? (req.query.theme as string).split(',')
        : undefined,
      type: req.query.type ? (req.query.type as string).split(',') : undefined,
      language: req.query.language as string,
      sortBy: req.query.sortBy as string,
      sortDirection: req.query.sortDirection as 'asc' | 'desc',
      // Asegúrate de convertir los números y manejar los rangos adecuadamente
      publicationYearRange: {
        startYear: parseInt(
          req.query['publicationYearRange[startYear]'] as string
        ),
        endYear: parseInt(req.query['publicationYearRange[endYear]'] as string)
      },
      numberOfPagesRange: {
        min: parseInt(req.query['numberOfPagesRange[min]'] as string),
        max: parseInt(req.query['numberOfPagesRange[max]'] as string)
      }
    }
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    console.log(filters, page, limit)

    new GetBooksByFilter(this.bookRepository)
      .execute(filters, page, limit)
      .then((books) => {
        return res.json(books)
      })
      .catch((error) => {
        res.status(400).json({ error })
      })
  }
}
