import Typography from "./ui/typography";

export const TemplateList = () => {
  return (
    <div className="flex flex-col items-center py-4">
      <Typography element="h3" as="h3">
        Templates
      </Typography>
      <div className="flex flex-col">
        <Typography element="p" as="p">
          Coming Soon
        </Typography>
      </div>
    </div>
  );
};
