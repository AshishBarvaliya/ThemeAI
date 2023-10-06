import db from "@/db";
import { eq } from "drizzle-orm";
import {
  themes as themesSchema,
  users as usersSchema,
  usersTonotifications,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import moment from "moment";

export const sendLikeSaveNotification = async ({
  upsertItem,
  sessionId,
  type,
}: {
  upsertItem: any[];
  sessionId: string;
  type: "LIKE" | "SAVE";
}) => {
  if (upsertItem.length > 0 && upsertItem[0].status === "F") {
    const currentTheme = await db.query.themes.findFirst({
      where: eq(themesSchema.id, upsertItem[0].themeId),
      columns: {
        id: true,
        popularity: true,
      },
      with: {
        user: {
          columns: {
            id: true,
            experience: true,
          },
        },
      },
    });
    if (currentTheme && sessionId !== currentTheme.user.id) {
      await db
        .update(usersSchema)
        .set({
          experience: Number(currentTheme?.user.experience || 0) + 15,
        })
        .where(eq(usersSchema.id, currentTheme?.user.id));

      await db
        .update(themesSchema)
        .set({
          popularity: Number(currentTheme?.popularity || 0) + 1,
        })
        .where(eq(themesSchema.id, upsertItem[0].themeId));

      await db.insert(usersTonotifications).values({
        id: createId(),
        recipientId: currentTheme.user.id,
        read: false,
        type: type,
        notifierId: sessionId,
        themeId: upsertItem[0].themeId,
      });
    }
  }
};

export function isOlderThan24Hours(date: Date | null) {
  const now = moment();
  const givenDate = moment(date);
  const differenceInHours = now.diff(givenDate, "hours");

  return differenceInHours >= 24;
}
