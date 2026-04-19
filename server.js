const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "client")));

app.get("/menu", (req, res) => {
    const sql = `
        SELECT
            m.id,
            m.name,
            m.price,
            m.description,
            m.category,
            i.name AS ingredient
        FROM meals m
        LEFT JOIN ingredients i ON m.id = i.meal_id
        ORDER BY m.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }

        const mealsMap = {};

        results.forEach((row) => {
            if (!mealsMap[row.id]) {
                mealsMap[row.id] = {
                    id: row.id,
                    name: row.name,
                    price: Number(row.price),
                    description: row.description,
                    category: row.category,
                    ingredients: []
                };
            }

            if (row.ingredient) {
                mealsMap[row.id].ingredients.push(row.ingredient);
            }
        });

        res.json(Object.values(mealsMap));
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
