import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  title: text("title"),
  location: text("location"),
  organization: text("organization"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  hashedPassword: text("hashedPassword"),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  isActived: boolean("isActive").default(true),
  stripeCustomerId: text("stripeCustomerId"),
  pupa: integer("pupa").default(0),
  experience: integer("experience").default(0),
  level: integer("level").default(0),
  avatar: text("avatar"),
});

export const usersRelations = relations(users, ({ many }) => ({
  createdThemes: many(themes),
  likedThemes: many(usersToLikedThemes),
  savedThemes: many(usersToSavedThemes),
  inappropriateThemes: many(usersToInappropriateThemes),
  following: many(usersToFollows, { relationName: "following" }),
  followers: many(usersToFollows, { relationName: "followers" }),
  purchaseHistory: many(purchases),
  notifications: many(usersTonotifications, {
    relationName: "ReceiverNotification",
  }),
  activities: many(usersTonotifications, {
    relationName: "NotifierNotification",
  }),
  verificationTokens: many(verificationTokens),
  resetPasswords: many(resetPasswords),
}));

export const usersToFollows = pgTable(
  "users_to_follows",
  {
    followerId: text("followerId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: text("followingId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.followerId, t.followingId),
  })
);

export const usersToFollowsRelations = relations(usersToFollows, ({ one }) => ({
  follower: one(users, {
    fields: [usersToFollows.followerId],
    references: [users.id],
    relationName: "following",
  }),
  following: one(users, {
    fields: [usersToFollows.followingId],
    references: [users.id],
    relationName: "followers",
  }),
}));

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
);

export const themes = pgTable("theme", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  color_1: text("color_1").notNull(),
  color_1_reason: text("color_1_reason").notNull(),
  color_2: text("color_2").notNull(),
  color_2_reason: text("color_2_reason").notNull(),
  color_3: text("color_3").notNull(),
  color_3_reason: text("color_3_reason").notNull(),
  color_4: text("color_4").notNull(),
  color_4_reason: text("color_4_reason").notNull(),
  font_1: text("font_1").notNull(),
  font_2: text("font_2").notNull(),
  template: text("template").notNull(),
  prompt: text("prompt"),
  isPrivate: boolean("isPrivate").default(false),
  isAIGenerated: boolean("isAIGenerated").default(false),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  popularity: integer("popularity").default(0),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const themesRelations = relations(themes, ({ one, many }) => ({
  user: one(users, {
    fields: [themes.userId],
    references: [users.id],
  }),
  likedBy: many(usersToLikedThemes),
  savedBy: many(usersToSavedThemes),
  inappropriateBy: many(usersToInappropriateThemes),
  tags: many(themesToTags),
  activities: many(usersTonotifications),
  views: many(views),
}));

export const statusEnum = pgEnum("like_save_status", ["F", "P", "N"]);

export const usersToLikedThemes = pgTable(
  "users_to_liked_themes",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    themeId: text("themeId")
      .notNull()
      .references(() => themes.id),
    likedAt: timestamp("likedAt", { mode: "date" }).defaultNow(),
    status: statusEnum("status").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.themeId),
  })
);

export const usersToLikedThemesRelations = relations(
  usersToLikedThemes,
  ({ one }) => ({
    theme: one(themes, {
      fields: [usersToLikedThemes.themeId],
      references: [themes.id],
    }),
    user: one(users, {
      fields: [usersToLikedThemes.userId],
      references: [users.id],
    }),
  })
);

export const usersToSavedThemes = pgTable(
  "users_to_saved_themes",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    themeId: text("themeId")
      .notNull()
      .references(() => themes.id),
    savedAt: timestamp("savedAt", { mode: "date" }).defaultNow(),
    status: statusEnum("status").notNull(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.themeId),
  })
);

export const usersToSavedThemesRelations = relations(
  usersToSavedThemes,
  ({ one }) => ({
    theme: one(themes, {
      fields: [usersToSavedThemes.themeId],
      references: [themes.id],
    }),
    user: one(users, {
      fields: [usersToSavedThemes.userId],
      references: [users.id],
    }),
  })
);

export const usersToInappropriateThemes = pgTable(
  "users_to_inappropriate_themes",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id),
    themeId: text("themeId")
      .notNull()
      .references(() => themes.id),
    inappropriateAt: timestamp("inappropriateAt", {
      mode: "date",
    }).defaultNow(),
  },
  (t) => ({
    pk: primaryKey(t.userId, t.themeId),
  })
);

export const usersToInappropriateThemesRelations = relations(
  usersToInappropriateThemes,
  ({ one }) => ({
    theme: one(themes, {
      fields: [usersToInappropriateThemes.themeId],
      references: [themes.id],
    }),
    user: one(users, {
      fields: [usersToInappropriateThemes.userId],
      references: [users.id],
    }),
  })
);

export const themesToTags = pgTable(
  "themes_to_tags",
  {
    themeId: text("themeId")
      .notNull()
      .references(() => themes.id),
    tagId: text("tagId")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey(t.themeId, t.tagId),
  })
);

export const themesToTagsRelations = relations(themesToTags, ({ one }) => ({
  tag: one(tags, {
    fields: [themesToTags.tagId],
    references: [tags.id],
  }),
  theme: one(themes, {
    fields: [themesToTags.themeId],
    references: [themes.id],
  }),
}));

export const tags = pgTable("tag", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const purchases = pgTable("purchase", {
  id: text("id").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  stripeSessionId: text("stripeSessionId").notNull().unique(),
  pupa: integer("pupa").default(0),
  stripeCustomerId: text("stripeCustomerId").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const purchasesRelations = relations(purchases, ({ one }) => ({
  user: one(users, {
    fields: [purchases.userId],
    references: [users.id],
  }),
}));

export const notificationTypeEnum = pgEnum("notification_type", [
  "FOLLOW",
  "LIKE",
  "SAVE",
]);

export const usersTonotifications = pgTable("users_to_notifications", {
  id: text("id").notNull().primaryKey(),
  read: boolean("read").default(false),
  type: notificationTypeEnum("type").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  pupa: integer("pupa").default(0),
  recipientId: text("recipientId")
    .notNull()
    .references(() => users.id),
  notifierId: text("notifierId")
    .notNull()
    .references(() => users.id),
  themeId: text("themeId").references(() => themes.id),
});

export const usersTonotificationsRelations = relations(
  usersTonotifications,
  ({ one }) => ({
    recipient: one(users, {
      fields: [usersTonotifications.recipientId],
      references: [users.id],
      relationName: "ReceiverNotification",
    }),
    notifier: one(users, {
      fields: [usersTonotifications.notifierId],
      references: [users.id],
      relationName: "NotifierNotification",
    }),
    theme: one(themes, {
      fields: [usersTonotifications.themeId],
      references: [themes.id],
    }),
  })
);

export const verificationTokens = pgTable("verification_token", {
  id: text("id").notNull().primaryKey(),
  token: text("token").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
});

export const verificationTokensRelations = relations(
  verificationTokens,
  ({ one }) => ({
    user: one(users, {
      fields: [verificationTokens.userId],
      references: [users.id],
    }),
  })
);

export const resetPasswords = pgTable("reset_password", {
  id: text("id").notNull().primaryKey(),
  token: text("token").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expiresAt", { mode: "date" }).notNull(),
});

export const resetPasswordsRelations = relations(resetPasswords, ({ one }) => ({
  user: one(users, {
    fields: [resetPasswords.userId],
    references: [users.id],
  }),
}));

export const supportTickets = pgTable("support_ticket", {
  id: text("id").notNull().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  description: text("description").notNull(),
  topic: text("topic").notNull(),
});

export const feedbackThemeEnum = pgEnum("feedback_theme_type", [
  "POSITIVE",
  "NEGATIVE",
]);

export const feedbackTheme = pgTable("feedback_theme", {
  id: text("id").notNull().primaryKey(),
  color_1: text("color_1").notNull(),
  color_1_reason: text("color_1_reason").notNull(),
  color_2: text("color_2").notNull(),
  color_2_reason: text("color_2_reason").notNull(),
  color_3: text("color_3").notNull(),
  color_3_reason: text("color_3_reason").notNull(),
  color_4: text("color_4").notNull(),
  color_4_reason: text("color_4_reason").notNull(),
  isDark: boolean("isDark").default(false),
  prompt: text("prompt").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  feedbackType: feedbackThemeEnum("feedbackType").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => users.id),
});

export const views = pgTable("views", {
  id: text("id").notNull().primaryKey(),
  themeId: text("themeId")
    .notNull()
    .references(() => themes.id),
  userIp: text("userIp").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
});

export const viewsRelations = relations(views, ({ one }) => ({
  theme: one(themes, {
    fields: [views.themeId],
    references: [themes.id],
  }),
}));
