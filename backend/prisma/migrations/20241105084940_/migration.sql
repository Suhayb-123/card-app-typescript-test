/*
  Warnings:

  - Added the required column `scheduledDate` to the `Entry` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL,
    "scheduledDate" DATETIME NOT NULL
);
INSERT INTO "new_Entry" ("created_at", "description", "id", "title") SELECT "created_at", "description", "id", "title" FROM "Entry";
DROP TABLE "Entry";
ALTER TABLE "new_Entry" RENAME TO "Entry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
