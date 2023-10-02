DO $$ BEGIN
 CREATE TYPE "like_save_status" AS ENUM('F', 'P', 'N');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "theme" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"color_1" text NOT NULL,
	"color_1_reason" text NOT NULL,
	"color_2" text NOT NULL,
	"color_2_reason" text NOT NULL,
	"color_3" text NOT NULL,
	"color_3_reason" text NOT NULL,
	"color_4" text NOT NULL,
	"color_4_reason" text NOT NULL,
	"font_1" text NOT NULL,
	"font_1_reason" text NOT NULL,
	"font_2" text NOT NULL,
	"font_2_reason" text NOT NULL,
	"prompt" text,
	"isPrivate" boolean DEFAULT false,
	"isAIGenerated" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "themes_to_tags" (
	"themeId" text NOT NULL,
	"tagId" text NOT NULL,
	CONSTRAINT themes_to_tags_themeId_tagId PRIMARY KEY("themeId","tagId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_inappropriate_themes" (
	"userId" text NOT NULL,
	"themeId" text NOT NULL,
	"inappropriateAt" timestamp DEFAULT now(),
	CONSTRAINT users_to_inappropriate_themes_userId_themeId PRIMARY KEY("userId","themeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_liked_themes" (
	"userId" text NOT NULL,
	"themeId" text NOT NULL,
	"likedAt" timestamp DEFAULT now(),
	"status" "like_save_status" NOT NULL,
	CONSTRAINT users_to_liked_themes_userId_themeId PRIMARY KEY("userId","themeId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_to_saved_themes" (
	"userId" text NOT NULL,
	"themeId" text NOT NULL,
	"savedAt" timestamp DEFAULT now(),
	"status" "like_save_status" NOT NULL,
	CONSTRAINT users_to_saved_themes_userId_themeId PRIMARY KEY("userId","themeId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "theme" ADD CONSTRAINT "theme_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "themes_to_tags" ADD CONSTRAINT "themes_to_tags_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "themes_to_tags" ADD CONSTRAINT "themes_to_tags_tagId_tag_id_fk" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_inappropriate_themes" ADD CONSTRAINT "users_to_inappropriate_themes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_inappropriate_themes" ADD CONSTRAINT "users_to_inappropriate_themes_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_liked_themes" ADD CONSTRAINT "users_to_liked_themes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_liked_themes" ADD CONSTRAINT "users_to_liked_themes_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_saved_themes" ADD CONSTRAINT "users_to_saved_themes_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_saved_themes" ADD CONSTRAINT "users_to_saved_themes_themeId_theme_id_fk" FOREIGN KEY ("themeId") REFERENCES "theme"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
