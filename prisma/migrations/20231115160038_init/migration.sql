-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT
);

-- CreateTable
CREATE TABLE "Paste" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "password" TEXT,
    "accessControl" TEXT NOT NULL DEFAULT 'public',
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Paste_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
