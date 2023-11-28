/*
  Warnings:

  - The primary key for the `Paste` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paste" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "password" TEXT,
    "accessControl" TEXT NOT NULL DEFAULT 'public',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Paste_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paste" ("accessControl", "content", "id", "password", "title", "userId") SELECT "accessControl", "content", "id", "password", "title", "userId" FROM "Paste";
DROP TABLE "Paste";
ALTER TABLE "new_Paste" RENAME TO "Paste";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
