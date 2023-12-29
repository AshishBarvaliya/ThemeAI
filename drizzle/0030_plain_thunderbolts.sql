ALTER TABLE "feedback_theme" DROP CONSTRAINT "feedback_theme_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "purchase" DROP CONSTRAINT "purchase_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "reset_password" DROP CONSTRAINT "reset_password_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "theme" DROP CONSTRAINT "theme_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_views" DROP CONSTRAINT "user_views_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_inappropriate_themes" DROP CONSTRAINT "users_to_inappropriate_themes_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_liked_themes" DROP CONSTRAINT "users_to_liked_themes_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_saved_themes" DROP CONSTRAINT "users_to_saved_themes_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_notifications" DROP CONSTRAINT "users_to_notifications_recipientId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "verification_token" DROP CONSTRAINT "verification_token_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "feedback_theme" ADD CONSTRAINT "feedback_theme_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "purchase" ADD CONSTRAINT "purchase_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reset_password" ADD CONSTRAINT "reset_password_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme" ADD CONSTRAINT "theme_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_views" ADD CONSTRAINT "user_views_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_inappropriate_themes" ADD CONSTRAINT "users_to_inappropriate_themes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_liked_themes" ADD CONSTRAINT "users_to_liked_themes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_saved_themes" ADD CONSTRAINT "users_to_saved_themes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_notifications" ADD CONSTRAINT "users_to_notifications_recipientId_user_id_fk" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
