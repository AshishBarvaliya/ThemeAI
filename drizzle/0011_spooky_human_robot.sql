DO $$ BEGIN
 CREATE TYPE "notification_type" AS ENUM('FOLLOW', 'LIKE', 'SAVE', 'REWARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_notifications" (
	"id" text PRIMARY KEY NOT NULL,
	"read" boolean DEFAULT false,
	"type" "notification_type" NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"pupa" integer DEFAULT 0,
	"recipientId" text NOT NULL,
	"notifierId" text NOT NULL,
	"themeId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_notifications" ADD CONSTRAINT "users_to_notifications_recipientId_user_id_fk" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_notifications" ADD CONSTRAINT "users_to_notifications_notifierId_user_id_fk" FOREIGN KEY ("notifierId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_notifications" ADD CONSTRAINT "users_to_notifications_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_stripeSessionId_unique" UNIQUE("stripeSessionId");