const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

const DATA_FILE = path.join(
    __dirname,
    "transactions.json"
);

const PUBLIC_DIR = path.join(
    __dirname,
    "../public"
);

const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Salary",
    "Other"
];

const types = [
    "income",
    "expense"
];

app.use(express.json());

app.use(
    express.static(PUBLIC_DIR)
);


function readTransactions() {

    try {

        const data = fs.readFileSync(
            DATA_FILE,
            "utf8"
        );

        return JSON.parse(data);

    } catch (error) {

        return [];

    }

}


function writeTransactions(data) {

    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(
            data,
            null,
            2
        ),
        "utf8"
    );

}


function isValidDate(date) {

    if (
        typeof date !== "string"
    ) {
        return false;
    }

    const pattern =
        /^\d{4}-\d{2}-\d{2}$/;

    if (
        !pattern.test(date)
    ) {
        return false;
    }

    const parsed =
        new Date(
            `${date}T00:00:00`
        );

    return !Number.isNaN(
        parsed.getTime()
    );

}


function validateTransaction(
    transaction,
    partial = false
) {

    if (!partial) {

        if (
            !transaction.title ||
            transaction.amount === undefined ||
            !transaction.category ||
            !transaction.type ||
            !transaction.date
        ) {

            return {
                valid: false,
                message:
                "title, amount, category, type and date are required"
            };

        }

    }


    if (
        transaction.title !== undefined
    ) {

        if (
            typeof transaction.title !==
            "string" ||
            transaction.title.trim() ===
            ""
        ) {

            return {
                valid: false,
                message:
                "title must not be empty"
            };

        }

    }


    if (
        transaction.amount !== undefined
    ) {

        const amount =
            Number(
                transaction.amount
            );

        if (
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            return {
                valid: false,
                message:
                "amount must be greater than 0"
            };

        }

    }


    if (
        transaction.category !== undefined
    ) {

        if (
            !categories.includes(
                transaction.category
            )
        ) {

            return {
                valid: false,
                message:
                "invalid category"
            };

        }

    }


    if (
        transaction.type !== undefined
    ) {

        if (
            !types.includes(
                transaction.type
            )
        ) {

            return {
                valid: false,
                message:
                "type must be income or expense"
            };

        }

    }


    if (
        transaction.date !== undefined
    ) {

        if (
            !isValidDate(
                transaction.date
            )
        ) {

            return {
                valid: false,
                message:
                "date must use YYYY-MM-DD format"
            };

        }

    }


    return {
        valid: true
    };

}


app.get(
    "/api/transactions",
    (req, res) => {

        let transactions =
            readTransactions();


        const {
            type,
            category,
            month,
            year
        } = req.query;


        if (type) {

            transactions =
                transactions.filter(
                    transaction =>
                        transaction.type ===
                        type
                );

        }


        if (category) {

            transactions =
                transactions.filter(
                    transaction =>
                        transaction.category
                        .toLowerCase() ===
                        category.toLowerCase()
                );

        }


        if (month) {

            const targetMonth =
                Number(month);

            transactions =
                transactions.filter(
                    transaction => {

                        const date =
                            new Date(
                                `${transaction.date}T00:00:00`
                            );

                        return (
                            date.getMonth() +
                            1 ===
                            targetMonth
                        );

                    }
                );

        }


        if (year) {

            const targetYear =
                Number(year);

            transactions =
                transactions.filter(
                    transaction => {

                        const date =
                            new Date(
                                `${transaction.date}T00:00:00`
                            );

                        return (
                            date.getFullYear() ===
                            targetYear
                        );

                    }
                );

        }


        res.status(200).json(
            transactions
        );

    }
);


app.get(
    "/api/transactions/:id",
    (req, res) => {

        const transactions =
            readTransactions();


        const id =
            Number(
                req.params.id
            );


        const transaction =
            transactions.find(
                item =>
                    Number(item.id) ===
                    id
            );


        if (!transaction) {

            return res
                .status(404)
                .json({
                    message:
                    "Transaction not found"
                });

        }


        res.status(200).json(
            transaction
        );

    }
);


app.post(
    "/api/transactions",
    (req, res) => {

        const validation =
            validateTransaction(
                req.body
            );


        if (!validation.valid) {

            return res
                .status(400)
                .json({
                    message:
                    validation.message
                });

        }


        const transactions =
            readTransactions();


        const nextId =
            transactions.length
            ? Math.max(
                ...transactions.map(
                    transaction =>
                        Number(
                            transaction.id
                        )
                )
            ) + 1
            : 1;


        const newTransaction = {

            id: nextId,

            title:
                req.body.title.trim(),

            amount:
                Number(
                    req.body.amount
                ),

            category:
                req.body.category,

            type:
                req.body.type,

            date:
                req.body.date

        };


        transactions.push(
            newTransaction
        );


        writeTransactions(
            transactions
        );


        res
            .status(201)
            .json(
                newTransaction
            );

    }
);


app.patch(
    "/api/transactions/:id",
    (req, res) => {

        const transactions =
            readTransactions();


        const id =
            Number(
                req.params.id
            );


        const index =
            transactions.findIndex(
                transaction =>
                    Number(
                        transaction.id
                    ) === id
            );


        if (index === -1) {

            return res
                .status(404)
                .json({
                    message:
                    "Transaction not found"
                });

        }


        if (
            Object.keys(
                req.body
            ).length === 0
        ) {

            return res
                .status(400)
                .json({
                    message:
                    "No data provided"
                });

        }


        const validation =
            validateTransaction(
                req.body,
                true
            );


        if (!validation.valid) {

            return res
                .status(400)
                .json({
                    message:
                    validation.message
                });

        }


        const updatedTransaction = {

            ...transactions[index],

            ...req.body,

            id:
                transactions[index].id

        };


        if (
            req.body.title !==
            undefined
        ) {

            updatedTransaction.title =
                req.body.title.trim();

        }


        if (
            req.body.amount !==
            undefined
        ) {

            updatedTransaction.amount =
                Number(
                    req.body.amount
                );

        }


        transactions[index] =
            updatedTransaction;


        writeTransactions(
            transactions
        );


        res
            .status(200)
            .json(
                updatedTransaction
            );

    }
);


app.delete(
    "/api/transactions/:id",
    (req, res) => {

        const transactions =
            readTransactions();


        const id =
            Number(
                req.params.id
            );


        const index =
            transactions.findIndex(
                transaction =>
                    Number(
                        transaction.id
                    ) === id
            );


        if (index === -1) {

            return res
                .status(404)
                .json({
                    message:
                    "Transaction not found"
                });

        }


        transactions.splice(
            index,
            1
        );


        writeTransactions(
            transactions
        );


        res.status(204).send();

    }
);


app.use(
    "/api",
    (req, res) => {

        res
            .status(404)
            .json({
                message:
                "API endpoint not found"
            });

    }
);


app.listen(
    PORT,
    () => {

        console.log(
            `MoneyMate server running at http://localhost:${PORT}`
        );

    }
);

