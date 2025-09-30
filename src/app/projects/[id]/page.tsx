import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projectAPI } from '@/lib/api';
import { Project } from '@/types';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  try {
    const response = await projectAPI.getAll();
    const projects: Project[] = response.data.data || response.data || [];
    
    return projects.map((project) => ({
      id: project.id,
    }));
  } catch (error) {
    return [];
  }
}

export const revalidate = 3600;

async function getProject(id: string): Promise<Project | null> {
  try {
    const response = await projectAPI.getById(id);
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export default async function ProjectPage({ params }: PageProps) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {project.thumbnail && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
            />
            {project.featured && (
              <div className="absolute top-4 right-4">
                <span className="bg-yellow-500 text-white px-3 py-1 text-sm rounded-full">
                  Featured Project
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  View Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  View on GitHub
                </a>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-4">Project Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <strong>Created:</strong>{' '}
                {new Date(project.createdAt).toLocaleDateString()}
              </div>
              <div>
                <strong>Last Updated:</strong>{' '}
                {new Date(project.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}