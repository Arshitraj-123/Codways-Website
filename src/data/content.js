export const nav = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products', dropdown: true },
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'About', to: '/about' },
  { label: 'Resources', to: '/resources' },
]


// About Page Data (matching Screenshots 2 and 3)
export const aboutData = {
  title: 'About Codways',
  subtitle:
    "We are India's leading technology company providing comprehensive solutions across education, legal compliance, technology development, and digital marketing.",
  vision: {
    title: 'Our Vision',
    text:
      'To be a global catalyst for innovation and growth, empowering individuals, startups, and enterprises with cutting-edge technology, smart solutions, and transformative strategies that shape a better tomorrow.',
  },
  mission: {
    title: 'Our Mission',
    text:
      "Delivering innovative, future-ready solutions across diverse domains by bridging ideas with execution, fostering trust and long-term partnerships, and creating impact-driven outcomes that solve today's challenges while preparing for tomorrow's opportunities.",
  },
  leadershipTitle: 'Leadership Team',
  leadershipSubtitle: 'Meet the experienced professionals leading Codways Technologies',
  leaders: [
    {
      name: 'Neha Sharma',
      role: 'Founder CEO',
      bio:
        'Visionary leader with 14+ years of experience across multiple domains, driving strategic growth and innovation at Codways.',
      img: '/assets/leader-neha.jpg',
    },
    {
      name: 'Sanjeev Sharma',
      role: 'AVP - Operations',
      bio:
        'Operations expert with 14+ years of experience in MNC firms, ensuring seamless business operations and process excellence.',
      img: '/assets/leader-sanjeev.jpg',
    },
    {
      name: 'Ashu Tosh',
      role: 'CTO',
      bio:
        'Technology visionary with 14+ years of experience in tech and AI, leading our technical strategy and innovation initiatives.',
      img: '/assets/leader-ashutosh.jpg',
    },
    {
      name: 'Sachit',
      role: 'Head of Engineering',
      bio:
        'Engineering leader with 14+ years of experience in tech and GenAI, driving technical excellence and team development.',
      img: '/assets/leader-sachit.jpg',
    },
  ],
  partnersTitle: 'Our Partners & Collaborations',
  partnersSubtitle:
    'At Codways, collaboration is at the heart of innovation. We partner with leading organizations, technology providers, institutions, and industry experts to deliver solutions that make a real impact.',
  partners: [
    {
      title: 'EdTech & Learning Partners',
      icon: 'GraduationCap',
      items: [
        'Universities & Colleges',
        'Online Course Providers',
        'E-Learning Content Creators',
        'Assessment & Certification Bodies',
      ],
    },
    {
      title: 'Technology & Enterprise Partners',
      icon: 'Server',
      items: [
        'Cloud Service Providers',
        'Saas & ERP Vendors',
        'Hardware and IT Infrastructure Providers',
        'Industry-Specific Tech Consultants',
      ],
    },
    {
      title: 'AI & Innovation Partners',
      icon: 'Brain',
      items: [
        'AI Research Labs',
        'Data & Analytics Platforms',
        'Machine Learning Framework Providers',
        'Automation & Robotics Companies',
      ],
    },
    {
      title: 'Legal & Compliance Collaborators',
      icon: 'Scale',
      items: [
        'Law Firms & Legal Advisors',
        'Compliance & Regulatory Bodies',
        'Intellectual Property Consultants',
        'Policy & Governance Experts',
      ],
    },
    {
      title: 'Marketing & Growth Partners',
      icon: 'TrendingUp',
      items: [
        'Digital Marketing Agencies',
        'SEO & Analytics Platforms',
        'Ad Networks & Media Channels',
        'Branding & Creative Agencies',
      ],
    },
  ],
}

// Case Studies Data (matching Screenshot 5)
export const caseStudiesData = [
  {
    id: 1,
    title: 'From Student to Software Engineer at Google',
    client: 'Client: Arjun Kumar - Computer Science Student',
    category: 'Student Success',
    tags: ['EdTech', 'Placement', 'Training', 'Success'],
    desc: 'Final year student struggling with placement preparation and lacking industry-relevant skills',
    results: [
      'Secured placement at Google with ₹45 LPA package',
      'Completed 3 industry projects during training',
    ],
    img: '/assets/ai-code.jpg',
  },
  {
    id: 2,
    title: 'Streamlined Legal Compliance for Tech Startup',
    client: 'Client: TechFlow Solutions - Early Stage Startup',
    category: 'Startup Success',
    tags: ['Legal', 'Startup', 'Compliance', 'Business'],
    desc: 'Complex legal requirements and compliance issues hindering business growth',
    results: [
      'Reduced compliance time by 80%',
      'Saved ₹2 lakhs in legal costs',
    ],
    img: '/assets/charts-meeting.jpg',
  },
  {
    id: 3,
    title: 'Digital Transformation for Municipal Corporation',
    client: 'Client: Bangalore Municipal Corporation',
    category: 'Tech Success',
    tags: ['Government', 'Digital Transformation', 'Software', 'Public Service'],
    desc: 'Manual processes causing delays and inefficiencies in citizen services',
    results: [
      'Reduced processing time by 70%',
      'Improved citizen satisfaction by 85%',
    ],
    img: '/assets/pexels-photo-3184291.jpg',
  },
  {
    id: 4,
    title: 'Digital Marketing Campaign Drives 300% Growth',
    client: 'Client: EcoFriendly Products - E-commerce Brand',
    category: 'Marketing Success',
    tags: ['Digital Marketing', 'E-commerce', 'Growth', 'ROI'],
    desc: 'Low brand awareness and poor online presence affecting sales',
    results: [
      'Increased sales by 300%',
      'Grew social media following by 500%',
    ],
    img: '/assets/social-apps.jpg',
  },
]

// Resources & Insights Data (matching Screenshot 1)
export const resourcesData = [
  {
    id: 1,
    title: 'The Future of EdTech: AI-Powered Learning',
    category: 'EdTech',
    type: 'Blogs & Articles',
    desc: 'Explore how artificial intelligence is revolutionizing education and creating personalized learning experiences.',
    author: 'Priya Sharma',
    date: '12/15/2024',
    img: '/assets/ai-code.jpg',
  },
  {
    id: 2,
    title: 'Complete Legal Guide for Indian Startups',
    category: 'Legal',
    type: 'Blogs & Articles',
    desc: 'Everything you need to know about legal compliance, registration, and documentation for your startup.',
    author: 'Amit Patel',
    date: '12/10/2024',
    img: '/assets/charts-meeting.jpg',
  },
  {
    id: 3,
    title: 'Digital Transformation Strategies for SMEs',
    category: 'Technology',
    type: 'Blogs & Articles',
    desc: 'How small and medium enterprises can leverage technology for growth and competitive advantage.',
    author: 'Sneha Gupta',
    date: '12/5/2024',
    img: '/assets/pexels-photo-3184291.jpg',
  },
  {
    id: 4,
    title: 'Digital Marketing Trends to Watch in 2025',
    category: 'Marketing',
    type: 'Blogs & Articles',
    desc: 'Stay ahead of the curve with the latest digital marketing trends and strategies for the coming year.',
    author: 'Marketing Team',
    date: '12/1/2024',
    img: '/assets/social-apps.jpg',
  },
]

export const why = [
  {
    title: 'Multi-Domain Expertise',
    text: 'From EdTech platforms to AI-powered solutions, legal & enterprise systems, and marketing innovations—we bring diverse industry expertise under one roof.',
  },
  {
    title: 'Innovation at Core',
    text: 'Our team thrives on creativity and cutting-edge technology, ensuring your projects are always ahead of the curve.',
  },
  {
    title: 'Scalable & Future-Ready Solutions',
    text: 'Whether you’re a startup or a growing enterprise, our solutions are designed to adapt and scale with your vision.',
  },
  {
    title: 'Trust & Transparency',
    text: 'We believe in long-term partnerships, built on clear communication, ethical practices, and measurable results.',
  },
]

export const tailored = {
  title: 'Solutions Built Around You',
  text: 'At Codways, we understand that no two businesses are the same. That’s why we craft tailored solutions—whether it’s EdTech, AI, Legal, Enterprise, or Marketing—to meet your unique goals and challenges.',
  points: [
    'Every solution is customized to align with your vision, industry, and growth stage.',
    'From AI to automation, we integrate the latest tools to keep you ahead of the curve.',
    'We work with you from idea to execution—ensuring seamless delivery and measurable impact.',
    'Our experience spans multiple sectors, giving you innovative insights and proven methods.',
  ],
}

export const stories = [
  {
    name: 'Priya Sharma',
    img: '/assets/pexels-photo-774909.jpg',
    role: 'Growth Manager at Razorpay',
    prev: 'Previously: Marketing Executive',
    stat: '180% salary increase',
    program: 'Growth Marketing Graduate',
    quote: '"Codways Technologies\' program helped me transition from traditional marketing to growth marketing. The practical approach and industry mentorship were game-changers."',
  },
  {
    name: 'Rahul Gupta',
    img: '/assets/pexels-photo-220453.jpg',
    role: 'Senior Product Manager at Flipkart',
    prev: 'Previously: Business Analyst',
    stat: '220% salary increase',
    program: 'Product Management Graduate',
    quote: '"The product management course gave me the frameworks and confidence to lead cross-functional teams and build products that users actually want."',
  },
  {
    name: 'Sneha Patel',
    img: '/assets/pexels-photo-415829.jpg',
    role: 'Data Scientist at Swiggy',
    prev: 'Previously: Software Developer',
    stat: '160% salary increase',
    program: 'Data Science Graduate',
    quote: '"The hands-on projects and mentorship helped me successfully transition into data science. Now I\'m solving real business problems with data."',
  },
]

export const contact = {
  email: 'info@codways.com',
  phone: '+91 98918 77741',
  address: 'Plot No. 5&6, B-40, Globus D Tower, Sector -63 Noida (U.P)-201301 and Branch Ofc : H-187, Sector -63, Noida (U.P)-201301',
}

export const footer = {
  blurb: "India's #1 platform for learning high-income digital skills. Transform your career with industry-led programs.",
  programs: ['Growth Marketing', 'Product Management', 'Data Science', 'Digital Marketing', 'Business Analytics'],
  company: [
    ['About Us', '/about'],
    ['Our Team', '/about'],
    ['Careers', '/contact'],
    ['Success Stories', '/case-studies'],
    ['Blog', '/resources'],
  ],
  support: [
    ['Help Center', '/contact'],
    ['Contact Us', '/contact'],
    ['Community', '/resources'],
    ['Terms & Conditions', '/resources'],
    ['Privacy Policy', '/resources'],
  ],
  copyright: '© 2024 Codways Technologies. All rights reserved.',
}
