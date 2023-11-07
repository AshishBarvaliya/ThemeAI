DO $$ BEGIN
 CREATE TYPE "feedback_theme_type" AS ENUM('POSITIVE', 'NEGATIVE');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "feedback_theme" ADD COLUMN "feedbackType" "feedback_theme_type" NOT NULL;