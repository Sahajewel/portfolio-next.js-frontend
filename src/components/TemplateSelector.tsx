// components/TemplateSelector.tsx
'use client';

import { TEMPLATES } from "@/types";



interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

export default function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => onTemplateChange(template.id)}
          className={`flex flex-col items-center p-4 border-2 rounded-lg transition-all ${
            selectedTemplate === template.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded mb-2 border"></div>
          <span className="text-sm font-medium text-gray-700">{template.name}</span>
          <span className="text-xs text-gray-500 text-center mt-1">{template.description}</span>
        </button>
      ))}
    </div>
  );
}