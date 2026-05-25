// ✅ SERVER COMPONENT — data props নেয়, নিজে fetch করে না
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Star, BookOpen } from "lucide-react";
import { Project } from "@/types";

interface Props {
  projects: Project[];
}

export default function ProjectsSection({ projects }: Props) {
  return (
    <section
      id="projects"
      className="min-h-[80vh] flex items-center justify-center px-4 py-12 relative z-10"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-300">Some of my recent work</p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">
              No projects available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl overflow-hidden border transition-all hover:scale-105 hover:shadow-2xl flex flex-col h-full bg-slate-800/50 backdrop-blur-sm border-purple-500/20 hover:border-purple-500/50 hover:shadow-purple-500/20"
              >
                <div className="relative overflow-hidden h-56 flex-shrink-0">
                  <Image
                    src={
                      project.thumbnail ||
                      "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    height={400}
                    width={400}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-80" />
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full text-xs font-bold text-white flex items-center gap-1">
                      <Star size={12} fill="white" /> Featured
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1 line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <div className="flex-grow">
                    <p className="text-sm leading-relaxed line-clamp-3 mb-4 text-gray-300">
                      {project.description}
                    </p>
                    <div>
                      <h4 className="text-xs font-semibold text-purple-400 mb-2">
                        Technologies:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || [])
                          .slice(0, 4)
                          .map((tech: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-1 rounded text-xs border bg-purple-500/20 text-purple-300 border-purple-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        {(project.technologies || []).length > 4 && (
                          <span className="px-2 py-1 rounded text-xs border bg-purple-500/20 text-purple-300 border-purple-500/30">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2 mt-auto">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2 group"
                      >
                        <ExternalLink
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />{" "}
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center border border-purple-500 text-white hover:bg-purple-500/10"
                      >
                        <Github
                          size={16}
                          className="group-hover:rotate-12 transition-transform"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          {/* ✅ prefetch=true — hover করলেই page load শুরু */}
          <Link
            href="/projects"
            prefetch={true}
            className="inline-flex items-center gap-2 px-8 py-3 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all"
          >
            <BookOpen size={20} /> View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
