ALTER TABLE "themes_to_tags" DROP CONSTRAINT "themes_to_tags_tagId_themeId_unique";--> statement-breakpoint
ALTER TABLE "users_to_inappropriate_themes" DROP CONSTRAINT "users_to_inappropriate_themes_userId_themeId_unique";--> statement-breakpoint
ALTER TABLE "users_to_liked_themes" DROP CONSTRAINT "users_to_liked_themes_userId_themeId_unique";--> statement-breakpoint
ALTER TABLE "users_to_saved_themes" DROP CONSTRAINT "users_to_saved_themes_userId_themeId_unique";