# Simple Social Media App 🧠

> Training project built using Node.js, Express.js, and MySQL to practice full-stack REST API development.

---

## 🚀 About

This project was a hands-on **upskilling / training exercise**, aimed at reinforcing core backend development skills:

- Built with **Node.js** + **Express.js**
- Uses **MySQL** for data storage
- Includes basic RESTful endpoints for typical social media actions: creating posts, fetching, updating, and deleting
- Designed to be **simple and straightforward**, ideal for improving CRUD patterns and middleware handling

---

## ⚙️ Tech Stack

- **Node.js** – Server runtime  
- **Express.js** – Web framework  
- **MySQL** – Relational database  
- **mysql2** (or similar) – Node.js MySQL client  
- (Optional) **dotenv** – Environment variable management  

---

## 🧩 Key Features

- **User Posts**: Create, read, update, and delete posts
- **Timestamping**: `createdAt` column auto-populates via MySQL `CURRENT_TIMESTAMP`
- **Update Restriction**: Posts can only be edited within **15 minutes** of creation
- (Optionally extendable to include likes, comments, user authentication)

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+)
- MySQL DB

### Setup & Run

1. **Clone the repo**

   ```bash
   git clone https://github.com/yous0001/simple-socialmedia-upskilling.git
   cd simple-socialmedia-upskilling
