# Community Manager Dashboard

git remote add origin https://github.com/lakshayasabharwal/community-managers-dash-and-forms.git

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Project](#running-the-project)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/lakshayasabharwal/community-managers-dash-and-forms.git
    ```
2. Navigate to the project directory:
    ```sh
    cd community-managers-dash-and-forms
    ```

## Project Structure

The project is structured as follows:

- `admin/`: Contains the admin-side dashboard built with Next.js.
- `client/`: Contains the client-side forms built with Next.js.
- `db.json`: JSON file used by JSON-Server to simulate a back-end.

## Running the Project

1. Make sure you have json-server installed:
    ```sh
    npm install -g json-server
    ```

2. Start the JSON-Server:
    ```sh
    npx json-server db.json --port 3001
    ```
   **Note:** It is important to run JSON-Server on port 3001 as it is hardcoded in some places.

3. In a new terminal window, navigate to the `admin` directory and start the development server:
    ```sh
    cd admin
    npm install
    npm run dev
    ```

4. In another terminal window, navigate to the `client` directory and start the development server:
    ```sh
    cd client
    npm install
    npm run dev
    ```


5. Make sure to run db.json on localhost:3001
    and admin : on local host 3002  
    and client : local host 3000