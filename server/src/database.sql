CREATE TABLE todolists (
    id serial PRIMARY KEY,
    title VARCHAR ( 255 )
);

CREATE TABLE tasks(
    title  VARCHAR (255),
    status INT,
    id serial PRIMARY KEY,
    todoListId INTEGER ,
    FOREIGN KEY (todoListId) REFERENCES todolists (id) ON delete cascade
);


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
