CREATE TABLE IF NOT EXISTS "support_ticket" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"description" text NOT NULL,
	"topic" text NOT NULL
);
