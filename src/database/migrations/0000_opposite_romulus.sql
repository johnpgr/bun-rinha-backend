-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "pessoas" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"apelido" varchar(32) NOT NULL,
	"nome" varchar(100) NOT NULL,
	"nascimento" char(10) NOT NULL,
	"stack" varchar(1024),
	"busca_trgm" text,
	CONSTRAINT "pessoas_apelido_key" UNIQUE("apelido")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_pessoas_busca_trgm" ON "pessoas" ("busca_trgm");
*/