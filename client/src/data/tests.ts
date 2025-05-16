export interface TestAnswer {
  id: string;
  text: string;
  description: string;
  score: string;
}

export interface TestQuestion {
  id: string;
  text: string;
  answers: TestAnswer[];
}

export interface TestResult {
  id: string;
  title: string;
  description: string;
  crystalRecommendation: string;
}

export interface Test {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  color: string;
  buttonColor: string;
  questions: TestQuestion[];
  results: TestResult[];
}

export const tests: Test[] = [
  {
    id: "1",
    slug: "crystal-energy",
    title: "Crystal Energy Test",
    description: "Discover which crystal resonates most with your current energy and spiritual needs through this intuitive assessment.",
    image: "https://pixabay.com/get/ga4aaf4dde059cfd647b4d18495cdc2e6b6759bdcad0b84207c26fb5cedbe2850d8e159035b34bfc1fde794fcbfef4e0c9533e8c9db80a9279b27d354195f2087_1280.jpg",
    color: "bg-lavender rounded-full",
    buttonColor: "bg-lavender hover:bg-lavender/90",
    questions: [
      {
        id: "q1",
        text: "Which environment makes you feel most at peace?",
        answers: [
          {
            id: "q1a1",
            text: "Ocean or seaside",
            description: "The rhythmic waves and open horizon call to me",
            score: "water"
          },
          {
            id: "q1a2",
            text: "Forest or woodland",
            description: "The ancient trees and earthy scents ground me",
            score: "earth"
          },
          {
            id: "q1a3",
            text: "Mountains or hills",
            description: "The majesty and elevated perspective inspire me",
            score: "air"
          },
          {
            id: "q1a4",
            text: "Desert or open plains",
            description: "The vast expanse and silence speak to my soul",
            score: "fire"
          }
        ]
      },
      {
        id: "q2",
        text: "When you're feeling stressed, what helps you relax most effectively?",
        answers: [
          {
            id: "q2a1",
            text: "Meditation or quiet contemplation",
            description: "Turning inward brings me peace",
            score: "spiritual"
          },
          {
            id: "q2a2",
            text: "Creative expression through art or music",
            description: "Channeling emotions into creation restores balance",
            score: "emotional"
          },
          {
            id: "q2a3",
            text: "Physical activity like yoga or walking",
            description: "Moving my body helps clear my mind",
            score: "physical"
          },
          {
            id: "q2a4",
            text: "Intellectual pursuits like reading or puzzles",
            description: "Engaging my mind distracts from stress",
            score: "mental"
          }
        ]
      },
      {
        id: "q3",
        text: "What quality do you most wish to enhance in your life right now?",
        answers: [
          {
            id: "q3a1",
            text: "Love and compassion",
            description: "Opening my heart to deeper connections",
            score: "love"
          },
          {
            id: "q3a2",
            text: "Abundance and prosperity",
            description: "Attracting success and material well-being",
            score: "abundance"
          },
          {
            id: "q3a3",
            text: "Protection and grounding",
            description: "Feeling secure and centered in turbulent times",
            score: "protection"
          },
          {
            id: "q3a4",
            text: "Clarity and wisdom",
            description: "Seeing truth and making better decisions",
            score: "wisdom"
          }
        ]
      },
      {
        id: "q4",
        text: "Which color are you most drawn to right now?",
        answers: [
          {
            id: "q4a1",
            text: "Pink or Green",
            description: "Gentle, nurturing colors of the heart",
            score: "love"
          },
          {
            id: "q4a2",
            text: "Purple or Indigo",
            description: "Deep colors of intuition and spiritual insight",
            score: "wisdom"
          },
          {
            id: "q4a3",
            text: "Clear or White",
            description: "Pure colors of clarity and amplification",
            score: "clarity"
          },
          {
            id: "q4a4",
            text: "Yellow or Gold",
            description: "Bright colors of optimism and manifestation",
            score: "abundance"
          }
        ]
      },
      {
        id: "q5",
        text: "What challenge are you currently facing?",
        answers: [
          {
            id: "q5a1",
            text: "Emotional healing or relationship issues",
            description: "Working through heart-centered matters",
            score: "love"
          },
          {
            id: "q5a2",
            text: "Financial concerns or career direction",
            description: "Navigating material world challenges",
            score: "abundance"
          },
          {
            id: "q5a3",
            text: "Anxiety, fear, or feeling ungrounded",
            description: "Seeking stability and courage",
            score: "protection"
          },
          {
            id: "q5a4",
            text: "Uncertainty about life purpose or direction",
            description: "Looking for guidance and clarity",
            score: "wisdom"
          }
        ]
      }
    ],
    results: [
      {
        id: "love",
        title: "Heart Healer",
        description: "Your energy resonates with stones of love and compassion. You're in a period where heart-centered healing and emotional growth are paramount. These stones will help open your heart chakra, heal emotional wounds, and attract loving relationships.",
        crystalRecommendation: "rose-quartz"
      },
      {
        id: "abundance",
        title: "Prosperity Magnet",
        description: "Your energy aligns with stones of abundance and manifestation. You're ready to attract prosperity in all forms - material wealth, opportunities, and positive experiences. These crystals will help you maintain a positive mindset and manifest your desires into reality.",
        crystalRecommendation: "citrine"
      },
      {
        id: "protection",
        title: "Sacred Guardian",
        description: "Your energy connects with stones of protection and grounding. You need to establish strong boundaries and shield yourself from negative energies. These crystals will help you stay centered, protected, and firmly rooted even in challenging circumstances.",
        crystalRecommendation: "black-obsidian"
      },
      {
        id: "wisdom",
        title: "Spiritual Visionary",
        description: "Your energy resonates with stones of wisdom and spiritual insight. You're in a period of awakening and seeking deeper truths. These crystals will enhance your intuition, support your spiritual growth, and help you access higher knowledge.",
        crystalRecommendation: "lapis-lazuli"
      },
      {
        id: "clarity",
        title: "Clear Channeler",
        description: "Your energy aligns with stones of clarity and amplification. You need to clear mental fog and enhance your focus. These crystals will help purify your energy, amplify your intentions, and bring mental clarity to your situation.",
        crystalRecommendation: "clear-quartz"
      }
    ]
  },
  {
    id: "2",
    slug: "aura-reading",
    title: "Aura Reading Assessment",
    description: "Learn about your aura's color and what it reveals about your personality, strengths, and areas for spiritual growth.",
    image: "https://pixabay.com/get/ga120789803887f0889bbbe0734dc816b55ca1c2ee1883cfac43db3dff52ebf05e2855e9d4cac0880baa57d33987a81be1d4261cae193b8970f45e192cb407422_1280.jpg",
    color: "bg-blush rounded-full",
    buttonColor: "bg-blush hover:bg-blush/90",
    questions: [
      {
        id: "q1",
        text: "How would others describe your energy?",
        answers: [
          {
            id: "q1a1",
            text: "Calm and grounding",
            description: "You bring stability to chaotic situations",
            score: "green"
          },
          {
            id: "q1a2",
            text: "Vibrant and inspiring",
            description: "You light up the room with your presence",
            score: "yellow"
          },
          {
            id: "q1a3",
            text: "Compassionate and nurturing",
            description: "You make others feel cared for",
            score: "pink"
          },
          {
            id: "q1a4",
            text: "Intuitive and visionary",
            description: "You see beyond the obvious",
            score: "purple"
          }
        ]
      },
      {
        id: "q2",
        text: "What do you value most in life?",
        answers: [
          {
            id: "q2a1",
            text: "Truth and wisdom",
            description: "You seek to understand life's deeper meanings",
            score: "blue"
          },
          {
            id: "q2a2",
            text: "Creativity and self-expression",
            description: "You value authentic expression of your unique self",
            score: "orange"
          },
          {
            id: "q2a3",
            text: "Love and connection",
            description: "You cherish deep bonds with others",
            score: "pink"
          },
          {
            id: "q2a4",
            text: "Personal power and confidence",
            description: "You value strength and self-assurance",
            score: "red"
          }
        ]
      },
      {
        id: "q3",
        text: "When making decisions, what do you typically rely on?",
        answers: [
          {
            id: "q3a1",
            text: "Intuition - I trust my gut feelings",
            description: "Your inner knowing guides you",
            score: "purple"
          },
          {
            id: "q3a2",
            text: "Logic - I analyze facts and think things through",
            description: "You trust in rational thought processes",
            score: "blue"
          },
          {
            id: "q3a3",
            text: "Emotion - I consider how I and others feel",
            description: "Your heart often leads the way",
            score: "green"
          },
          {
            id: "q3a4",
            text: "Vision - I focus on long-term possibilities",
            description: "You see beyond immediate circumstances",
            score: "yellow"
          }
        ]
      },
      {
        id: "q4",
        text: "What's your typical energy level?",
        answers: [
          {
            id: "q4a1",
            text: "High energy - always on the go",
            description: "You have abundant physical vitality",
            score: "red"
          },
          {
            id: "q4a2",
            text: "Steady energy - consistent and reliable",
            description: "You maintain balanced energy levels",
            score: "green"
          },
          {
            id: "q4a3",
            text: "Creative energy - flowing between projects",
            description: "Your energy fluctuates with your inspiration",
            score: "orange"
          },
          {
            id: "q4a4",
            text: "Reflective energy - thoughtful and observant",
            description: "You direct energy inward for contemplation",
            score: "blue"
          }
        ]
      },
      {
        id: "q5",
        text: "What spiritual practice resonates with you most?",
        answers: [
          {
            id: "q5a1",
            text: "Meditation and mindfulness",
            description: "Inner stillness and present moment awareness",
            score: "purple"
          },
          {
            id: "q5a2",
            text: "Movement practices like yoga or tai chi",
            description: "Connecting body and spirit through movement",
            score: "green"
          },
          {
            id: "q5a3",
            text: "Creative expression or art therapy",
            description: "Channeling spiritual insights through creation",
            score: "orange"
          },
          {
            id: "q5a4",
            text: "Service to others or volunteer work",
            description: "Finding spiritual meaning through helping others",
            score: "pink"
          }
        ]
      },
      {
        id: "q6",
        text: "When you're at your best, what gift do you offer the world?",
        answers: [
          {
            id: "q6a1",
            text: "Inspiration and motivation",
            description: "You encourage others to reach their potential",
            score: "yellow"
          },
          {
            id: "q6a2",
            text: "Wisdom and insight",
            description: "You offer deep understanding and perspective",
            score: "blue"
          },
          {
            id: "q6a3",
            text: "Healing and compassion",
            description: "You help others feel better and heal",
            score: "pink"
          },
          {
            id: "q6a4",
            text: "Protection and strength",
            description: "You stand up for what's right and defend others",
            score: "red"
          }
        ]
      }
    ],
    results: [
      {
        id: "purple",
        title: "Purple Aura - The Visionary",
        description: "Your aura glows with spiritual purple light, indicating a highly intuitive, spiritually oriented nature. You naturally connect with higher dimensions and receive insights that others miss. Your gifts include visionary thinking, spiritual connection, and natural psychic abilities.",
        crystalRecommendation: "amethyst"
      },
      {
        id: "blue",
        title: "Blue Aura - The Truth Seeker",
        description: "Your aura shines with calm blue energy, reflecting your thoughtful, communicative nature. You value truth and express yourself with clarity and authenticity. Your gifts include wisdom, clear communication, and the ability to bring peace to conflicted situations.",
        crystalRecommendation: "lapis-lazuli"
      },
      {
        id: "green",
        title: "Green Aura - The Healer",
        description: "Your aura radiates healing green light, showing your connection to nature and natural growth processes. You have an innate ability to nurture others and help things flourish. Your gifts include healing, balance, and creating harmony in your environment.",
        crystalRecommendation: "green-aventurine"
      },
      {
        id: "yellow",
        title: "Yellow Aura - The Optimist",
        description: "Your aura sparkles with sunny yellow energy, indicating your naturally positive, intellectual nature. You bring optimism and clarity wherever you go. Your gifts include inspiring others, quick thinking, and the ability to manifest your intentions.",
        crystalRecommendation: "citrine"
      },
      {
        id: "orange",
        title: "Orange Aura - The Creative",
        description: "Your aura pulses with vibrant orange light, revealing your creative, passionate nature. You approach life with enthusiasm and sensual appreciation. Your gifts include creative expression, emotional intelligence, and bringing joy to others.",
        crystalRecommendation: "moonstone"
      },
      {
        id: "red",
        title: "Red Aura - The Warrior",
        description: "Your aura blazes with powerful red energy, showing your strong life force and grounded nature. You have natural leadership abilities and physical vitality. Your gifts include courage, protection of others, and the drive to make things happen in the material world.",
        crystalRecommendation: "red-jasper"
      },
      {
        id: "pink",
        title: "Pink Aura - The Nurturer",
        description: "Your aura glows with gentle pink light, reflecting your loving, compassionate nature. You create safe spaces for others and offer unconditional acceptance. Your gifts include emotional healing, heart-centered wisdom, and bringing love into difficult situations.",
        crystalRecommendation: "rose-quartz"
      }
    ]
  }
];

export const getTestBySlug = (slug: string): Test | undefined => {
  return tests.find(test => test.slug === slug);
};
