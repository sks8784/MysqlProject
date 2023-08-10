const db = require("../database/connect");

const createDatabase=async(req,res)=>{
    const sql = `CREATE DATABASE IF NOT EXISTS Demo_Project`;
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
            message : "Database created successfully"
        });
    });
}

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


const createUser = async(req,res)=>{
    
    const q = "INSERT INTO `user` ( `id`, `name`) VALUES (?)";
    const values = [req.body.id, req.body.name]
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }

        return res.status(200).json({
            success : true,
            message : "user created successfully",
            data : data
        });
    })
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


const createCandidate=async(req,res)=>{
    
    const q = "INSERT INTO `candidate` ( `id`, `uid`, `candidateName`) VALUES (?)";
    const values = [req.body.id, req.body.uid, req.body.candidateName];
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }

        return res.status(200).json({
            success : true,
            message : "candidate created successfully",
            data : data
        });
    })
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

const candidateStatus=async(req,res)=>{
    
    const q = "INSERT INTO `candidateStatus` ( `id`, `cid`, `status`,`statusUpdatedAt`) VALUES (?)";
    const values = [req.body.id, req.body.cid, req.body.status, req.body.statusUpdatedAt];
    db.query(q,[values],(err,data)=>{
        if(err){
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }

        return res.status(200).json({
            success : true,
            message : "candidate status updated successfully",
            data : data
        });
    })
}


const getCount=async(req,res)=>{
    
    const q = `SELECT cs.status FROM candidatestatus AS cs INNER JOIN candidate AS c ON cs.cid=c.id INNER JOIN user AS u ON c.uid=u.id WHERE u.id=${req.params.id}`;
    db.query(q,(err,data)=>{
        if(err){
            return res.status(500).json({
                success : "false",
                message : "something went wrong",
                error : err
            });
        }

        let joinedCnt=0;let interviewCnt=0;
        data.forEach((element)=>{
            if(element.status==="joined"){
                joinedCnt++;
            }
            else{
                interviewCnt++;
            }
        });
        
        return res.status(200).json({
            uid : req.params.id,
            TotalCandidates:data.length,
            Joined:joinedCnt,
            Interview:interviewCnt
        });
    })
}


module.exports = {
    createDatabase,
    createUserTable,
    createUser,
    createCandidateTable,
    createCandidate,
    createCandidateStatusTable,
    candidateStatus,
    getCount
}