import React from 'react';

/**
 * HeaderLogo Component
 * 
 * This component clones the central header section containing the main 'NO FEAR' 
 * eyes logo centered in a white container. 
 * Height: 24 units (96px).
 * Responsive logo width: 128px (w-32) on mobile, 144px (md:w-36) on desktop.
 */
const HeaderLogo: React.FC = () => {
  return (
    <div className="relative bg-black">
      <div className="flex h-24 w-full items-center justify-center">
        <a 
          href="/" 
          className="w-32 md:w-36 transition-opacity hover:opacity-80"
          aria-label="Home"
        >
          <img 
            alt="Eyes logo" 
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/0c6ac1c5-1c7c-4284-bf23-5e189c7e3f9e-nofear-com/assets/svgs/TEXT_LOGO-1.svg" 
            className="h-auto w-full object-contain"
            width={144}
            height={48}
          />
        </a>
      </div>
    </div>
  );
};

export default HeaderLogo;