CREATE TABLE
  users (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image TEXT,
    PRIMARY KEY (id)
  );
