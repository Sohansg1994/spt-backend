# Educational Management System Backend (spt-backend)

This is the backend service for the Educational Management System application. It provides APIs for managing student data, tracking progress, and other related functionalities.

## Features

- User authentication and authorization
- CRUD operations for students and progress tracking
- Integration with PostgreSQL using Drizzle ORM
- Environment configuration using `dotenv`
- Secure password handling with `bcrypt`

## Tech Stack

- **Node.js**: Backend runtime
- **Express.js**: Web framework
- **PostgreSQL**: Database
- **Drizzle ORM**: Database ORM
- **JWT**: Authentication
- **TypeScript**: Type safety

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/spt-backend.git
   cd spt-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DATABASE_URL=your_database_url
     JWT_SECRET=your_jwt_secret
     ```

4. Run database migrations:

   ```bash
   npx drizzle-kit up
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the project
- `npm start`: Start the production server
- `npm test`: Run tests

## License

This project is licensed under the MIT License.
