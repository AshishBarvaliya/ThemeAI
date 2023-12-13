DO $$ BEGIN
 CREATE TYPE "theme_template" AS ENUM('Learning', 'Marketing', 'Foodie', 'Dashboard', 'Editor');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "theme" ALTER COLUMN "template" SET DATA TYPE theme_template;