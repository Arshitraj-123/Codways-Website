import {
  GraduationCap,
  Code2,
  Scale,
  Megaphone,
  Briefcase,
  Trophy,
  BookOpen,
  Globe,
  Smartphone,
  Brain,
  Building2,
  FileText,
  Shield,
  Share2,
  Layers
} from 'lucide-react'

export const iconMap = {
  GraduationCap,
  Code2,
  Scale,
  Megaphone,
  Briefcase,
  Trophy,
  BookOpen,
  Globe,
  Smartphone,
  Brain,
  Building2,
  FileText,
  Shield,
  Share2,
}

export default function ProductIcon({ name, size = 20, className = '', ...props }) {
  const IconComponent = iconMap[name] || Layers
  return <IconComponent size={size} className={className} {...props} />
}
