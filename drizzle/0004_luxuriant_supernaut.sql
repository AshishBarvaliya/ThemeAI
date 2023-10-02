ALTER TABLE "user" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "organization" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "stripeCustomerId" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "pupa" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "experience" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "avatar" text;--> statement-breakpoint
ALTER TABLE "tag" ADD CONSTRAINT "tag_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");