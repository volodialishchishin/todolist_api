

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
    userid INTEGER ,
    FOREIGN KEY (todoListId) REFERENCES todolists (id) ON delete cascade
);
