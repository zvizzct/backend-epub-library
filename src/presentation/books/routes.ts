import { Router } from 'express'
import { BooksController } from './controller'

export class BookRoutes {
  static get routes(): Router {
    const router = Router()
    const bookController = new BooksController()

    router.get('/', (req, res) => bookController.getBooks(req, res))
    // router.get('/:id', (req, res) => bookController.getBookById(req, res))
    router.get('/:title', (req, res) => bookController.getBookByName(req, res))

    return router
  }
}
