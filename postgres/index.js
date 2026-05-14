const { Client } = require('pg');

const client = new Client({
    database: "smartreceiptsdb",
    host: "localhost",
    user: "postgres",
    password: "POSTgres@6969",
    port: 5432,
});

client.connect();

client.query('SELECT * FROM bills', (err, res) => {
    if(!err)
        console.log(res.rows);
    else
        console.log(err.message);

    client.end;
});