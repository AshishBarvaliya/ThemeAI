import Typography from "@/components/ui/typography";
import moment from "moment";

export interface PrivacyPolicyProps {
  title: string;
  description: string | React.ReactNode;
}

export const privacyPolicy: PrivacyPolicyProps[] = [
  {
    title: "Privacy Policy for ThemeGPT",
    description:
      "Welcome to ThemeGPT. At ThemeGPT, we are committed to safeguarding your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data while using our website and services. By using ThemeGPT, you agree to the practices described in this policy.",
  },
  {
    title: "Information We Collect",
    description: (
      <div className="flex flex-col">
        <Typography element={"p"} as="p" className="font-bold">
          User Profile Information:
        </Typography>
        To provide a personalized experience, we collect and store information
        you provide when creating an account, such as your username and email
        address.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Theme Data:
        </Typography>
        When using our AI color theme creation and manual color picker tools, we
        may collect and store the color themes you create.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Social Interaction Data:
        </Typography>
        When interacting with other users on ThemeGPT, such as liking and saving
        themes or following other users, we may collect and store these
        interactions.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Prompts Data:
        </Typography>
        We collect data related to the prompts you use, including the number of
        prompts {"you've"} used and purchased.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Experience Points:
        </Typography>
        We collect and store information related to experience points and levels
        you achieve on ThemeGPT.
      </div>
    ),
  },
  {
    title: "How We Use Your Information",
    description: (
      <div className="flex flex-col">
        We use the collected information for the following purposes:
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Account Management:
        </Typography>
        To manage your account, provide customer support, and send important
        notifications.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Theme Creation:
        </Typography>
        To save and retrieve your created color themes.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Social Features:
        </Typography>
        To enable social interactions, such as liking and saving themes and
        following other users.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Prompts Management:
        </Typography>
        To keep track of the number of prompts used and purchased.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Experience Points and Levels:
        </Typography>
        To track your progress and grant you free prompts as you reach new
        levels.
      </div>
    ),
  },
  {
    title: "Data Security",
    description:
      "We take data security seriously and employ industry-standard measures to protect your information. This includes encryption, secure storage, and access controls to prevent unauthorized access or data breaches.",
  },
  {
    title: "Data Sharing",
    description:
      "We do not sell or share your personal information with third parties without your explicit consent. We may share aggregated, non-identifiable data for analytical and statistical purposes.",
  },
  {
    title: "Your Choices",
    description:
      "You can manage your account preferences and opt out of promotional emails through your account settings. You may also request the removal of your account and data by contacting our support team.",
  },
  {
    title: "Changes to Privacy Policy",
    description:
      "This Privacy Policy may be updated from time to time. We will notify you of any significant changes. Continued use of ThemeGPT after these changes implies your acceptance of the updated policy.",
  },
  {
    title: "Contact Information",
    description: (
      <div>
        {
          "Please contact us with any questions or comments about this Privacy Policy, Our Privacy Policy Toward Children, your personal information, and our third-party disclosure practices, at "
        }
        <span className="text-secondary hover:underline cursor-pointer">
          contact@themegpt.co
        </span>
        .<br />
        <br />
        {
          "Thank you for using ThemeGPT. We appreciate your trust in us and are committed to ensuring your privacy and data protection."
        }
        <div className="italic mt-10">
          Last updated: {moment("2023-10-31").format("MMM D, YYYY")}
        </div>
      </div>
    ),
  },
];

export const TermsOfUse = [
  {
    title: "Terms of Use for ThemeGPT",
    description:
      "Welcome to ThemeGPT, your destination for creating captivating color themes, utilizing AI-driven prompts, and connecting with a creative community. By using ThemeGPT, you agree to abide by the following Terms of Use. Please read these terms carefully to ensure a positive experience on our platform.",
  },
  {
    title: "Acceptance of Terms",
    description:
      "By accessing or using ThemeGPT, you acknowledge and agree to these Terms of Use. If you do not agree to these terms, please refrain from using our platform.",
  },
  {
    title: "Account Registration",
    description: (
      <div className="flex flex-col">
        <Typography element={"p"} as="p" className="font-bold">
          User Accounts:
        </Typography>
        To access certain features of ThemeGPT, you may be required to create an
        account. You are responsible for maintaining the confidentiality of your
        account information and any activities that occur under your account.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Accurate Information:
        </Typography>
        You must provide accurate and up-to-date information during the
        registration process. Misrepresentation or false information may result
        in the suspension or termination of your account.
      </div>
    ),
  },
  {
    title: "User Conduct",
    description: (
      <div className="flex flex-col">
        <Typography element={"p"} as="p" className="font-bold">
          Compliance with Laws:
        </Typography>
        You agree to use ThemeGPT in compliance with all applicable local,
        state, national, and international laws and regulations.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Prohibited Activities:
        </Typography>
        While using ThemeGPT, you agree not to engage in any unlawful, abusive,
        or harmful activities, including but not limited to:
        <ul className="list-disc !ml-4 !p-4">
          <li>Harassment or discrimination against other users. </li>
          <li>Impersonation of others. </li>
          <li>
            Uploading, posting, or sharing any content that violates
            intellectual property rights, privacy, or our community guidelines.
          </li>
        </ul>
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Community Guidelines:
        </Typography>
        ThemeGPT has specific community guidelines, which must be followed to
        ensure a positive experience for all users. Violation of these
        guidelines may result in account suspension or termination.
      </div>
    ),
  },
  {
    title: "Content and Ownership",
    description: (
      <div className="flex flex-col">
        <Typography element={"p"} as="p" className="font-bold">
          User-Generated Content:
        </Typography>
        When using ThemeGPT, you retain ownership of your user-generated
        content, including color themes and other contributions. However, by
        submitting content, you grant ThemeGPT a non-exclusive, royalty-free
        license to use, reproduce, and distribute your content for the purpose
        of providing our services.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Intellectual Property:
        </Typography>
        ThemeGPT and its associated logos, software, and other intellectual
        property are protected by copyright, trademark, and other intellectual
        property laws. You may not copy, modify, or distribute any part of
        ThemeGPT without our explicit consent.
      </div>
    ),
  },
  {
    title: "Prompts and Premium Features",
    description: (
      <div className="flex flex-col">
        <Typography element={"p"} as="p" className="font-bold">
          Prompt Usage:
        </Typography>
        Users are provided with a limited number of free prompts. Additional
        prompts may be purchased, and their use is subject to the terms of any
        relevant purchase agreement.
        <br />
        <br />
        <Typography element={"p"} as="p" className="font-bold">
          Premium Features:
        </Typography>
        ThemeGPT may offer premium features or services that are subject to
        their own terms and conditions.
      </div>
    ),
  },
  {
    title: "Termination of Services",
    description:
      "We reserve the right to terminate, suspend, or limit access to ThemeGPT without notice, for any reason, including violation of these Terms of Use.",
  },
  {
    title: "Changes to Terms",
    description:
      "These Terms of Use may be updated periodically. We will notify you of any significant changes. Your continued use of ThemeGPT following these updates indicates your acceptance of the revised terms.",
  },
  {
    title: "Contact Information",
    description: (
      <div>
        {
          "Please contact us with any questions or comments about this Privacy Policy, Our Privacy Policy Toward Children, your personal information, and our third-party disclosure practices, at "
        }
        <span className="text-secondary hover:underline cursor-pointer">
          contact@themegpt.co
        </span>
        .<br />
        <br />
        {
          "Thank you for using ThemeGPT. We appreciate your trust in us and are committed to ensuring your privacy and data protection."
        }
        <div className="italic mt-10">
          Last updated: {moment("2023-10-31").format("MMM D, YYYY")}
        </div>
      </div>
    ),
  },
];

export const INPUT_LIMIT = {
  NAME_MAX: 50,
  EMAIL_MAX: 100,
  PASSWORD_MAX: 100,
  PROMPT_MAX: 200,
  PROMPT_MIN: 30,
  DESCRIPTION_MAX: 1000,
  REASON_MAX: 200,
};
