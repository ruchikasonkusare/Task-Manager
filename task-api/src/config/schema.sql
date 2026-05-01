DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20)  NOT NULL DEFAULT 'user',
  created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  status      VARCHAR(20)  NOT NULL DEFAULT 'pending',
  user_id     INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_users_email   ON users(email);



INSERT INTO users (email, password, role)
VALUES (
  'admin@test.com',
  '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQyCkgb7LzimfVNwM.oWuB8Sm',
  'admin'
);