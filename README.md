# MoneyMate — Personal Finance Tracker

MoneyMate คือเว็บแอปพลิเคชันสำหรับจัดการรายรับ–รายจ่ายส่วนบุคคล พัฒนาด้วย HTML, CSS, JavaScript, Node.js และ Express.js

ระบบช่วยให้ผู้ใช้สามารถเพิ่ม แก้ไข ลบ ค้นหา และกรองรายการธุรกรรม ดูภาพรวมทางการเงินผ่าน Dashboard และ Charts วิเคราะห์ค่าใช้จ่าย ดูรายการตามวันที่ผ่าน Calendar รวมถึงสร้างเป้าหมายการออมและเพิ่มเงินเข้าสู่เป้าหมายเดิมได้

โปรเจกต์นี้พัฒนาในรูปแบบ **Full-Stack Web Application** โดย Frontend ติดต่อกับ Backend ผ่าน REST API

---

# Features

## 1. Dashboard

Dashboard ใช้สำหรับแสดงภาพรวมทางการเงินของผู้ใช้

สามารถแสดงข้อมูลดังต่อไปนี้

- Current Balance
- Total Income
- Total Expense
- Saving Rate
- Expense Breakdown
- Year Overview
- Recent Transactions
- Add Transaction

ระบบจะดึงข้อมูล Transaction จาก Backend ผ่าน

```http
GET /api/transactions
```

จากนั้นนำข้อมูลมาคำนวณยอดรวมและสร้างกราฟด้วย Chart.js

Dashboard ใช้

- Doughnut Chart สำหรับ Expense Breakdown
- Bar Chart สำหรับ Year Overview

---

## 2. Transactions

หน้า Transactions ใช้สำหรับจัดการข้อมูลรายรับและรายจ่าย

รองรับ

- เพิ่ม Transaction
- แก้ไข Transaction
- ลบ Transaction
- ค้นหา Transaction
- Filter ตาม Income / Expense
- แสดง Total Income
- แสดง Total Expense
- แสดง Balance

Transaction แต่ละรายการประกอบด้วย

```text
Title
Amount
Category
Type
Date
```

ตัวอย่างข้อมูล

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

---

## 3. Analytics

หน้า Analytics ใช้สำหรับวิเคราะห์ข้อมูลทางการเงินจาก Transaction

ระบบสามารถแสดง

- Total Expense
- Saving Rate
- Average Expense
- Category Breakdown
- Monthly Expense Trend
- Financial Insight

หน้า Analytics ใช้ Chart.js ในการแสดงข้อมูลแบบ

```text
Doughnut Chart
Line Chart
```

---

## 4. Budget & Goals

หน้า Budget & Goals ใช้สำหรับสร้างและติดตามเป้าหมายการออม

ผู้ใช้สามารถกำหนด

```text
Goal Name
Target Amount
Current Saving
```

ตัวอย่าง

```text
Goal Name: New Laptop
Target Amount: 30,000
Current Saving: 5,000
```

ระบบจะคำนวณ Progress อัตโนมัติด้วยสูตร

```text
Current Saving ÷ Target Amount × 100
```

ตัวอย่าง

```text
5,000 ÷ 30,000 × 100
= 16.67%
```

ระบบจะแสดง Progress Bar และเปอร์เซ็นต์ของเป้าหมาย

### Add Saving

ผู้ใช้สามารถเพิ่มเงินเข้า Goal เดิมได้โดยกดปุ่ม

```text
Add Saving
```

ตัวอย่าง

```text
Current Saving
฿5,000

Add Saving
฿3,000
```

ผลลัพธ์

```text
฿8,000 / ฿30,000
```

Progress Bar และเปอร์เซ็นต์จะอัปเดตทันที

เมื่อยอดเงินถึง Target ระบบจะแสดงสถานะ

```text
Goal completed
```

ข้อมูล Goals ถูกจัดเก็บด้วย LocalStorage ดังนั้นข้อมูลจะยังคงอยู่หลังจาก Refresh หน้าเว็บ

> หมายเหตุ: Budget & Goals ในเวอร์ชันนี้เน้นการจัดการ Saving Goals และยังไม่มีระบบกำหนด Monthly Budget แยกตาม Category

---

## 5. Calendar

หน้า Calendar ใช้สำหรับดู Transaction ตามวันที่

รองรับ

- เปลี่ยนเดือน
- กลับไปวันที่ปัจจุบัน
- แสดงวันที่ที่มี Transaction
- กดวันที่เพื่อดู Transaction
- Income ของเดือน
- Expense ของเดือน
- Net Balance ของเดือน

วันที่ที่มี Transaction จะแสดง Indicator บน Calendar

เมื่อกดวันที่ ระบบจะแสดง Transaction ของวันนั้น

ตัวอย่าง

```text
30 September 2026

Lunch
Food
-฿120
```

---

## 6. Settings

หน้า Settings ใช้สำหรับตั้งค่าหน้าตาของระบบ

รองรับ Theme จำนวน 4 รูปแบบ

```text
Cloud
Midnight
Forest
Lavender
```

Theme จะถูกบันทึกด้วย LocalStorage ดังนั้นเมื่อ Refresh หน้าเว็บ Theme ที่เลือกจะยังคงอยู่

สามารถเปลี่ยน Theme ได้จาก

```text
Settings → Appearance
```

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript
- Chart.js
- Phosphor Icons
- LocalStorage

## Backend

- Node.js
- Express.js
- REST API
- JSON
- Node.js File System (`fs`)

## Development Tools

- Visual Studio Code
- npm
- Git
- GitHub
- Thunder Client
- Browser Developer Tools

---

# Project Structure

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
│   ├── get-transactions.png
│   ├── post-transaction.png
│   ├── patch-transaction.png
│   ├── delete-transaction.png
│   ├── error-400.png
│   └── error-404.png
│
├── README.md
└── report.pdf
```

---

# Installation

## 1. Clone Repository

```bash
git clone https://github.com/Yin-Yew/Mini-project-MoneyMate.git
```

## 2. เข้าโฟลเดอร์โปรเจกต์

```bash
cd Mini-project-MoneyMate
```

## 3. เข้าโฟลเดอร์ Server

```bash
cd server
```

## 4. Install Dependencies

```bash
npm install
```

คำสั่งนี้จะติดตั้ง Dependencies ที่จำเป็น รวมถึง Express

ระบบจะสร้างโฟลเดอร์

```text
node_modules
```

และสร้างหรืออัปเดต

```text
package-lock.json
```

## 5. Run Server

```bash
npm run dev
```

หรือ

```bash
npm start
```

เมื่อ Server ทำงานสำเร็จ Terminal จะแสดง

```text
MoneyMate server running at http://localhost:3000
```

---

# Open Website

เปิด Browser แล้วเข้า

```text
http://localhost:3000
```

Frontend จะถูก Serve ผ่าน Express จากโฟลเดอร์

```text
public/
```

เมื่อรันผ่าน Express แล้ว ไม่จำเป็นต้องใช้ Live Server

---

# REST API

Base URL

```text
http://localhost:3000/api
```

---

## GET All Transactions

ใช้สำหรับดึง Transaction ทั้งหมด

```http
GET /api/transactions
```

ตัวอย่าง Response

```json
[
  {
    "id": 1,
    "title": "Salary",
    "amount": 35000,
    "category": "Salary",
    "type": "income",
    "date": "2026-09-01"
  },
  {
    "id": 2,
    "title": "Internet",
    "amount": 699,
    "category": "Bills",
    "type": "expense",
    "date": "2026-09-10"
  }
]
```

Status

```text
200 OK
```

---

## GET Transaction by ID

ใช้สำหรับค้นหา Transaction ตาม ID

```http
GET /api/transactions/:id
```

ตัวอย่าง

```http
GET /api/transactions/1
```

เมื่อพบข้อมูล

```text
200 OK
```

หากไม่พบข้อมูล

```text
404 Not Found
```

ตัวอย่าง Response

```json
{
  "message": "Transaction not found"
}
```

---

## Query String

ระบบรองรับการ Filter Transaction ผ่าน Query String

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

### Filter ตาม Month

```http
GET /api/transactions?month=9
```

### Filter ตาม Year

```http
GET /api/transactions?year=2026
```

สามารถใช้ Query String เพื่อให้ Server ส่งกลับเฉพาะ Transaction ที่ตรงกับเงื่อนไขที่กำหนด

---

## POST Transaction

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
  "date": "2026-09-30"
}
```

หากสร้างสำเร็จ

```text
201 Created
```

ตัวอย่าง Response

```json
{
  "id": 7,
  "title": "Lunch",
  "amount": 120,
  "category": "Food",
  "type": "expense",
  "date": "2026-09-30"
}
```

---

## PATCH Transaction

ใช้สำหรับแก้ไขข้อมูลบางส่วนของ Transaction ตาม ID

```http
PATCH /api/transactions/:id
```

ตัวอย่าง

```http
PATCH /api/transactions/7
```

Request Body

```json
{
  "title": "Lunch and Coffee",
  "amount": 180
}
```

หากแก้ไขสำเร็จ

```text
200 OK
```

ตัวอย่าง Response

```json
{
  "id": 7,
  "title": "Lunch and Coffee",
  "amount": 180,
  "category": "Food",
  "type": "expense",
  "date": "2026-09-30"
}
```

หากไม่พบ ID

```text
404 Not Found
```

---

## DELETE Transaction

ใช้สำหรับลบ Transaction ตาม ID

```http
DELETE /api/transactions/:id
```

ตัวอย่าง

```http
DELETE /api/transactions/7
```

หากลบสำเร็จ

```text
204 No Content
```

Response จะไม่มี Body

---

## Validation

Backend จะตรวจสอบข้อมูลก่อนเพิ่มหรือแก้ไข Transaction

ข้อมูลหลักประกอบด้วย

```text
title
amount
category
type
date
```

`amount` ต้องเป็นตัวเลขที่มากกว่า

```text
0
```

`type` ต้องเป็น

```text
income
```

หรือ

```text
expense
```

Category ที่รองรับ

```text
Food
Transport
Shopping
Bills
Entertainment
Salary
Other
```

Date ใช้รูปแบบ

```text
YYYY-MM-DD
```

---

## Error Handling

### 400 Bad Request

หากส่งข้อมูลไม่ครบ เช่น

```json
{
  "title": "Coffee"
}
```

Server จะตอบกลับ

```text
400 Bad Request
```

พร้อม Response

```json
{
  "message": "title, amount, category, type and date are required"
}
```

### 404 Not Found

ตัวอย่าง Request

```http
GET /api/transactions/9999
```

หากไม่มี Transaction ID ดังกล่าว ระบบจะตอบ

```text
404 Not Found
```

Response

```json
{
  "message": "Transaction not found"
}
```

---

# HTTP Status Codes

| Status Code | Description |
|---|---|
| `200 OK` | GET หรือ PATCH สำเร็จ |
| `201 Created` | POST สำเร็จ |
| `204 No Content` | DELETE สำเร็จ |
| `400 Bad Request` | ข้อมูลไม่ถูกต้องหรือไม่ครบ |
| `404 Not Found` | ไม่พบ Transaction หรือ API Endpoint |

---

# API Testing

REST API ถูกทดสอบด้วย Thunder Client

ผลการทดสอบที่ผ่านแล้ว

```text
GET       200 OK
POST      201 Created
PATCH     200 OK
DELETE    204 No Content
Invalid Request   400 Bad Request
Unknown ID        404 Not Found
```

---

## GET Test

Request

```http
GET http://localhost:3000/api/transactions
```

ผลลัพธ์

```text
200 OK
```

![GET Transactions](screenshots/get-transactions.png)

---

## POST Test

Request

```http
POST http://localhost:3000/api/transactions
```

ตัวอย่าง Request Body

```json
{
  "title": "Lunch",
  "amount": 120,
  "category": "Food",
  "type": "expense",
  "date": "2026-09-30"
}
```

ผลลัพธ์

```text
201 Created
```

![POST Transaction](screenshots/post-transaction.png)

---

## PATCH Test

Request

```http
PATCH http://localhost:3000/api/transactions/7
```

ตัวอย่าง Request Body

```json
{
  "title": "Lunch and Coffee",
  "amount": 180
}
```

ผลลัพธ์

```text
200 OK
```

![PATCH Transaction](screenshots/patch-transaction.png)

---

## DELETE Test

Request

```http
DELETE http://localhost:3000/api/transactions/7
```

ผลลัพธ์

```text
204 No Content
```

![DELETE Transaction](screenshots/delete-transaction.png)

---

## 400 Validation Test

ตัวอย่าง Request Body ที่ข้อมูลไม่ครบ

```json
{
  "title": "Coffee"
}
```

ผลลัพธ์

```text
400 Bad Request
```

![400 Bad Request](screenshots/error-400.png)

---

## 404 Error Test

Request

```http
GET http://localhost:3000/api/transactions/9999
```

ผลลัพธ์

```text
404 Not Found
```

![404 Not Found](screenshots/error-404.png)

---

# Frontend and Backend Connection

Frontend ติดต่อ Backend ผ่าน Fetch API

## GET Example

```javascript
fetch("/api/transactions");
```

## POST Example

```javascript
fetch("/api/transactions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(transaction)
});
```

## PATCH Example

```javascript
fetch(`/api/transactions/${id}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(updatedTransaction)
});
```

## DELETE Example

```javascript
fetch(`/api/transactions/${id}`, {
  method: "DELETE"
});
```

---

# Transaction Data Storage

ข้อมูล Transaction ถูกเก็บในไฟล์

```text
server/transactions.json
```

ตัวอย่าง

```json
[
  {
    "id": 1,
    "title": "Salary",
    "amount": 35000,
    "category": "Salary",
    "type": "income",
    "date": "2026-09-01"
  }
]
```

เมื่อเพิ่ม แก้ไข หรือลบ Transaction ระบบ Backend จะอัปเดตข้อมูลใน `transactions.json`

---

# LocalStorage

LocalStorage ถูกใช้สำหรับข้อมูลและการตั้งค่าฝั่ง Client เช่น

```text
Theme
Budget & Goals
Animation Preference
Notification Preference
Demo Data
```

ตัวอย่าง Key

```text
theme
goals
moneyMateAnimation
moneyMateNotifications
moneyMateDemoTransactions
```

ข้อมูล Transaction หลักจะใช้ Backend และ `server/transactions.json` เมื่อ Server สามารถเชื่อมต่อได้

---

# System Workflow

การทำงานหลักของ Transaction

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
transactions.json
```

การทำงานของ Budget & Goals

```text
User
 │
 ▼
Create Goal / Add Saving
 │
 ▼
JavaScript
 │
 ▼
LocalStorage
 │
 ▼
Goal Progress
```

---

# User Interface

MoneyMate ใช้แนวทางการออกแบบแบบ Modern FinTech Dashboard และ Glassmorphism

องค์ประกอบหลักของระบบประกอบด้วย

```text
Dashboard
Transactions
Analytics
Budget & Goals
Calendar
Settings
```

ระบบรองรับ Responsive Design สำหรับขนาดหน้าจอที่แตกต่างกัน

Icons ภายในระบบใช้ Phosphor Icons แบบ Duotone

---

# Themes

MoneyMate มี Theme จำนวน 4 รูปแบบ

## Cloud

Light Theme สำหรับหน้าจอสว่าง

## Midnight

Dark Blue Theme

## Forest

Dark Emerald Theme

## Lavender

Purple / Pink Theme

Theme สามารถเปลี่ยนได้จาก

```text
Settings → Appearance
```

Theme ที่ผู้ใช้เลือกจะถูกบันทึกใน LocalStorage

---

# Demo Mode

หาก Frontend ไม่สามารถเชื่อมต่อกับ

```text
/api/transactions
```

ระบบสามารถใช้ Demo Data จาก LocalStorage เพื่อให้สามารถทดสอบ Frontend ได้

เมื่อเชื่อมต่อ Express Server สำเร็จ ระบบจะใช้ข้อมูล Transaction จาก

```text
server/transactions.json
```

ผ่าน REST API

---

# GitHub Repository

https://github.com/Yin-Yew/Mini-project-MoneyMate

---

# Report

เอกสารรายงานโปรเจกต์จัดเก็บไว้ในไฟล์

```text
report.pdf
```

เนื้อหารายงานประกอบด้วย

```text
Introduction
Objectives
System Design
Project Structure
Frontend Design
Backend Design
REST API
API Testing
Error Handling
Screenshots
Conclusion
```

---

# Conclusion

MoneyMate เป็น Full-Stack Personal Finance Tracker ที่ช่วยให้ผู้ใช้สามารถจัดการข้อมูลรายรับและรายจ่ายผ่านเว็บแอปพลิเคชันได้

ระบบรองรับการเพิ่ม แก้ไข ลบ ค้นหา และ Filter Transaction พร้อมเชื่อมต่อ Frontend กับ Backend ผ่าน REST API

ข้อมูล Transaction ถูกจัดเก็บใน `server/transactions.json` และสามารถเรียกใช้งานผ่าน HTTP Methods ได้แก่ GET, POST, PATCH และ DELETE

ระบบยังแสดงข้อมูลในรูปแบบ Dashboard, Charts, Analytics และ Calendar เพื่อช่วยให้ผู้ใช้มองเห็นภาพรวมทางการเงินได้ง่ายขึ้น

นอกจากนี้ยังมีระบบ Budget & Goals สำหรับสร้างเป้าหมายการออม เพิ่มเงินเข้าเป้าหมายเดิม และติดตามความคืบหน้าผ่าน Progress Bar

โปรเจกต์นี้แสดงการประยุกต์ใช้ความรู้เกี่ยวกับ

```text
HTML
CSS
JavaScript
Node.js
Express.js
REST API
HTTP Methods
JSON
LocalStorage
Fetch API
Chart.js
Git
GitHub
```

ในการพัฒนา Full-Stack Web Application

