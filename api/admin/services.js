const pool = require('../../database/database')


module.exports = {
    create: (data, callback) =>
        pool.query(
            `INSERT INTO admin (username,email,password,position,name)
            VALUES (?,?,?,?,?)
            `,
            [
                data.username,
                data.email,
                data.password,
                data.position,
                data.name
            ],
            (err, result) => err ? callback(err) : callback(null, result)
        ),

    get: callback => pool.query(
        `select * from admin`,
        [],
        (err, result) => err ? callback(err) : callback(null, result)
    ),

    getById: (id, callback) =>
        pool.query(
            `select * from admin where id = ?`,
            [id],
            (err, result) => err ? callback(err) : callback(null, result)
        ),

    getByEmail: (email, callback) => pool.query(
        `select * from admin where email = ?`,
        [email],
        (err, result) => err ? callback(err) : callback(null, result[0])
    ),

    update: (data, callback) => pool.query(
        `update admin set username=?, email=?, password=?, position=?, name=? where id = ?`,

        [
            data.username,
            data.email,
            data.password,
            data.position,
            data.name,
            data.id
        ],
        (err, result) => err ? callback(err) : callback(null, result)
    ),

    remove: (data, callback) => pool.query(
        `delete from admin where id =?`,
        [data.id],
        (err, result) => err ? callback(err) : callback(null, result)

    )


}

