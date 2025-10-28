CREATE DATABASE IF NOT EXISTS easy_route
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS prisma_shadow_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'easy_route'@'%' IDENTIFIED BY 'easy_route';

GRANT ALL PRIVILEGES ON easy_route.* TO 'easy_route'@'%';
GRANT ALL PRIVILEGES ON prisma_shadow_db.* TO 'easy_route'@'%';

FLUSH PRIVILEGES;
