# CS340-F25-Group28

# Bookstore Database Web App

This web application interfaces with a MySQL bookstore database. It provides CRUD operations via a Node.js + Express backend. It supports dynamic data rendering using Handlebars.

---
## Features
- Connects to a MySQL bookstore database (Database schema dirgram can be viewed in bookstore_schema_diagram.)
- Create, Read, Update, Delete implemented for all entities.
- Reset function added to reset the database to its original state.

---
## Tech Stack
| Component   | Technology |
|-------------|------------|
| Backend     | Node.js, Express |
| Database    | MySQL |
| Frontend    | Handlebars |
| Language    | JavaScript |

---
## Installation
1. Clone the repository
2. Install dependencies - npm install
3. Configure the database connection in database/db-connector.js
4. Configure the port number in app.js
5. Run the stored procedures in PL.SQL
6. Run the application - npm start development
7. Visit http://localhost:[your port number] in your browser

---
## How AI Was Used
This project was developed with assistance from Microsoft Copilot for code generation, explanations and debugging Guidance. Detailed prompts to guide Copilot’s responses were added at the beginning of relavant documents.

---
## Citation
1. Adapted from and based on CS 340 - Explorations - Web Application Technology
Source: [Oregon State University Canvas] (https://canvas.oregonstate.edu/courses/2017561/pages/exploration-web-application-technology-2?module_item_id=25645131)
2. Adapted from and based on CS 340 - Explorations - Implementing CUD operations in your app
Source: [Oregon State University Canvas] (https://canvas.oregonstate.edu/courses/2017561/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=25645149)
3. [Microsoft Copilot] (https://copilot.microsoft.com/)

