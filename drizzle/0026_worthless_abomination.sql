CREATE TABLE IF NOT EXISTS "user_views" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"userIp" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "views" RENAME TO "theme_views";--> statement-breakpoint
ALTER TABLE "theme_views" DROP CONSTRAINT "views_themeId_theme_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme_views" ADD CONSTRAINT "theme_views_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_views" ADD CONSTRAINT "user_views_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
