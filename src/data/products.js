// Single source of truth for Codways Products and Categories
export const productsData = [
  {
    slug: 'edtech',
    title: 'EdTech Products',
    tagline: 'Empowering Students & Learners with Career-Ready Skills',
    accent: '#3b82f6',
    icon: 'GraduationCap',
    heroCta: {
      label: 'Visit TeachXPro',
      href: 'https://teachxpro.codways.com/',
      external: true,
    },
    viewAll: {
      label: 'View all EdTech Products →',
      href: 'https://teachxpro.codways.com/',
      external: true,
    },
    products: [
      {
        name: 'Internships',
        desc: 'Real-world internship opportunities with top companies',
        icon: 'Briefcase',
        href: 'https://teachxpro.codways.com/',
        external: true,
      },
      {
        name: 'Hackathons',
        desc: 'Competitive coding events and innovation challenges',
        icon: 'Trophy',
        href: 'https://teachxpro.codways.com/',
        external: true,
      },
      {
        name: 'Trainings',
        desc: 'Skill development programs for career advancement',
        icon: 'BookOpen',
        href: 'https://teachxpro.codways.com/',
        external: true,
      },
    ],
  },
  {
    slug: 'technology-ai',
    title: 'Technology/AI Products',
    tagline: 'Building Future-Ready Digital Solutions',
    accent: '#8b5cf6',
    icon: 'Code2',
    heroCta: {
      label: 'Visit Zeka AI',
      href: 'https://www.zekaai.in/',
      external: true,
    },
    viewAll: {
      label: 'View all Technology/AI Products →',
      href: 'https://www.zekaai.in/',
      external: true,
    },
    products: [
      {
        name: 'Website Development',
        desc: 'Custom website development solutions',
        icon: 'Globe',
        href: 'https://www.zekaai.in/',
        external: true,
      },
      {
        name: 'Web & Mobile Development',
        desc: 'Full-stack web and mobile application development',
        icon: 'Smartphone',
        href: 'https://www.zekaai.in/',
        external: true,
      },
      {
        name: 'AI-driven Transformation Solutions',
        desc: 'Artificial intelligence solutions for business transformation',
        icon: 'Brain',
        href: 'https://www.zekaai.in/',
        external: true,
      },
    ],
  },
  {
    slug: 'legal-entrepreneurial',
    title: 'Legal & Entrepreneurial Products',
    tagline: 'Legal & Business Compliance Made Simple',
    accent: '#10b981',
    icon: 'Scale',
    heroCta: {
      label: 'Explore Legal Services',
      href: '/products/legal-entrepreneurial#services',
      external: false,
    },
    viewAll: {
      label: 'View all Legal & Entrepreneurial Products →',
      href: '/products/legal-entrepreneurial',
      external: false,
    },
    products: [
      {
        name: 'Company Registration',
        desc: 'Complete company incorporation services',
        icon: 'Building2',
        href: '/products/legal-entrepreneurial',
        external: false,
      },
      {
        name: 'GST Services',
        desc: 'GST registration and compliance management',
        icon: 'FileText',
        href: '/products/legal-entrepreneurial',
        external: false,
      },
      {
        name: 'Legal Management',
        // TODO: my screenshot cut this line off - keep the text as above and add a
        // TODO comment so I can complete it from the live site
        desc: 'Comprehensive legal document management',
        icon: 'Shield',
        href: '/products/legal-entrepreneurial',
        external: false,
      },
    ],
  },
  {
    slug: 'marketing',
    title: 'Marketing Products',
    tagline: 'Boost Your Brand with Smart Digital Marketing',
    accent: '#f59e0b',
    icon: 'Megaphone',
    status: 'Coming Soon',
    comingSoon: true,
    disabled: true,
    heroCta: {
      label: 'Coming Soon',
      href: '/products/marketing',
      external: false,
      disabled: true,
    },
    viewAll: {
      label: 'View all Marketing Products →',
      href: '/products/marketing',
      external: false,
      disabled: true,
    },
    products: [
      {
        name: 'Digital Marketing Projects',
        desc: 'End-to-end digital marketing campaign management',
        icon: 'Megaphone',
        href: '/products/marketing',
        external: false,
        disabled: true,
      },
      {
        name: 'Social Media Management',
        desc: 'Professional social media management and growth',
        icon: 'Share2',
        href: '/products/marketing',
        external: false,
        disabled: true,
      },
    ],
  },
]

export const getCategoryBySlug = slug => productsData.find(c => c.slug === slug)

export default productsData
