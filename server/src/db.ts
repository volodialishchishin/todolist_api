import Pool from 'pg';
const pool = new Pool.Pool({
	user:'volodialishchyshyn',
	password:'1212',
	host:'localhost',
	port:5432,
	database: 'dbname'
});

export default pool;



