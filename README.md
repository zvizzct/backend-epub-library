# El Quiosco - Web API

## Project Summary

El Quiosco is a web platform designed to provide universal access to a wide variety of books, enabling users to read, explore, and download books for free and easily. This repository focuses on the backend of the platform, responsible for managing business logic, user authentication, database access, and integration with external APIs.

## Key Components of the Backend

### Technologies and Tools:

- **Programming Language:** TypeScript/JavaScript.
- **Framework:** Express.js for handling routes and HTTP requests.
- **Database:** PostgreSQL, hosted in a Docker container.
- **ORM:** Prisma for database interaction.
- **Authentication:** JWT for managing sessions and user authentication.
- **External APIs:** Integration with OpenAI for personalized recommendations.

### Main Features:

- **User Management:** Registration, authentication, and session management.
- **Book Catalog:** Includes exploration, advanced filtering, and book details.
- **Recommendations:** Uses ChatGPT to offer recommendations based on user preferences.
- **Favorites and Downloads:** Allows users to manage their favorite books and downloads.

### Code Structure:

The codebase is organized following Domain-Driven Design (DDD) and Clean Architecture principles. This approach facilitates the separation of concerns, making the system more modular, scalable, and easier to understand and maintain. The structure includes:

- **Configuration:** Environment variables and initial settings.
- **Domain:** Core business logic and entities.
- **Application:** Application-specific logic, such as use cases.
- **Infrastructure:** External services and data persistence mechanisms.
- **Presentation:** Interfaces and adapters for external communication.

### Future Expansions:

- More endpoints will be added, including sections for authors, comments, and ratings.

## Application Context

The backend of El Quiosco is a central piece of the project, designed to work in conjunction with the frontend, providing a smooth and dynamic user experience. The database originated from data scraping of a web page, using a Python script and then structuring it into a relational format suitable for our needs. Both an ER diagram and a database diagram have been documented to facilitate understanding and development.

### Data Model

The database schema has been carefully designed to support the functionalities required by the platform, including managing books, authors, genres, and user interactions with these elements.

**Note:** This document is constantly evolving to adapt to new project needs and improvements.
