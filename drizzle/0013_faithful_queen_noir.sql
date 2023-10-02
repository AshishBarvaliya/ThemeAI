ALTER TABLE "reset_password" ALTER COLUMN "expiresAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_token" ALTER COLUMN "expiresAt" SET NOT NULL;