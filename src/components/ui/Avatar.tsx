import React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  variant: 'circle' | 'rectangle'
}


const Avatar: React.FC<AvatarProps> = ({ className = '', children, variant, ...props }) => {

  const variants = {
    circle: 'rounded-full',
    rectangle: 'rounded-none'
  }

  
  return (
    <div
      className={`relative inline-flex overflow-hidden  ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Avatar;
