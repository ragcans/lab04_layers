const db = require("./db_connection");

/**** Delete *CONTENTS OF* existing tables (but not dropping tables themselves) ****/

const delete_menu_table_sql = "DELETE FROM menu;"

db.execute(delete_menu_table_sql);

const delete_addons_table_sql = "DELETE FROM addons"

db.execute(delete_addons_table_sql);


const insert_menu_sql = `
    INSERT INTO menu 
        (menu_id, menu_name, menu_desc, price, order_type, amount) 
    VALUES 
        (?, ?, ?, ?, ?, ?);
`

db.execute(insert_menu_sql, [1, 'Classic Chicken Sandwich', 'Truly a classic. Fried chicken, american cheese, lettuce, tomato, red onion, pickles & IHOP® sauce.', 8.43, 'Grilled Chicken', 2]);
db.execute(insert_menu_sql, [2, 'Coke', 'Classic Coca Cola with optional ice or swap with qualifying fountain drink.', 0.99, null, 3]);
db.execute(insert_menu_sql, [3, 'Water', 'Simplicity is best. Can come with ice or no ice along with lemon.',  0.99, null, 1]);
db.execute(insert_menu_sql, [4, 'Pancakes', 'A true breakfast classic that started it all. Get five of our fluffy, world-famous buttermilk pancakes topped with whipped real butter.', 9.29, 'souffle', 1]);
db.execute(insert_menu_sql, [5, 'Omelette', 'Our fluffy omelette served with your choice of vegetables.', 13.37, null, 2]);


const insert_addons_sql = `
    INSERT INTO addons
        (addons_id, menu_id, addons_type)
    VALUES
        (?, ?, ?);
`

db.execute(insert_addons_sql, [1, 1, 'extra pickles']);
db.execute(insert_addons_sql, [2, 1, 'extra cheese']);
db.execute(insert_addons_sql, [3, 4, 'blueberries']);
db.execute(insert_addons_sql, [4, 4, 'strawberries']);
db.execute(insert_addons_sql, [5, 4, 'bananas']);
db.execute(insert_addons_sql, [6, 5, 'mushrooms']);
db.execute(insert_addons_sql, [7, 5, 'tomatoes']);
db.execute(insert_addons_sql, [8, 5, 'avocado']);


db.end();