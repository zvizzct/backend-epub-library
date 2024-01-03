import { Request, Response } from 'express'
import { prisma } from '../../data/postgres'

const books = [
  { id: 1, title: 'Book 1', author: 'Author 1' },
  { id: 2, title: 'Book 2', author: 'Author 2' },
  { id: 3, title: 'Book 3', author: 'Author 3' }
]

export class BooksController {
  //* D.I
  constructor() {}
  public getBooks = async (req: Request, res: Response) => {
    return await prisma.book.findMany().then((books) => {
      res.json(books)
    })
  }
  public getBookById = async (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' })
    await prisma.book.findUnique({ where: { id } }).then((book) => {
      if (!book) return res.status(404).json({ error: 'Book not found' })
      res.json(book)
    })
  }
  public getBookByName = async (req: Request, res: Response) => {
    const title = req.params.title
    if (!title) return res.status(400).json({ error: 'Invalid name' })

    await prisma.book
      .findMany({
        where: {
          title: {
            contains: title,
            mode: 'insensitive' // if you want the search to be case-insensitive
          }
        },
        orderBy: {
          number_of_pages: 'desc'
        }
      })
      .then((books) => {
        if (!books || books.length === 0)
          return res.status(404).json({ error: 'Book not found' })
        res.json(books)
      })
  }
}
