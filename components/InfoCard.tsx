import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  link?: string;
  fullWidth?: boolean;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, label, value, link, fullWidth }) => {
  const content = (
    <div className={`p-4 h-full glass-panel rounded-xl flex flex-col justify-between transition-transform hover:scale-[1.02] active:scale-95 duration-300 border border-white/10 hover:border-purple-500/50 group`}>
      <div className="flex items-start justify-between mb-2">
        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-purple-500/20 transition-colors">
          <Icon className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
        </div>
        {link && (
          <div className="text-xs text-white/40 uppercase tracking-widest font-bold">Open ↗</div>
        )}
      </div>
      <div>
        <h3 className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">{label}</h3>
        <div className="text-lg font-semibold text-white leading-tight">{value}</div>
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className={fullWidth ? 'col-span-full' : ''}>
        {content}
      </a>
    );
  }

  return <div className={fullWidth ? 'col-span-full' : ''}>{content}</div>;
};

export default InfoCard;
