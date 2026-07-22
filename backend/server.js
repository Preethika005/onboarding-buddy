const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./db");


const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Running");
});





// HR SIGNUP API

app.post("/signup", async (req, res) => {

    const {
        hrId,
        fullName,
        email,
        phone,
        password
    } = req.body;

    // Step 1: Check HR ID

    const checkHrSql = `
        SELECT *
        FROM hr_master
        WHERE hr_id = ?
    `;

    db.query(checkHrSql, [hrId], async (err, hrResult) => {

        if (err) {

            return res.status(500).json({
                success: false,
                message: "Database Error"
            });

        }

        // HR ID doesn't exist

        if (hrResult.length === 0) {

            return res.status(400).json({
                success: false,
                message: "Invalid HR ID"
            });

        }

        const hr = hrResult[0];

        // Already Registered

        if (hr.registered) {

            return res.status(400).json({
                success: false,
                message: "HR already registered"
            });

        }

        // Email Validation

        if (hr.email !== email) {

            return res.status(400).json({
                success: false,
                message: "Email doesn't match HR record"
            });

        }

        try {

            // Hash Password

            const hashedPassword = await bcrypt.hash(password, 10);

            const insertSql = `
                INSERT INTO user
                (
                    hr_id,
                    name,
                    email,
                    password,
                    phone,
                    role
                )

                VALUES(?,?,?,?,?,?)
            `;

            db.query(

                insertSql,

                [
                    hrId,
                    fullName,
                    email,
                    hashedPassword,
                    phone,
                    "HR"
                ],

                (err) => {

                    if (err) {

                        return res.status(500).json({
                            success: false,
                            message: "Unable to create account"
                        });

                    }

                    // Update hr_master

                    const updateSql = `
                        UPDATE hr_master
                        SET registered = true
                        WHERE hr_id = ?
                    `;

                    db.query(updateSql, [hrId]);

                    res.json({

                        success: true,

                        message: "HR Registered Successfully"

                    });

                }

            );

        }

        catch {

            res.status(500).json({

                success: false,

                message: "Server Error"

            });

        }

    });

});


// LOGIN API

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const sql = `
//     SELECT
//         u.user_id,
//         u.name,
//         u.email,
//         u.phone,
//         u.role,

//         e.employee_id,
//         e.department,
//         e.designation,
//         e.joining_date,
//         e.manager_id,
//         e.onboarding_status

//     FROM user u

//     LEFT JOIN employee e
//     ON u.user_id = e.user_id

//     WHERE u.email = ?
//     AND u.password = ?
//     `;

//   db.query(sql, [email, password], (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: "Database Error",
//       });
//     }

//     if (result.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid Credentials",
//       });
//     }

//     res.json({
//       success: true,
//       user: result[0],
//     });
//   });
// });


// LOGIN API

app.post("/login", (req, res) => {
  console.log("LOGIN API CALLED");


  const { email, password } = req.body;

  const sql = `
  SELECT
      u.user_id,
      u.hr_id,
      u.name,
      u.email,
      u.password,
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
  `;

  db.query(sql, [email], async (err, result) => {

      if (err) {

          return res.status(500).json({
              success: false,
              message: "Database Error"
          });

      }

      if (result.length === 0) {

          return res.status(401).json({
              success: false,
              message: "Invalid Email"
          });

      }

      const user = result[0];

      console.log("Entered Password:", password);
      console.log("Stored Hash:", user.password);

      const passwordMatch = await bcrypt.compare(
          password,
          user.password
      );

      console.log("Password Match:", passwordMatch);


      if (!passwordMatch) {

          return res.status(401).json({
              success: false,
              message: "Invalid Password"
          });

      }

      delete user.password;

      res.json({
          success: true,
          user
      });

  });

    

});

// app.post("/addEmployee", async(req, res) => {
//   const {
//     name,
//     email,
//     password,
//     phone,
//     department,
//     designation,
//     joining_date,
//     manager_id,
//   } = req.body;

//   const userSql = `
//     INSERT INTO user
//     (name,email,password,phone,role)
//     VALUES(?,?,?,?,?)
//     `;

//   db.query(
//     userSql,
//     [name, email, password, phone, "EMPLOYEE"],
//     (err, userResult) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: "Unable to create user",
//         });
//       }

//       const userId = userResult.insertId;

//       const employeeSql = `
//             INSERT INTO employee
//             (user_id,
//             department,
//             designation,
//             joining_date,
//             manager_id)

//             VALUES(?,?,?,?,?)
//             `;

//       db.query(
//         employeeSql,
//         [userId, department, designation, joining_date, manager_id],
//         (err) => {
//           if (err) {
//             return res.status(500).json({
//               success: false,
//               message: "Unable to create employee",
//             });
//           }

//           res.json({
//             success: true,
//             message: "Employee Added Successfully",
//           });
//         },
//       );
//     },
//   );
// });

app.post("/addEmployee", async (req, res) => {
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

  try {

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const userSql = `
      INSERT INTO user
      (name, email, password, phone, role)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      userSql,
      [name, email, hashedPassword, phone, "EMPLOYEE"],
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
          (
            user_id,
            department,
            designation,
            joining_date,
            manager_id
          )
          VALUES (?, ?, ?, ?, ?)
        `;

        db.query(
          employeeSql,
          [
            userId,
            department,
            designation,
            joining_date,
            manager_id,
          ],
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

          }
        );

      }
    );

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
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
