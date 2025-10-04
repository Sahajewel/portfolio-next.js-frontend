'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow block h-full flex flex-col"
    >
      <div className="flex flex-col h-full">
        {project.thumbnail && (
          <div className="relative w-full h-48 flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500 text-white px-2 py-1 text-xs rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>
        )}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {project.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
          
          <div className="flex gap-3 mt-auto">
            {project.liveUrl && (
              <button
                onClick={(e) => handleExternalLink(e, project.liveUrl!)}
                className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Live Demo
              </button>
            )}
            {project.githubUrl && (
              <button
                onClick={(e) => handleExternalLink(e, project.githubUrl!)}
                className="flex-1 bg-gray-800 text-white text-center py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors"
              >
                GitHub 
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}