CREATE TABLE IF NOT EXISTS "deactivation_request" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"reason" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "generated_themes" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"prompt" text NOT NULL,
	"mode" text NOT NULL,
	"color_1" text NOT NULL,
	"color_1_reason" text NOT NULL,
	"color_2" text NOT NULL,
	"color_2_reason" text NOT NULL,
	"color_3" text NOT NULL,
	"color_3_reason" text NOT NULL,
	"color_4" text NOT NULL,
	"color_4_reason" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "deactivation_request" ADD CONSTRAINT "deactivation_request_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
