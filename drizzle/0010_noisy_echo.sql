CREATE TABLE IF NOT EXISTS "purchase" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"stripeSessionId" text NOT NULL,
	"stripeCustomerId" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
