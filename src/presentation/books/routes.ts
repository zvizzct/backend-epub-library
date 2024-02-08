import { Router } from 'express'
import { BooksController } from './controller'
import { BookDatasourceImpl } from '../../infrastructure/datasource/book.datasource.impl'
import { BookRepositoryImpl } from '../../infrastructure/repositories/book.repository.impl'

export class BookRoutes {
  static get routes(): Router {
    const router = Router()

    const datasource = new BookDatasourceImpl()
    const bookRepository = new BookRepositoryImpl(datasource)
    const bookController = new BooksController(bookRepository)

    // obtain a list of books from filters
    router.get('/filter', (req, res) =>
      bookController.getBooksByFilter(req, res)
    )

    // obtain a list of books from title
    router.get('/search/:title', (req, res) =>
      bookController.getBookSearch(req, res)
    )

    // obtain paginated books
    router.get('/page', (req, res) =>
      bookController.getBooksPaginated(req, res)
    )

    // obtain book by id
    router.get('/:id', (req, res) => bookController.getBookById(req, res))

    return router
  }
}
