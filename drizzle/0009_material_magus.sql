CREATE TABLE IF NOT EXISTS "users_to_follows" (
	"followerId" text NOT NULL,
	"followingId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT users_to_follows_followerId_followingId PRIMARY KEY("followerId","followingId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_follows" ADD CONSTRAINT "users_to_follows_followerId_user_id_fk" FOREIGN KEY ("followerId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_follows" ADD CONSTRAINT "users_to_follows_followingId_user_id_fk" FOREIGN KEY ("followingId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
