import { useEffect, useRef, useState } from "react";
import type { ImgHTMLAttributes } from "react";

type LazyImageProps = { src: string };

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNativeTypes;

export const LazyImage = ({ src, ...imgProps }: Props): JSX.Element => {
  const node = useRef<HTMLImageElement>(null);
  const [currentSrc, setCurrentSrc] = useState(
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
  );

  const unobserveElement = (observer: IntersectionObserver) => {
    if (node.current) {
      observer.unobserve(node.current);
    }
  }

  useEffect(() => {
    // Nuevo observador
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src);
          console.log("Hey from image " + src);
          unobserveElement(observer);
        }
      });
    });
    if (node.current) {
      observer.observe(node.current);
    }

    return () => observer.disconnect();
  }, [src]);

  return (
    <img
      ref={node}
      src={currentSrc}
      {...imgProps}
    />
  );
};
