import db from "@/db";
import { eq } from "drizzle-orm";
import {
  themes as themesSchema,
  users as usersSchema,
  usersTonotifications,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import moment from "moment";
import { USER_LEVELS } from "@/constants/user";

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
            level: true,
            pupa: true,
          },
        },
      },
    });
    if (currentTheme && sessionId !== currentTheme.user.id) {
      const experience = Number(currentTheme?.user.experience || 0) + 15;
      const level = Number(currentTheme?.user.level || 0);

      if (level < 5 && USER_LEVELS[level].requiredExperience <= experience) {
        await db
          .update(usersSchema)
          .set({
            level: level + 1,
            experience,
            pupa:
              Number(currentTheme?.user.pupa || 0) +
              USER_LEVELS[level + 1].prompts,
          })
          .where(eq(usersSchema.id, currentTheme?.user.id));
      } else {
        await db
          .update(usersSchema)
          .set({
            experience,
          })
          .where(eq(usersSchema.id, currentTheme?.user.id));
      }

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
