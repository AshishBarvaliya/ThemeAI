CREATE TABLE IF NOT EXISTS "reset_password" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"userId" text NOT NULL,
	"expiresAt" timestamp,
	CONSTRAINT "reset_password_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"userId" text NOT NULL,
	"expiresAt" timestamp,
	CONSTRAINT "verification_token_token_unique" UNIQUE("token")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
