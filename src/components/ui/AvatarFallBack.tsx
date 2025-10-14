interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export function AvatarFallback({
  children,
  className = "",
  ...props
}: AvatarFallbackProps) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}