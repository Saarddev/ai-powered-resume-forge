
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Image from '../ui/image';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelect: (template: string) => void;
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and professional design with a modern touch.',
    image: '/placeholder.svg'
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Classic and traditional layout for formal applications.',
    image: '/placeholder.svg'
  },
  {
    id: 'customizable',
    name: 'Customizable',
    description: 'Fully customizable template with adjustable segments.',
    image: '/placeholder.svg',
    new: true
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate,
  onSelect
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-3">Template Selection</h2>
        <p className="text-sm text-muted-foreground">
          Choose a template that best represents your style and experience
        </p>
      </div>

      <RadioGroup 
        value={selectedTemplate} 
        onValueChange={(value) => onSelect(value)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {templates.map((template) => (
          <div key={template.id} className="relative">
            <RadioGroupItem
              value={template.id}
              id={`template-${template.id}`}
              className="peer sr-only"
            />
            <Label
              htmlFor={`template-${template.id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              <div className="mb-3 overflow-hidden rounded-md border border-gray-200 w-full h-40 relative">
                <Image
                  src={template.image}
                  alt={template.name}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="w-full text-center">
                <div className="font-medium relative">
                  {template.name}
                  {template.new && (
                    <span className="absolute -top-1 -right-8 bg-resume-purple text-white text-xs px-1 py-0.5 rounded">
                      NEW
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {template.description}
                </div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default TemplateSelector;
