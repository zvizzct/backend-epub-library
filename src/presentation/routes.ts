import { Router } from 'express'
import { BookRoutes } from './books/routes'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/api/books', BookRoutes.routes)
    return router
  }
}
