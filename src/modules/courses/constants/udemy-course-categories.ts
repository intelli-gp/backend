/**
 * Udemy API Course Categories
 * @Notice stored like this as I have not found a way to dynamically get
 * the Udemy course categories from the Udemy API
 */

export const udemyCourseCategories = [
    'Business',
    'Design',
    'Development',
    'Finance & Accounting',
    'Health & Fitness',
    'IT & Software',
    'Marketing',
    'Music',
    'Office Productivity',
    'Personal Development',
    'Photography & Video',
    'Teaching & Academics',
] as const;

export const udemyCourseCategoriesMap = {
    Development: [
        'Web Development',
        'Data Science',
        'Programming Languages',
        'Game Development',
        'Software Development Tools',
        'Mobile Development',
        'Software Testing',
        'Database Design & Development',
        'No-Code Development',
        'Software Engineering',
    ],
    'Teaching & Academics': [
        'Online Education',
        'Language Learning',
        'Social Science',
        'Engineering',
        'Other Teaching & Academics',
        'Math',
        'Teacher Training',
        'Science',
        'Test Prep',
        'Humanities',
    ],
    'Office Productivity': [
        'Microsoft',
        'Other Office Productivity',
        'Google',
        'SAP',
        'Oracle',
        'Apple',
    ],
    'Personal Development': [
        'Personal Productivity',
        'Personal Transformation',
        'Influence',
        'Creativity',
        'Personal Brand Building',
        'Career Development',
        'Self Esteem & Confidence',
        'Religion & Spirituality',
        'Motivation',
        'Other Personal Development',
        'Leadership',
        'Happiness',
        'Stress Management',
        'Memory & Study Skills',
        'Parenting & Relationships',
    ],
    'IT & Software': [
        'Other IT & Software',
        'Operating Systems & Servers',
        'Network & Security',
        'IT Certifications',
        'Hardware',
    ],
    Business: [
        'Communication',
        'Project Management',
        'Entrepreneurship',
        'E-Commerce',
        'Management',
        'Business Analytics & Intelligence',
        'Media',
        'Operations',
        'Business Strategy',
        'Real Estate',
        'Sales',
        'Other Business',
        'Human Resources',
        'Industry',
        'Business Law',
    ],
    Lifestyle: [
        'Esoteric Practices',
        'Arts & Crafts',
        'Food & Beverage',
        'Games & Gaming',
        'Other Lifestyle',
        'Beauty & Makeup',
        'Home Improvement & Gardening',
        'Travel',
        'Animal Care & Training',
    ],
    'Health & Fitness': [
        'General Health',
        'Yoga',
        'Other Health & Fitness',
        'Mental Health',
        'Martial Arts & Self Defense',
        'Nutrition & Diet',
        'Meditation',
        'Safety & First Aid',
        'Fitness',
        'Dance',
        'Sports',
    ],
    'Photography & Video': [
        'Photography',
        'Video Design',
        'Digital Photography',
        'Photography Tools',
        'Portrait Photography',
        'Commercial Photography',
        'Other Photography & Video',
    ],
    'Finance & Accounting': [
        'Investing & Trading',
        'Cryptocurrency & Blockchain',
        'Finance',
        'Financial Modeling & Analysis',
        'Accounting & Bookkeeping',
        'Finance Cert & Exam Prep',
        'Other Finance & Accounting',
        'Compliance',
        'Economics',
        'Taxes',
        'Money Management Tools',
    ],
    Music: [
        'Vocal',
        'Instruments',
        'Music Fundamentals',
        'Music Production',
        'Music Software',
        'Music Techniques',
        'Other Music',
    ],
    Marketing: [
        'Affiliate Marketing',
        'Search Engine Optimization',
        'Digital Marketing',
        'Paid Advertising',
        'Marketing Fundamentals',
        'Content Marketing',
        'Social Media Marketing',
        'Marketing Analytics & Automation',
        'Other Marketing',
        'Video & Mobile Marketing',
        'Growth Hacking',
        'Branding',
        'Product Marketing',
        'Public Relations',
    ],
    Design: [
        'Graphic Design & Illustration',
        '3D & Animation',
        'Web Design',
        'Design Tools',
        'Game Design',
        'User Experience Design',
        'Architectural Design',
        'Other Design',
        'Interior Design',
        'Fashion Design',
    ],
} as Record<(typeof udemyCourseCategories)[number], string[]>;

export const FlattenedUdemyCourseCategories = Object.values(
    udemyCourseCategoriesMap,
).flat();
