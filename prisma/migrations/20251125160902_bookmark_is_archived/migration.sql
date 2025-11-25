-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bookmark" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "icon" TEXT,
    "tags" TEXT,
    "description" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "timesVisited" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastVisited" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Bookmark" ("createdAt", "description", "icon", "id", "lastVisited", "tags", "timesVisited", "title", "url", "userId") SELECT "createdAt", "description", "icon", "id", "lastVisited", "tags", "timesVisited", "title", "url", "userId" FROM "Bookmark";
DROP TABLE "Bookmark";
ALTER TABLE "new_Bookmark" RENAME TO "Bookmark";
CREATE UNIQUE INDEX "Bookmark_url_key" ON "Bookmark"("url");
CREATE UNIQUE INDEX "Bookmark_userId_url_key" ON "Bookmark"("userId", "url");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
