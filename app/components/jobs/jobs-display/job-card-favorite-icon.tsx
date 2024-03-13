"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

interface JobCardFavoriteIconProps {
  isFavorite: boolean;
}

const JobCardFavoriteIcon: React.FC<JobCardFavoriteIconProps> = ({
  isFavorite,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      {isHovered || isFavorite ? (
        <Heart strokeWidth={1} fill="red" />
      ) : (
        <Heart strokeWidth={1} fill="none" />
      )}
    </div>
  );
};

export default JobCardFavoriteIcon;
