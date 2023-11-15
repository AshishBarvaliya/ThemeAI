CREATE TABLE IF NOT EXISTS "views" (
	"id" text PRIMARY KEY NOT NULL,
	"themeId" text NOT NULL,
	"userIp" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "views" ADD CONSTRAINT "views_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
