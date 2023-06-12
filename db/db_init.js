const db = require("./db_connection");

/**** Drop existing tables, if any ****/

const drop_addons_table_sql = "DROP TABLE IF EXISTS addons;"

db.execute(drop_addons_table_sql);

const drop_menu_table_sql = "DROP TABLE IF EXISTS menu;"

db.execute(drop_menu_table_sql);


/**** Create tables ****/

const create_menu_table_sql = `
    CREATE TABLE menu (
        menu_id INT PRIMARY KEY,
        menu_name VARCHAR(255) NOT NULL,
        menu_desc TEXT,
        price DOUBLE NOT NULL,
        order_type VARCHAR(255) NULL,
        amount INT NOT NULL
    );
`
db.execute(create_menu_table_sql);

const create_addons_table_sql = `
    CREATE TABLE addons (
        addons_id INT PRIMARY KEY,
        menu_id INT NOT NULL,
        addons_type VARCHAR(255) NOT NULL,
        FOREIGN KEY (menu_id) REFERENCES menu(menu_id)
    );
`

db.execute(create_addons_table_sql);

db.end();


