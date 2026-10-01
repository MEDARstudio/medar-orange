/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Instagram } from 'lucide-react';
import { CaseStudy } from '../types';

interface ProjectCardProps {
  project: CaseStudy;
  index: number;
  onSelect: (project: CaseStudy) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.12 }}
      onClick={() => onSelect(project)}
      data-hover="true"
      className="group relative cursor-pointer flex flex-col justify-between bg-[#121218]/90 hover:bg-[#161620] border border-white/[0.08] hover:border-[#ff4b26]/50 transition-all duration-300 rounded-none overflow-hidden p-5 md:p-6"
    >
      {/* 
        =======================================================================
        VISUAL ARTWORK AREA - ADAPTED TO INSTAGRAM POST 4:5 ASPECT RATIO
        =======================================================================
      */}
      <div className="relative w-full aspect-[4/5] overflow-hidden mb-6 bg-[#09090d] border border-white/[0.06] shadow-xl flex flex-col justify-between p-4">
        {/* Generative Gradient Background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b ${project.gradientTheme} opacity-40 group-hover:opacity-75 transition-opacity duration-500`}
        />

        {/* Subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Top Header of the 4:5 Poster Artwork */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/60 tracking-wider">
          <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-0.5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
            <span>4:5 POST</span>
          </span>

          {project.award ? (
            <span className="flex items-center gap-1 text-[10px] text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/15">
              <Award className="w-3 h-3 text-[#ff4b26]" />
              <span className="truncate max-w-[120px]">{project.award}</span>
            </span>
          ) : (
            <span className="text-white/40 font-mono">№ {project.id.slice(0, 4).toUpperCase()}</span>
          )}
        </div>

        {/* Central Graphic Composition in 4:5 (viewBox 0 0 320 400) */}
        <div className="relative z-10 my-auto flex items-center justify-center pointer-events-none py-2">
          <svg 
            className="w-full h-auto max-h-[220px] opacity-75 group-hover:scale-105 group-hover:opacity-95 transition-all duration-700 ease-out" 
            viewBox="0 0 320 280" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Concentric orbital rings */}
            <circle cx="160" cy="140" r="100" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="160" cy="140" r="75" stroke={project.accentColor} strokeWidth="1.2" strokeOpacity="0.4" />
            <circle cx="160" cy="140" r="45" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
            
            {/* Crosshairs & Grid Lines */}
            <line x1="40" y1="140" x2="280" y2="140" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <line x1="160" y1="20" x2="160" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            
            {/* Architectural Frame */}
            <rect x="90" y="80" width="140" height="120" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <rect x="110" y="100" width="100" height="80" stroke={project.accentColor} strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="4 2" />

            {/* Typography center */}
            <text x="160" y="145" textAnchor="middle" fill="#ffffff" fontSize="13" fontFamily="Syne" fontWeight="bold" letterSpacing="0.25em">
              {project.client.toUpperCase()}
            </text>
            <text x="160" y="165" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace" letterSpacing="0.15em">
              MEDAR ATELIER · 4:5 FORMAT
            </text>
          </svg>
        </div>

        {/* Bottom Bar of 4:5 Poster Artwork */}
        <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-3">
          <div>
            <span className="block text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
              Direction Artistique
            </span>
            <span className="block text-xs font-bold text-white tracking-wide truncate max-w-[170px]">
              {project.title}
            </span>
          </div>

          <div className="w-8 h-8 bg-white text-black flex items-center justify-center transform translate-y-1 opacity-80 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Metadata & Project Description */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono tracking-wider mb-2">
          <span className="text-white/80">{project.client}</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span>{project.categoryLabel}</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span className="tabular-nums">{project.year}</span>
        </div>

        <h3 className="font-heading text-xl font-bold text-white tracking-tight mb-2 group-hover:text-[#ff4b26] transition-colors duration-200">
          {project.title}
        </h3>

        <p className="text-xs text-neutral-400 font-normal leading-relaxed line-clamp-2 mb-6">
          {project.description}
        </p>
      </div>

      {/* Quantitative Rigor & Deliverables */}
      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div>
          <span className="block text-sm font-bold text-white font-mono tabular-nums tracking-tight">
            {project.metrics.stat}
          </span>
          <span className="block text-[10px] text-neutral-400 uppercase tracking-wider">
            {project.metrics.label}
          </span>
        </div>

        <span className="text-xs text-neutral-400 font-medium group-hover:text-white transition-colors flex items-center gap-1">
          Détails <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
