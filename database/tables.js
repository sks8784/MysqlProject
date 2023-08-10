const conn=require('./connect');


const db=conn();

const createUserTable=async(req,res)=>{
    const sql = `CREATE TABLE IF NOT EXISTS user (id INT PRIMARY KEY, name VARCHAR(255) NOT NULL)`;
    db.query(sql, function (err, data) {
        if (err) {
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }
        return res.status(200).json({
            success : true,
            message : "User Table created successfully"
        });
    });
}

const createCandidateTable=async(req,res)=>{
    const sql = `CREATE TABLE IF NOT EXISTS candidate (id INT PRIMARY KEY, uid INT NOT NULL, candidateName VARCHAR(255) NOT NULL, FOREIGN KEY (uid) REFERENCES user(id) ON DELETE CASCADE ON UPDATE CASCADE)`;
    db.query(sql, function (err, data) {
        if (err) {
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }
        return res.status(200).json({
            success : true,
            message : "Candidate Table created successfully"
        });
    });
}


const createCandidateStatusTable=async(req,res)=>{
    const sql = `CREATE TABLE IF NOT EXISTS candidateStatus (id INT PRIMARY KEY, cid INT NOT NULL, status VARCHAR(255) NOT NULL, statusUpdatedAt DATE, FOREIGN KEY (cid) REFERENCES candidate(id) ON DELETE CASCADE ON UPDATE CASCADE)`;
    db.query(sql, function (err, data) {
        if (err) {
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }
        return res.status(200).json({
            success : true,
            message : "Candidate Status Table created successfully"
        });
    });
}

module.exports={
    createUserTable,
    createCandidateTable,
    createCandidateStatusTable
}