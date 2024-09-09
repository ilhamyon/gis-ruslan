import { useState, useEffect } from "react";
import imageIqbalIndah from "/ruslan-normal.jpg"

const RandomBG = () => {
  const [imageSrc, setImageSrc] = useState("");

  const imageList = [`${imageIqbalIndah}`, `${imageIqbalIndah}`];

  useEffect(() => {
    const randomImage = imageList[Math.floor(Math.random() * imageList.length)];
    setImageSrc(randomImage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {imageSrc ? (
          <img
          src={imageSrc}
          alt="best bid & quick quote"
          className="w-full lg:h-screen object-contain"
          />
      ) : null}
    </>
  );
};

export default RandomBG;
