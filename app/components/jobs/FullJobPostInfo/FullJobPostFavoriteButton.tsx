import { Heart } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface FullJobPostFavoriteButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  isFavorite: boolean;
  isHovered: boolean;
}

const FullJobPostFavoriteButton: React.FC<FullJobPostFavoriteButtonProps> = ({
  onClick,
  isFavorite,
  isHovered,
}) => {
  if (isHovered || isFavorite) {
    return (
      <button
        className="flex justify-center w-full py-1 border rounded-full cursor-pointer text-white border-white bg-primary transition duration-300"
        onClick={onClick}
      >
        <div className="flex gap-1">
          <Heart strokeWidth={1} fill="red" />
          Favorite
        </div>
      </button>
    );
  }

  return (
    <button
      className="flex justify-center w-full py-1 border rounded-full text-primary border-primary cursor-pointer transition duration-300"
      onClick={onClick}
    >
      <div className="flex gap-1">
        <Heart strokeWidth={1} fill="none" />
        Favorite
      </div>
    </button>
  );
};

export default FullJobPostFavoriteButton;
