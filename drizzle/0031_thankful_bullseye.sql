ALTER TABLE "theme_views" DROP CONSTRAINT "theme_views_themeId_theme_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme_views" ADD CONSTRAINT "theme_views_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
