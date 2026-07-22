module.exports = (db) => {

    const queries = [

        `CREATE TABLE IF NOT EXISTS hr_master(
            hr_id VARCHAR(20) PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            registered BOOLEAN DEFAULT FALSE
        )`,

        `CREATE TABLE IF NOT EXISTS user(
            user_id INT AUTO_INCREMENT PRIMARY KEY,
            hr_id VARCHAR(20) UNIQUE,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(15),
            role ENUM('HR','MANAGER','EMPLOYEE') NOT NULL,
            FOREIGN KEY(hr_id) REFERENCES hr_master(hr_id)
        )`,

        `CREATE TABLE IF NOT EXISTS manager(
            manager_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            department VARCHAR(100),
            FOREIGN KEY(user_id) REFERENCES user(user_id)
        )`,

        `CREATE TABLE IF NOT EXISTS employee(
            employee_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            department VARCHAR(100),
            designation VARCHAR(100),
            joining_date DATE,
            manager_id INT,
            onboarding_status ENUM(
                'NOT_STARTED',
                'IN_PROGRESS',
                'COMPLETED'
            ) DEFAULT 'NOT_STARTED',

            FOREIGN KEY(user_id) REFERENCES user(user_id),

            FOREIGN KEY(manager_id) REFERENCES manager(manager_id)
        )`,

        `INSERT IGNORE INTO hr_master
        (hr_id,name,email)

        VALUES

        ('HR1001','Akshaya','Akshaya@gmail.com'),

        ('HR1002','Ravi Kumar','ravi@gmail.com'),

        ('HR1003','Priya Sharma','priya@gmail.com'),

        ('HR1004','Rahul Verma','rahul@gmail.com'),

        ('HR1005','Sneha Reddy','sneha@gmail.com')`

    ];

    function execute(index){

        if(index >= queries.length){

            console.log("Database Initialized Successfully");

            return;

        }

        db.query(queries[index], (err)=>{

            if(err){

                console.log(err);

                return;

            }

            execute(index + 1);

        });

    }

    execute(0);

};