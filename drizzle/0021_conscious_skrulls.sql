CREATE TABLE IF NOT EXISTS "feedback_theme" (
	"id" text PRIMARY KEY NOT NULL,
	"color_1" text NOT NULL,
	"color_1_reason" text NOT NULL,
	"color_2" text NOT NULL,
	"color_2_reason" text NOT NULL,
	"color_3" text NOT NULL,
	"color_3_reason" text NOT NULL,
	"color_4" text NOT NULL,
	"color_4_reason" text NOT NULL,
	"isDark" boolean DEFAULT false,
	"prompt" text,
	"createdAt" timestamp DEFAULT now(),
	"userId" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback_theme" ADD CONSTRAINT "feedback_theme_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
