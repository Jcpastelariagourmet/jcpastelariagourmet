import React from 'react';
import { Button, Input, Badge } from './index';

// Simple test component to verify our UI components work
export const UITest: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1>UI Components Test</h1>
      
      <Button variant="primary">Test Button</Button>
      
      <Input label="Test Input" placeholder="Type here..." />
      
      <Badge variant="success">Test Badge</Badge>
    </div>
  );
};