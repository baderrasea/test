import React from 'react';

interface TitleWithLinesProps {
  title: string;
  className?: string;
}

const TitleWithLines: React.FC<TitleWithLinesProps> = ({ title, className = '' }) => {
  return (
    <div className={`relative flex items-center text-[#627D98] w-full ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <h2 className="px-4  font-medium whitespace-nowrap">
        {title}
      </h2>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default TitleWithLines;