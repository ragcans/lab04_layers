const db = require("./db_connection");

/**** Read the menu table ****/

const select_menu_sql = "SELECT * FROM menu";

db.execute(select_menu_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'menu' contents:")
        console.log(results);
    }
);


/**** Read the assignments table, joined with subjects table ****/

const select_addons_sql = `
    SELECT 
        m.menu_id, m.menu_name, m.menu_desc, m.price, m.order_type, m.amount, GROUP_CONCAT(a.addons_type SEPARATOR ', ') AS addons
    FROM menu m
    LEFT JOIN addons a 
        ON m.menu_id = a.menu_id
    GROUP BY m.menu_id 
    ORDER BY m.menu_id
`;

db.execute(select_addons_sql, 
    (error, results) => {
        if (error) 
            throw error;

        console.log("Table 'addons' contents:")
        console.log(results);
    }
);

db.end();