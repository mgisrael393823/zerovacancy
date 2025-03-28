
import React from 'react';

interface SectionHeaderSimpleProps {
  title: string;
  subtitle: string;
}

const SectionHeaderSimple: React.FC<SectionHeaderSimpleProps> = ({
  title,
  subtitle
}) => {
  return (
    <div className="text-center w-full">
      <h2 id="design-title" className="section-header mb-2 sm:mb-6 text-center headingLarge">
        {title}
      </h2>
      
      {/* Decorative element under the heading */}
      <div className="w-20 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 mx-auto mb-3 sm:mb-6 rounded-full"></div>
      
      <p className="max-w-2xl mx-auto body-text text-gray-600 text-center bodyText title-subtitle-spacing">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeaderSimple;
