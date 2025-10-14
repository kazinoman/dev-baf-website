import Image, { ImageProps, StaticImageData } from "next/image";

interface AvatarImageProps extends Omit<ImageProps, "alt"| 'src'> {
  alt: string;
  url: string | StaticImageData
  className?: string;
}

export function AvatarImage({
  alt,
  url,
  className = "",
  ...props
}: AvatarImageProps) {
  return (
    <Image
      alt={alt}
      src={url}
      className={`object-cover ${className} `}
      {...props}
      fill 
    />
  );
}