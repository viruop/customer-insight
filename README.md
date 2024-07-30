# CustomerInsight

### Prerequisites

- Node.js (v14 or later)
- pnpm (https://pnpm.io/) or npm
- MongoDB

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/viruop/customer-insight.git
    cd customer-account-management
    ```

2. Install dependencies for the client:
    ```bash
    cd client
    pnpm install
    ```

3. Install dependencies for the server:
    ```bash
    cd ../server
    pnpm install
    ```

4. Set up environment variables:
    - Copy the `.env.example` file to `.env` in the `server` directory.
    - Update the `.env` file with the necessary environment variables.

    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and configure your environment variables according to your setup.

5. Start the development servers:
    - For the client application:
      ```bash
      cd ../client
      pnpm dev
      ```
    - For the server application:
      ```bash
      cd ../server
      pnpm start
      ```

6. Open your browser and navigate to `http://localhost:3000`.

## Demo

Here is a video demo showcasing the functionality of the application:

[![Customer Account Management Demo](https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/0.jpg)](https://drive.google.com/file/d/1U1PNqlaR-HN-wQ7FHk2r5DDKWiCDjkM-/view)

## Acknowledgments

- [Firebase](https://firebase.google.com/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [pnpm](https://pnpm.io/)
