import React from "react";
import Image from "next/image";

const ProfilePicture: React.FC = () => {
  return (
    <Image
  src="/profile/dp.png"
      alt="Profile"
      width={64}
      height={64}
      className="
        absolute
        w-16 h-16
        rounded-full
        object-cover
        border-2 border-white shadow-lg
        md:top-4 md:right-4
        bottom-4 left-1/2 -translate-x-1/2
        md:translate-x-0
      "
      priority
    />
  );
};

export default ProfilePicture;