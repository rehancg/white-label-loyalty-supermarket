import React from "react";
import Image from "next/image";
import { HERO_STYLES } from "./constants";

const HeroIllustration: React.FC = () => {
  return (
    <Image
      src="/hero_image.png"
      alt="White Label Loyalty Supermarket Hero Illustration"
      width={400}
      height={400}
      style={HERO_STYLES.heroImage}
      priority
    />
  );
};

export default HeroIllustration;
