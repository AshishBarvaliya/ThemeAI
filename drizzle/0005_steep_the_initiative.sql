ALTER TABLE "themes_to_tags" ADD CONSTRAINT "themes_to_tags_tagId_themeId_unique" UNIQUE("tagId","themeId");--> statement-breakpoint
ALTER TABLE "users_to_inappropriate_themes" ADD CONSTRAINT "users_to_inappropriate_themes_userId_themeId_unique" UNIQUE("userId","themeId");--> statement-breakpoint
ALTER TABLE "users_to_liked_themes" ADD CONSTRAINT "users_to_liked_themes_userId_themeId_unique" UNIQUE("userId","themeId");--> statement-breakpoint
ALTER TABLE "users_to_saved_themes" ADD CONSTRAINT "users_to_saved_themes_userId_themeId_unique" UNIQUE("userId","themeId");