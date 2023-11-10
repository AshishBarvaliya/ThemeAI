import { Eye, EyeOff } from "lucide-react";

interface PasswordEyeProps {
  value: boolean;
  setValue: (value: boolean) => void;
}

export const PasswordEye: React.FC<PasswordEyeProps> = ({
  value,
  setValue,
}) => {
  return (
    <div
      className="absolute top-0 right-0 h-9 flex items-center w-9 justify-center"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setValue(!value);
      }}
    >
      {!value ? (
        <Eye className="h-5 w-5 cursor-pointer text-primary-secondary" />
      ) : (
        <EyeOff className="h-5 w-5 cursor-pointer text-primary-secondary" />
      )}
    </div>
  );
};
