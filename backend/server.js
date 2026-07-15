const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});

// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `
    SELECT
        u.user_id,
        u.name,
        u.email,
        u.phone,
        u.role,

        e.employee_id,
        e.department,
        e.designation,
        e.joining_date,
        e.manager_id,
        e.onboarding_status

    FROM user u

    LEFT JOIN employee e
    ON u.user_id = e.user_id

    WHERE u.email = ?
    AND u.password = ?
    `;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    res.json({
      success: true,
      user: result[0],
    });
  });
});

app.post("/addEmployee", (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    department,
    designation,
    joining_date,
    manager_id,
  } = req.body;

  const userSql = `
    INSERT INTO user
    (name,email,password,phone,role)
    VALUES(?,?,?,?,?)
    `;

  db.query(
    userSql,
    [name, email, password, phone, "EMPLOYEE"],
    (err, userResult) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Unable to create user",
        });
      }

      const userId = userResult.insertId;

      const employeeSql = `
            INSERT INTO employee
            (user_id,
            department,
            designation,
            joining_date,
            manager_id)

            VALUES(?,?,?,?,?)
            `;

      db.query(
        employeeSql,
        [userId, department, designation, joining_date, manager_id],
        (err) => {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Unable to create employee",
            });
          }

          res.json({
            success: true,
            message: "Employee Added Successfully",
          });
        },
      );
    },
  );
});

app.get("/employees", (req, res) => {

    const sql = `
    SELECT
        u.user_id,
        u.name,
        u.email,
        u.phone,
        e.department,
        e.designation,
        e.joining_date,
        e.onboarding_status
    FROM user u
    JOIN employee e
    ON u.user_id = e.user_id
    ORDER BY u.name
    `;

    db.query(sql, (err, result) => {

        if(err){

            return res.status(500).json({
                success:false
            });

        }

        res.json(result);

    });

});

app.get("/managers", (req, res) => {

    const sql = `
    SELECT
        m.Manager_ID,
        u.name,
        m.Department
    FROM manager m
    JOIN user u
    ON m.User_ID = u.user_id
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false
            });
        }

        res.json(result);

    });

});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});
