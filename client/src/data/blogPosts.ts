export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage: string;
  content: string[];
}

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "creating-crystal-meditation-space",
    title: "Creating a Crystal Meditation Space for Beginners",
    author: "Emma Johnson",
    date: "2023-05-15",
    category: "Crystal Healing",
    excerpt: "Learn how to create a sacred space for meditation using crystals to enhance your practice and spiritual growth. We explore the best crystals for focus, tranquility, and spiritual awareness.",
    coverImage: "https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    content: [
      "Creating a dedicated meditation space enhanced with the energy of crystals can significantly deepen your spiritual practice. When designed thoughtfully, this sacred space becomes a sanctuary where you can retreat from the world's chaos and connect with your inner self.",
      "## Choosing the Right Location",
      "First, select a quiet spot in your home where you won't be disturbed. Ideally, this area should receive natural light and have good air circulation. Even a small corner of a room can work perfectly when properly arranged.",
      "## Essential Elements for Your Crystal Meditation Space",
      "- **Comfortable seating**: Whether you prefer a meditation cushion, bench, or chair, ensure your seating supports proper posture for extended sitting.",
      "- **Natural elements**: Incorporate plants, wood, or water features to bring the grounding energy of nature indoors.",
      "- **Minimal décor**: Keep the space uncluttered to minimize distractions. Each item should have intention and purpose.",
      "- **Soft lighting**: Natural light is ideal, but soft lamps or candles can create a serene atmosphere, especially for evening meditation.",
      "## Crystals to Enhance Your Meditation",
      "Different crystals bring unique energies to your practice. Here are some excellent choices for beginners.",
      "**Clear Quartz**: The master healer, clear quartz amplifies the energy of other crystals and helps clarify intentions. Place it in front of you during meditation to enhance focus and clarity.",
      "**Amethyst**: This purple stone is exceptional for spiritual work and connecting to higher consciousness. It helps quiet the mind and deepen meditative states.",
      "**Rose Quartz**: When working with heart-centered meditation, rose quartz opens the heart chakra and infuses your practice with gentle, loving energy.",
      "**Black Tourmaline**: For grounding and protection, place black tourmaline at the perimeter of your space to create an energetic shield.",
      "**Selenite**: This luminous crystal clears energy blockages and creates a serene, peaceful atmosphere perfect for meditation."
    ]
  },
  {
    id: "2",
    slug: "tarot-crystal-connection",
    title: "The Connection Between Tarot and Crystal Energy",
    author: "Michael Stevens",
    date: "2023-04-28",
    category: "Divination",
    excerpt: "Discover how to enhance your tarot readings with specific crystals that amplify intuition and clarity. This guide explores the synergistic relationship between these two divination tools.",
    coverImage: "https://images.unsplash.com/photo-1601850513971-931e5a0fbbf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    content: [
      "Tarot cards and crystals represent two of the most powerful divination tools available to those on a spiritual path. While each is potent on its own, when used together, they create a synergistic relationship that can dramatically enhance your readings and spiritual practice.",
      "## The Energetic Relationship",
      "Tarot cards serve as a mirror to our subconscious, revealing hidden patterns and potential paths forward. Crystals, on the other hand, emit consistent vibrational frequencies that can influence our energy field. When paired intentionally, crystals can amplify the messages from the tarot while helping the reader achieve the clarity and receptivity needed for accurate interpretation.",
      "## Crystals for Enhancing Tarot Reading Abilities",
      "**Clear Quartz**: Often called the 'master crystal,' clear quartz amplifies energy and thought, making it perfect for strengthening the connection between reader, cards, and intuition. Place it on your reading table or hold it in your non-dominant hand while shuffling.",
      "**Amethyst**: This purple stone enhances psychic abilities and spiritual awareness, helping readers access deeper levels of intuitive knowledge during readings. It's especially helpful for those who are developing their divinatory skills.",
      "**Labradorite**: Known as the 'stone of magic,' labradorite protects your aura while facilitating access to higher realms of consciousness. It helps readers see beyond surface meanings to the mystical significance of the cards.",
      "**Moonstone**: This luminous crystal enhances intuition and empathic abilities, allowing readers to better connect with both the cards and the person receiving the reading. It's particularly powerful for readings done during the full moon."
    ]
  },
  {
    id: "3",
    slug: "crystal-home-design",
    title: "Integrating Crystal Energy into Your Home Design",
    author: "Sophia Chen",
    date: "2023-04-12",
    category: "Lifestyle",
    excerpt: "Create a harmonious living space by strategically placing crystals throughout your home. Learn which stones work best in different rooms and how to cleanse your space energetically.",
    coverImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
    content: [
      "Your home is more than just a physical structure; it's an energy field that significantly impacts your mood, health, and overall well-being. By thoughtfully incorporating crystals into your home design, you can transform your living space into a sanctuary that supports your intentions and lifestyle.",
      "## Understanding Home Energy",
      "Every home has its own energy flow, often referred to as chi in Feng Shui. This energy can become stagnant, chaotic, or harmonious depending on factors like layout, clutter, and the objects within the space. Crystals work as energy tools that can help direct, cleanse, and enhance this flow.",
      "## General Principles for Placing Crystals at Home",
      "- **Intention is key**: Before placing crystals, clarify what energy you want to cultivate in each space",
      "- **Size matters**: Larger crystals have a more significant energetic impact on a room",
      "- **Quality over quantity**: A few well-chosen, high-quality crystals are more effective than many smaller pieces",
      "- **Trust intuition**: Sometimes, your intuition about where a crystal belongs overrides conventional wisdom",
      "## Room-by-Room Crystal Placement Guide",
      "**Living Room**",
      "As the social heart of your home, the living room benefits from crystals that promote harmony and communication:",
      "- **Rose Quartz**: Place larger pieces in the southwest corner to enhance family relationships and create a loving atmosphere",
      "- **Amethyst**: Use clusters or geodes as striking centerpieces that also cleanse the energy and promote peaceful gathering",
      "- **Citrine**: Position in the wealth corner (southeast) to attract abundance and positive energy",
      "- **Clear Quartz**: Place near windows to maximize natural light energy and clear stagnant air"
    ]
  }
];