

CREATE TABLE users
(
    id       serial PRIMARY KEY,
    user_name     VARCHAR(255),
    user_password VARCHAR(255)
);


CREATE TABLE todolists
(
    id    serial PRIMARY KEY,
    user_id INTEGER ,
    title VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users (id) ON delete cascade
);

CREATE TABLE tasks
(
    id         serial PRIMARY KEY,
    title      VARCHAR(255),
    status     INT,
    todoListId INTEGER,
    FOREIGN KEY (todoListId) REFERENCES todolists (id) ON delete cascade
);

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket = sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})



-- CREATE TABLE staff (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR (50),
--     designation VARCHAR (50)
--                    );
--
-- CREATE TABLE info (
--     info_id INTEGER NOT NULL,
--  staff_id INTEGER REFERENCES staff (id) ON delete cascade,
--   team_lead VARCHAR (50), PRIMARY KEY (info_id,staff_id));
