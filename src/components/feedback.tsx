import { ThumbsDown, ThumbsUp } from "lucide-react";
import Typography from "./ui/typography";
import { useHelpers } from "@/hooks/useHelpers";
import { sendFeedback } from "@/services/website";
import { useToast } from "@/hooks/useToast";

export const Feedback = () => {
  const { generatedTheme, feedbackSent, setFeedbackSent } = useHelpers();
  const { addToast } = useToast();

  const submit = async (
    e: React.MouseEvent<SVGSVGElement>,
    feedback: "POSITIVE" | "NEGATIVE"
  ) => {
    e.preventDefault();
    if (generatedTheme) {
      sendFeedback(generatedTheme, feedback)
        .then(() => {
          addToast({
            title: "Thanks for your feedback!",
            type: "success",
          });
        })
        .catch((error) => {
          addToast({
            title: error.response.data.error,
            type: "error",
            errorCode: error.response.status,
          });
        });
    }
  };

  return generatedTheme ? (
    <div
      className="flex gap-2"
      style={{
        opacity: feedbackSent ? "0" : "1",
        transition: "all 0.7s",
        visibility: feedbackSent ? "hidden" : "visible",
      }}
    >
      <Typography element="p" as="p" className="text-xs">
        Feedback the generated theme
      </Typography>
      <ThumbsUp
        className="w-3 h-3 cursor-pointer hover:text-secondary"
        onClick={(e) => {
          if (!feedbackSent) {
            submit(e, "POSITIVE");
            setFeedbackSent(true);
          }
        }}
      />
      <ThumbsDown
        className="w-3 h-3 cursor-pointer hover:text-secondary"
        onClick={(e) => {
          if (!feedbackSent) {
            submit(e, "NEGATIVE");
            setFeedbackSent(true);
          }
        }}
      />
    </div>
  ) : null;
};
