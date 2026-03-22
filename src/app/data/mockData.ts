export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  isBreaking: boolean;
  isTrending: boolean;
  views: number;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export const categories: Category[] = [
  { id: '1', name: 'Breaking News', slug: 'breaking', color: '#ef4444' },
  { id: '2', name: 'Politics', slug: 'politics', color: '#3b82f6' },
  { id: '3', name: 'Sports', slug: 'sports', color: '#10b981' },
  { id: '4', name: 'Entertainment', slug: 'entertainment', color: '#f59e0b' },
  { id: '5', name: 'Business', slug: 'business', color: '#6366f1' },
  { id: '6', name: 'Technology', slug: 'technology', color: '#8b5cf6' },
  { id: '7', name: 'Health', slug: 'health', color: '#ec4899' },
  { id: '8', name: 'World', slug: 'world', color: '#14b8a6' },
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'Breaking: Major Economic Reform Bill Passed in Parliament',
    slug: 'major-economic-reform-bill-passed',
    content: `In a historic move, the Parliament has passed a comprehensive economic reform bill that is expected to transform the country's financial landscape. The bill, which has been in discussion for over six months, received overwhelming support from both sides of the house.

The new legislation includes provisions for tax reforms, investment incentives, and measures to boost domestic manufacturing. Finance Minister addressed the media after the bill's passage, stating that this reform will create millions of jobs and attract foreign investment.

Key highlights of the bill include:
- Reduction in corporate tax rates for small and medium enterprises
- Streamlined GST implementation
- Special economic zones in underdeveloped regions
- Incentives for startups and innovation

Opposition leaders, while supporting the bill, raised concerns about implementation timelines and requested regular monitoring mechanisms. The government has assured that a special committee will be formed to oversee the execution of these reforms.

Economists have welcomed the move, predicting a GDP growth boost of 2-3% in the coming fiscal year. Stock markets responded positively, with major indices closing at record highs.`,
    excerpt: 'Parliament passes historic economic reform bill expected to transform financial landscape and create millions of jobs.',
    category: 'politics',
    author: 'Rajesh Kumar',
    publishedAt: '2026-03-20T09:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    isBreaking: true,
    isTrending: true,
    views: 125430,
    tags: ['Parliament', 'Economy', 'Reform', 'Finance'],
  },
  {
    id: '2',
    title: 'Cricket World Cup: India Defeats Australia in Thrilling Final',
    slug: 'india-defeats-australia-cricket-final',
    content: `In a nail-biting finish, India clinched the Cricket World Cup title by defeating Australia by 6 wickets in the final match. The victory came after a spectacular batting performance by captain Virat Sharma, who scored an unbeaten 115 runs.

Australia, batting first, posted a competitive total of 287 runs. Their innings was anchored by Steve Williams' brilliant century. However, India's bowlers, led by Jasprit Kumar, kept taking crucial wickets to prevent a massive total.

Chasing 288, India got off to a shaky start, losing two early wickets. But Sharma's masterclass, combined with a crucial 89-run partnership with Rohit Patel, steered the team to victory with 8 balls to spare.

The win marks India's third World Cup title and their first in 15 years. Celebrations have erupted across the country, with fans taking to the streets in jubilation. The Prime Minister congratulated the team, announcing cash rewards and honors for the players.`,
    excerpt: 'India wins Cricket World Cup in thrilling final against Australia, captain scores brilliant century.',
    category: 'sports',
    author: 'Priya Sharma',
    publishedAt: '2026-03-20T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800',
    isBreaking: true,
    isTrending: true,
    views: 234567,
    tags: ['Cricket', 'World Cup', 'India', 'Sports'],
  },
  {
    id: '3',
    title: 'Bollywood Star Announces Major Film Production House Launch',
    slug: 'bollywood-star-launches-production-house',
    content: `Acclaimed actress Priyanka Verma today announced the launch of her production company, "Purple Dreams Productions," at a star-studded event in Mumbai. The production house aims to create content-driven cinema and web series.

Speaking at the launch event, Verma said, "I've been fortunate to work with amazing filmmakers throughout my career. Now, I want to create a platform for new voices and untold stories." The production house has already signed three projects, including a biopic and a social drama.

Industry veterans and fellow actors congratulated Verma on this new venture. Director Karan Malhotra, who attended the event, praised her vision and expressed interest in collaborating. The first project is scheduled to go on floors next month.

Verma also announced a mentorship program for aspiring filmmakers and actors, stating that the production house will focus on discovering fresh talent. This initiative has been welcomed by industry insiders as a positive step toward inclusivity in Bollywood.`,
    excerpt: 'Top Bollywood actress launches production house focusing on content-driven cinema and new talent.',
    category: 'entertainment',
    author: 'Amit Singh',
    publishedAt: '2026-03-20T07:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    isBreaking: false,
    isTrending: true,
    views: 87654,
    tags: ['Bollywood', 'Entertainment', 'Production', 'Cinema'],
  },
  {
    id: '4',
    title: 'Tech Giants Announce Breakthrough in Quantum Computing',
    slug: 'quantum-computing-breakthrough',
    content: `Leading technology companies have announced a major breakthrough in quantum computing that could revolutionize data processing. The new quantum processor, developed through international collaboration, can perform calculations 1000 times faster than current supercomputers.

Dr. Sarah Chen, lead scientist on the project, explained that this advancement could have significant implications for fields like cryptography, drug discovery, and climate modeling. The quantum processor uses a novel approach to maintain quantum coherence, a major challenge in the field.

The announcement was made at the International Technology Summit, where prototypes were demonstrated to researchers and industry leaders. While commercial applications are still years away, experts believe this marks a turning point in computing technology.

Investment in quantum computing research has surged, with governments and private companies allocating billions of dollars. India's Department of Science and Technology has also announced plans to establish quantum computing research centers.`,
    excerpt: 'Major breakthrough in quantum computing promises to revolutionize data processing and scientific research.',
    category: 'technology',
    author: 'Neha Patel',
    publishedAt: '2026-03-20T06:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
    isBreaking: false,
    isTrending: true,
    views: 65432,
    tags: ['Technology', 'Quantum Computing', 'Innovation', 'Science'],
  },
  {
    id: '5',
    title: 'Stock Markets Hit All-Time High Amid Economic Optimism',
    slug: 'stock-markets-all-time-high',
    content: `Indian stock markets reached unprecedented levels today, with the Sensex crossing 85,000 and Nifty surpassing 25,000 for the first time in history. The rally was driven by strong corporate earnings and positive economic indicators.

Market analysts attribute the surge to multiple factors, including the recently passed economic reform bill, robust GDP growth projections, and increased foreign institutional investment. Banking, IT, and manufacturing sectors led the gains.

Retail investors have also shown increased participation, with demat account openings hitting record numbers. Financial advisors, however, caution against irrational exuberance and recommend diversified investment strategies.

The Reserve Bank's monetary policy stance and stable inflation rates have created a favorable environment for market growth. Experts predict continued momentum in the coming quarters, though volatility remains a concern.`,
    excerpt: 'Sensex crosses 85,000 mark as markets rally on economic optimism and strong corporate earnings.',
    category: 'business',
    author: 'Vikram Malhotra',
    publishedAt: '2026-03-19T15:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    isBreaking: false,
    isTrending: true,
    views: 54321,
    tags: ['Business', 'Stock Market', 'Economy', 'Finance'],
  },
  {
    id: '6',
    title: 'New Health Initiative Aims to Provide Free Medical Care in Rural Areas',
    slug: 'free-medical-care-rural-initiative',
    content: `The government has launched an ambitious health initiative to provide free medical care to rural populations. Named "Swasth Bharat Mission 2.0," the program will establish mobile medical units and telemedicine centers in 10,000 villages.

Health Minister inaugurated the program at a ceremony in a remote village in Madhya Pradesh. The initiative includes free health check-ups, medicines, and specialist consultations through video conferencing with urban hospitals.

Each mobile medical unit will be equipped with basic diagnostic facilities and staffed by trained healthcare workers. The program also focuses on preventive care, with awareness campaigns about nutrition, hygiene, and common diseases.

Healthcare experts have praised the initiative, noting that rural areas have long suffered from inadequate medical infrastructure. The program aims to reduce infant mortality rates and improve overall health outcomes in underserved regions.`,
    excerpt: 'Government launches Swasth Bharat Mission 2.0 to bring free healthcare to 10,000 rural villages.',
    category: 'health',
    author: 'Dr. Anjali Reddy',
    publishedAt: '2026-03-19T14:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    isBreaking: false,
    isTrending: false,
    views: 43210,
    tags: ['Health', 'Rural Development', 'Government', 'Healthcare'],
  },
  {
    id: '7',
    title: 'International Climate Summit: Nations Commit to Zero Emissions by 2050',
    slug: 'climate-summit-zero-emissions',
    content: `World leaders at the International Climate Summit have committed to achieving zero carbon emissions by 2050. The agreement includes concrete action plans and financial commitments to support developing nations in their transition to renewable energy.

India announced a $50 billion investment in solar and wind energy infrastructure over the next decade. The country also pledged to increase forest cover and promote electric vehicles through tax incentives and infrastructure development.

Environmental activists welcomed the commitments but stressed the importance of accountability and regular monitoring. The summit also addressed issues like ocean pollution, biodiversity conservation, and sustainable agriculture.

Youth representatives from various countries presented innovative solutions and urged immediate action. The summit concluded with the signing of the "Global Green Pact," which outlines specific targets and timelines for each participating nation.`,
    excerpt: 'Global leaders commit to zero emissions by 2050, India pledges $50 billion for renewable energy.',
    category: 'world',
    author: 'Rahul Krishnan',
    publishedAt: '2026-03-19T12:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b5?w=800',
    isBreaking: false,
    isTrending: false,
    views: 38765,
    tags: ['Climate', 'Environment', 'World', 'Sustainability'],
  },
  {
    id: '8',
    title: 'Education Sector Embraces AI: Smart Classrooms in 5000 Schools',
    slug: 'ai-smart-classrooms-schools',
    content: `The Education Ministry has announced the implementation of AI-powered smart classrooms in 5,000 government schools across the country. The initiative aims to revolutionize traditional teaching methods and make education more interactive and personalized.

Smart classrooms will feature AI tutors that can adapt to each student's learning pace, interactive digital boards, and augmented reality modules for science and mathematics. Teachers will receive specialized training to effectively use these technologies.

Education experts believe this could significantly improve learning outcomes, especially in subjects where students typically struggle. The AI system can identify knowledge gaps and provide customized remedial content.

Parents and teachers have expressed enthusiasm about the initiative, though some raised concerns about screen time and the need for human interaction. The ministry assured that AI would complement, not replace, traditional teaching methods.`,
    excerpt: 'Government introduces AI-powered smart classrooms in 5,000 schools to enhance learning experience.',
    category: 'technology',
    author: 'Kavita Deshmukh',
    publishedAt: '2026-03-19T11:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    isBreaking: false,
    isTrending: false,
    views: 29876,
    tags: ['Education', 'AI', 'Technology', 'Schools'],
  },
];

// Storage helpers for admin panel
export const getArticles = (): Article[] => {
  const stored = localStorage.getItem('newsArticles');
  return stored ? JSON.parse(stored) : articles;
};

export const saveArticles = (articles: Article[]) => {
  localStorage.setItem('newsArticles', JSON.stringify(articles));
};

export const getCategories = (): Category[] => {
  const stored = localStorage.getItem('newsCategories');
  return stored ? JSON.parse(stored) : categories;
};

export const saveCategories = (categories: Category[]) => {
  localStorage.setItem('newsCategories', JSON.stringify(categories));
};

// Initialize localStorage on first load
if (!localStorage.getItem('newsArticles')) {
  saveArticles(articles);
}
if (!localStorage.getItem('newsCategories')) {
  saveCategories(categories);
}
