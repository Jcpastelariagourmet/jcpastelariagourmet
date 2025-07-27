import React from 'react';
import { Container } from './Container';

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  showInfo?: boolean;
  className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = 'JC Pastelaria Gourmet',
  subtitle = 'Sabores únicos e ingredientes selecionados para uma experiência gastronômica inesquecível',
  showInfo = false,
  className
}) => {
  return (
    <div className={`bg-gradient-to-r from-primary-600 to-primary-700 text-white ${className}`}>
      <Container className="py-16">
        <div className="text-center space-y-4">
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default HeroSection;