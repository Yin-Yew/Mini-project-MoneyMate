# Mini-project-MoneyMate
# MoneyMate — Personal Finance Tracker

MoneyMate คือเว็บแอปพลิเคชันสำหรับบันทึกและติดตามรายรับ–รายจ่ายส่วนบุคคล พัฒนาด้วย HTML, CSS, JavaScript และ Node.js/Express โดยผู้ใช้สามารถเพิ่ม แก้ไข ลบ และค้นหารายการธุรกรรม รวมถึงดูภาพรวมทางการเงินผ่าน Dashboard, Charts, Analytics และ Calendar ได้

โปรเจกต์นี้พัฒนาขึ้นในรูปแบบ Full-Stack Web Application โดยแบ่งการทำงานออกเป็น Frontend และ Backend และใช้ REST API สำหรับเชื่อมต่อข้อมูลระหว่าง Client และ Server

---

## Features

### Dashboard

- แสดงยอดเงินคงเหลือ Current Balance
- แสดง Total Income
- แสดง Total Expense
- แสดง Saving Rate
- แสดง Expense Breakdown ด้วย Doughnut Chart
- แสดง Income และ Expense รายเดือนด้วย Bar Chart
- แสดงรายการธุรกรรมล่าสุด
- สามารถเพิ่ม Transaction จาก Dashboard ได้

### Transactions

- เพิ่มรายการรายรับและรายจ่าย
- แก้ไข Transaction
- ลบ Transaction
- ค้นหารายการ Transaction
- Filter ตามประเภท Income / Expense
- แสดงยอดรวม Income
- แสดงยอดรวม Expense
- แสดง Balance
- เชื่อมต่อข้อมูลผ่าน REST API

### Analytics

- แสดง Total Expense
- แสดง Saving Rate
- แสดง Average Expense
- แสดงสัดส่วนค่าใช้จ่ายแต่ละ Category
- แสดง Monthly Expense Trend
- แสดง Financial Insight จากข้อมูล Transaction

### Budget & Goals

- สร้างเป้าหมายการออม
- กำหนด Target Amount
- ระบุ Current Saving
- แสดง Progress ของเป้าหมาย
- ลบเป้าหมายได้
- เก็บข้อมูล Goal ด้วย LocalStorage

### Calendar

- แสดง Transaction ตามวันที่
- เปลี่ยนเดือนได้
- กลับไปยังวันที่ปัจจุบันได้
- วันที่ที่มี Transaction จะแสดงสัญลักษณ์บน Calendar
- กดวันที่เพื่อดูรายละเอียด Transaction
- แสดง Income ของแต่ละเดือน
- แสดง Expense ของแต่ละเดือน
- แสดง Net Balance ของแต่ละเดือน

### Settings

รองรับ Theme จำนวน 4 รูปแบบ

- Cloud
- Midnight
- Forest
- Lavender

Theme ที่เลือกจะถูกบันทึกด้วย LocalStorage และยังคงอยู่หลังจาก Refresh หน้าเว็บ

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js
- Phosphor Icons

### Backend

- Node.js
- Express.js
- REST API
- JSON
- File / In-memory Data Storage

### Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman หรือ Thunder Client
- npm

---

## Project Structure

```text
Mini-project-MoneyMate/
│
├── public/
│   ├── index.html
│   ├── transactions.html
│   ├── analytics.html
│   ├── budget.html
│   ├── calendar.html
│   ├── settings.html
│   ├── style.css
│   └── script.js
│
├── server/
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   └── transactions.json
│
├── screenshots/
│   ├── debug-get.png
│   └── debug-post.png
│
├── README.md
└── report.pdf
```

---

## Transaction Data Structure

Transaction แต่ละรายการมีโครงสร้างดังนี้

```json
{
  "id": 1,
  "title": "Coffee",
  "amount": 80,
  "category": "Food",
  "type": "expense",
  "date": "2026-09-24"
}
```

### Fields

| Field | Description |
|---|---|
| `id` | รหัสของ Transaction |
| `title` | ชื่อรายการ |
| `amount` | จำนวนเงิน |
| `category` | หมวดหมู่ |
| `type` | ประเภท `income` หรือ `expense` |
| `date` | วันที่ของรายการ |

---

## Categories

ระบบรองรับ Category ดังต่อไปนี้

```text
Food
Transport
Shopping
Bills
Entertainment
Salary
Other
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/Yin-Yew/Mini-project-MoneyMate.git
```

เข้าไปยังโฟลเดอร์โปรเจกต์

```bash
cd Mini-project-MoneyMate
```

---

## 2. เข้าโฟลเดอร์ Server

```bash
cd server
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Run Server

```bash
npm run dev
```

หากไม่ได้ตั้งค่า Development Script สามารถใช้

```bash
node app.js
```

---

## 5. Open Website

เปิด Browser แล้วเข้า

```text
http://localhost:3000
```

เมื่อ Server ทำงานแล้ว Express จะให้บริการไฟล์ Frontend จากโฟลเดอร์ `public`

---

# REST API

Base URL

```text
http://localhost:3000/api
```

---

## 1. GET All Transactions

ใช้สำหรับดึงรายการ Transaction ทั้งหมด

```http
GET /api/transactions
```

ตัวอย่าง Response

```json
[
  {
    "id": 1,
    "title": "Coffee",
    "amount": 80,
    "category": "Food",
    "type": "expense",
    "date": "2026-09-24"
  },
  {
    "id": 2,
    "title": "Salary",
    "amount": 30000,
    "category": "Salary",
    "type": "income",
    "date": "2026-09-01"
  }
]
```

Status

```text
200 OK
```

---

## 2. GET Transaction by ID

ใช้ค้นหา Transaction ตาม ID

```http
GET /api/transactions/:id
```

ตัวอย่าง

```http
GET /api/transactions/1
```

หากพบข้อมูล

```text
200 OK
```

หากไม่พบ Transaction

```text
404 Not Found
```

ตัวอย่าง Error Response

```json
{
  "message": "Transaction not found"
}
```

---

## 3. Filter Transactions with Query String

สามารถ Filter Transaction ผ่าน Query String ได้

### Filter ตาม Type

```http
GET /api/transactions?type=expense
```

หรือ

```http
GET /api/transactions?type=income
```

### Filter ตาม Category

```http
GET /api/transactions?category=Food
```

ตัวอย่าง

```http
GET /api/transactions?category=Shopping
```

---

## 4. POST Transaction

ใช้สำหรับสร้าง Transaction ใหม่

```http
POST /api/transactions
```

Request Body

```json
{
  "title": "Lunch",
  "amount": 120,
  "category": "Food",
  "type": "expense",
  "date": "2026-09-27"
}
```

เมื่อสร้างสำเร็จ

```text
201 Created
```

ตัวอย่าง Response

```json
{
  "id": 15,
  "title": "Lunch",
  "amount": 120,
  "category": "Food",
  "type": "expense",
  "date": "2026-09-27"
}
```

หากข้อมูลไม่ครบหรือไม่ถูกต้อง

```text
400 Bad Request
```

ตัวอย่าง

```json
{
  "message": "Invalid transaction data"
}
```

---

## 5. PATCH Transaction

ใช้สำหรับแก้ไข Transaction

```http
PATCH /api/transactions/:id
```

ตัวอย่าง

```http
PATCH /api/transactions/1
```

Request Body

```json
{
  "title": "Coffee and Cake",
  "amount": 150
}
```

เมื่อแก้ไขสำเร็จ

```text
200 OK
```

หากไม่พบ Transaction

```text
404 Not Found
```

---

## 6. DELETE Transaction

ใช้สำหรับลบ Transaction

```http
DELETE /api/transactions/:id
```

ตัวอย่าง

```http
DELETE /api/transactions/1
```

เมื่อลบสำเร็จ

```text
204 No Content
```

หากไม่พบ Transaction

```text
404 Not Found
```

---

# Validation

ในการเพิ่มหรือแก้ไข Transaction ระบบจะตรวจสอบข้อมูล เช่น

```text
title
amount
category
type
date
```

โดย `amount` ต้องเป็นตัวเลขที่มากกว่า 0 และ `type` ต้องเป็น

```text
income
```

หรือ

```text
expense
```

หากข้อมูลไม่ถูกต้อง Server จะส่ง

```text
400 Bad Request
```

---

# HTTP Status Codes

| Status Code | Meaning |
|---|---|
| `200 OK` | Request สำเร็จ |
| `201 Created` | สร้างข้อมูลสำเร็จ |
| `204 No Content` | ลบข้อมูลสำเร็จ |
| `400 Bad Request` | ข้อมูลที่ส่งมาไม่ถูกต้อง |
| `404 Not Found` | ไม่พบ Transaction |
| `500 Internal Server Error` | เกิดข้อผิดพลาดภายใน Server |

---

# Frontend and Backend Connection

Frontend เรียกใช้งาน Backend ด้วย Fetch API

ตัวอย่างการดึงข้อมูล

```javascript
fetch("/api/transactions")
```

เพิ่ม Transaction

```javascript
fetch("/api/transactions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(transaction)
});
```

แก้ไข Transaction

```javascript
fetch(`/api/transactions/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(updatedTransaction)
});
```

ลบ Transaction

```javascript
fetch(`/api/transactions/${id}`, {
  method: "DELETE"
});
```

---

# Debugging and API Testing

REST API สามารถทดสอบได้ด้วย Postman หรือ Thunder Client

ควรทดสอบ

```text
GET /api/transactions

GET /api/transactions/:id

GET /api/transactions?type=expense

GET /api/transactions?category=Food

POST /api/transactions

PATCH /api/transactions/:id

DELETE /api/transactions/:id
```

รวมถึงทดสอบกรณี

```text
400 Bad Request

404 Not Found
```

---

# Debug Screenshots

## Screenshot 1 — GET Transactions

![GET Transactions](screenshots/debug-get.png)

ภาพแสดงการทดสอบ

```http
GET /api/transactions
```

และ Response จาก Server

---

## Screenshot 2 — POST Transaction

![POST Transaction](screenshots/debug-post.png)

ภาพแสดงการทดสอบ

```http
POST /api/transactions
```

และ Response Status

```text
201 Created
```

---

# User Interface

MoneyMate ถูกออกแบบในรูปแบบ Modern FinTech Dashboard โดยใช้ Glassmorphism เป็นแนวทางหลักของ UI

ระบบรองรับ Theme หลายรูปแบบ และใช้ Responsive Design เพื่อให้หน้าเว็บสามารถปรับตามขนาดหน้าจอได้

องค์ประกอบหลักประกอบด้วย

```text
Dashboard
Transactions
Analytics
Budget & Goals
Calendar
Settings
```

---

# Demo Mode

ในระหว่างการพัฒนา Frontend หากไม่สามารถเชื่อมต่อกับ

```text
/api/transactions
```

ระบบ Frontend สามารถใช้ Demo Data และ LocalStorage เพื่อใช้ทดสอบหน้าตาและฟังก์ชันพื้นฐานของเว็บไซต์ได้

เมื่อเชื่อมต่อกับ Express Server สำเร็จ ระบบจะใช้ข้อมูลจาก REST API แทน

---

# System Workflow

```text
User
  │
  ▼
Frontend
HTML / CSS / JavaScript
  │
  │ Fetch API
  ▼
Express Server
  │
  ▼
REST API
/api/transactions
  │
  ▼
Transaction Data
```

---

# GitHub Repository

Repository

```text
https://github.com/Yin-Yew/Mini-project-MoneyMate
```

---

# Report

เอกสารรายงานของโปรเจกต์อยู่ในไฟล์

```text
report.pdf
```

โดยรายงานประกอบด้วย

```text
Introduction
System Design
REST API Design
Frontend Interface
API Testing
Screenshots
Conclusion
```

---

# Project Summary

MoneyMate เป็น Full-Stack Personal Finance Tracker ที่ช่วยให้ผู้ใช้สามารถจัดการข้อมูลรายรับและรายจ่ายผ่าน Web Interface ได้อย่างสะดวก โดยใช้ REST API สำหรับจัดการ Transaction และแสดงข้อมูลในรูปแบบ Dashboard, Charts, Analytics และ Calendar

โปรเจกต์นี้แสดงการประยุกต์ใช้ความรู้เกี่ยวกับ HTML, CSS, JavaScript, Node.js, Express.js, REST API, HTTP Methods, JSON และ Git/GitHub ในการพัฒนา Web Application แบบ Full-Stack
