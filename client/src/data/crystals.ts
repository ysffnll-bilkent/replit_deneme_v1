export interface Crystal {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  category: string;
  properties: string[];
  chakras: string[];
  zodiacSigns: string[];
  elements: string[];
}

export const crystals: Crystal[] = [
  {
    id: "1",
    slug: "rose-quartz",
    name: "Rose Quartz",
    shortDescription: "The stone of unconditional love and infinite peace",
    longDescription: "Rose Quartz is the stone of universal love. It restores trust and harmony in relationships, encouraging unconditional love. It purifies and opens the heart at all levels to promote love, self-love, friendship, deep inner healing and feelings of peace. Rose Quartz strengthens and balances the physical heart and circulatory system, and releases impurities from body fluids. It hastens recovery, reduces high blood pressure, aids chest and lung problems, heals the kidneys and adrenals, and alleviates vertigo.",
    image: "https://images.unsplash.com/photo-1603344204980-4edb0ea63148?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "Love",
    properties: [
      "Promotes unconditional love",
      "Restores trust in relationships",
      "Encourages self-love and acceptance",
      "Brings deep inner healing",
      "Enhances emotional balance"
    ],
    chakras: ["Heart"],
    zodiacSigns: ["Taurus", "Libra"],
    elements: ["Water"]
  },
  {
    id: "2",
    slug: "clear-quartz",
    name: "Clear Quartz",
    shortDescription: "The master healer amplifying energy and thought",
    longDescription: "Clear Quartz is known as the 'master healer' and will amplify energy and thought, as well as the effect of other crystals. It absorbs, stores, releases and regulates energy. Clear Quartz draws off negative energy of all kinds, neutralizing background radiation, including electromagnetic smog or petrochemical emanations. It balances and revitalizes the physical, mental, emotional and spiritual planes. Cleanses and enhances the organs and subtle bodies and acts as a deep soul cleanser, connecting the physical dimension with the mind. Clear Quartz enhances psychic abilities. It aids concentration and unlocks memory. Stimulates the immune system and brings the body into balance.",
    image: "https://images.unsplash.com/photo-1507832321772-e86cc0452e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "Clarity",
    properties: [
      "Amplifies energy and intentions",
      "Enhances psychic abilities",
      "Improves concentration and memory",
      "Balances all chakras",
      "Cleanses negative energy"
    ],
    chakras: ["Crown", "Third Eye"],
    zodiacSigns: ["All"],
    elements: ["All"]
  },
  {
    id: "3",
    slug: "citrine",
    name: "Citrine",
    shortDescription: "The light-filled stone of abundance and manifestation",
    longDescription: "Citrine is a premier stone of manifestation, imagination, and personal will. Carrying the power of the sun, it is warm and comforting, energizing and life giving. It stimulates the chakras like the sunlight of spring, clearing the mind and stirring the soul to action. Its frequency awakens creativity and imagination, and sustains the process of transforming dreams and wishes into tangible form. With its pure yellow energy, Citrine clears the mind, stirs the soul to action, and is a powerful attractor of prosperity, success, and all things good. It has been called 'The Merchant's Stone' for its properties of increase in the cashbox, and a sparkling circle of Citrine crystals in the form of a 'Citrine Circle' is said to increase prosperity and protect against poverty.",
    image: "https://pixabay.com/get/g0419bdbe219ac3a191498b4a9e87cea303dee2efd31e399f9b03fb7a8a3198dbd830a6ab7f47308cf0b5f937536293f289f0f430982d0fcf2893bcbe531b39ae_1280.jpg",
    category: "Abundance",
    properties: [
      "Attracts wealth and prosperity",
      "Increases manifestation abilities",
      "Enhances creativity",
      "Promotes positivity",
      "Brings success in business"
    ],
    chakras: ["Solar Plexus", "Sacral"],
    zodiacSigns: ["Aries", "Gemini", "Leo", "Libra"],
    elements: ["Fire"]
  },
  {
    id: "4",
    slug: "lapis-lazuli",
    name: "Lapis Lazuli",
    shortDescription: "The wisdom keeper and third-eye activator",
    longDescription: "Lapis Lazuli is one of the most sought after stones in use since man's history began. Its deep, celestial blue remains the symbol of royalty and honor, gods and power, spirit and vision. It is a universal symbol of wisdom and truth. In ancient Egypt Lapis Lazuli was a favorite stone for amulets and ornaments such as scarabs. It was also used by the Assyrians and Babylonians for cylinder seals, and in ancient times was ground and processed for use as a cosmetic eye shadow. The Romans believed this royal stone to be a powerful aphrodisiac. In the Middle Ages, it was thought to keep the limbs healthy, and free the soul from error, envy and fear.",
    image: "https://pixabay.com/get/g6673d1c632792c64824b4f2b1de8ebf351f9c170631052e2a61a1363a10f9a74ae0485d9c01a94f796bd5417c45ad95366da3de982be358d5dde56ba35e8c81a_1280.jpg",
    category: "Wisdom",
    properties: [
      "Enhances intellectual ability",
      "Stimulates desire for knowledge",
      "Aids in problem-solving",
      "Promotes honesty and compassion",
      "Activates higher consciousness"
    ],
    chakras: ["Third Eye", "Throat"],
    zodiacSigns: ["Sagittarius", "Libra"],
    elements: ["Water", "Air"]
  },
  {
    id: "5",
    slug: "green-aventurine",
    name: "Green Aventurine",
    shortDescription: "The stone of opportunity and heart healing",
    longDescription: "Green Aventurine is known as the 'Stone of Opportunity,' thought to be the luckiest of all crystals, especially in manifesting prosperity and wealth, or for increasing favor in competitions or games of chance. Its winning energy makes it a great ally for boosting one's chances in any situation - a first date, tax audit, even landing a promotion. Green Aventurine releases old patterns, habits and disappointments so new growth can take place. It brings optimism and a zest for life, allowing one to move forward with confidence and to embrace change. It enhances one's creativity and motivation, and encourages perseverance in maneuvering life's obstacles. It also reinforces one's decisiveness and amplifies leadership qualities, injecting a sense of humor and openness to the ideas of others.",
    image: "https://pixabay.com/get/g869127108ee1244d1acbeb1eff496e8c52f3be3d5e6a7535838f6e66452c37d494686dc7bf5b29be79ed7651714ebddb06478eee17f1d500ee9015d67d680d7e_1280.jpg",
    category: "Luck",
    properties: [
      "Attracts luck and opportunity",
      "Enhances prosperity",
      "Reinforces leadership qualities",
      "Promotes well-being",
      "Soothes emotional wounds"
    ],
    chakras: ["Heart"],
    zodiacSigns: ["Taurus", "Virgo"],
    elements: ["Earth"]
  },
  {
    id: "6",
    slug: "black-obsidian",
    name: "Black Obsidian",
    shortDescription: "The truth revealer and protector",
    longDescription: "Black Obsidian is a powerful cleanser of psychic smog created within your aura, and is a strong psychic protection stone. It forms a shield against negativity and disperses unloving thoughts. Black Obsidian draws out mental stress and tension. Use it to help reduce symptoms of depression, and to bring clarity to the mind by helping to clear confusion and constricted thinking. Obsidian is a stone of truth, honesty, and detachment. It reveals secrets, hidden truths, and exposes blockages. It offers release from tension and enables one to move forward in life with a sense of power and focused energy, improving self-control and resilience. It has the power to draw emotions to the surface to be examined, understood, and released when appropriate.",
    image: "https://pixabay.com/get/ge67dd78c30f7918870ebdc081efec4210827c601d0a7b4526f058f29bac972431efcfe23b577ed9b909283b39f1caa99473b4602f9486b8555f5d694188297a3_1280.jpg",
    category: "Protection",
    properties: [
      "Provides psychic protection",
      "Shields against negativity",
      "Brings truth to the surface",
      "Grounds excess energy",
      "Releases emotional blockages"
    ],
    chakras: ["Root"],
    zodiacSigns: ["Sagittarius", "Scorpio"],
    elements: ["Fire", "Earth"]
  },
  {
    id: "7",
    slug: "moonstone",
    name: "Moonstone",
    shortDescription: "The divine feminine stone of new beginnings",
    longDescription: "Moonstone is a stone of inner growth and strength. It soothes emotional instability and stress, and stabilizes the emotions, providing calmness. Moonstone enhances intuition, promotes inspiration, success and good fortune in love and business matters. Moonstone is a stone of hope and spiritual growth. It brings the wearer intuitive insight, enhances communication, and enables one to follow their heart. Linked with the energies of the moon, it enables the wearer to connect with all of the cycles of life, especially the female menstrual cycle. Moonstone bestows harmonious life patterns on the wearer and helps to balance emotions and heal stress. It can connect the wearer with lunar wisdom and empowerment.",
    image: "https://pixabay.com/get/g8c87d217e2de6597aac6314a02683b4159048ac749231819b48c60b7513c8918927c3f7b6e0cf42c75dfd283d36efb80_1280.jpg",
    category: "Intuition",
    properties: [
      "Enhances intuition",
      "Promotes new beginnings",
      "Brings good fortune",
      "Balances emotions",
      "Connects with divine feminine energy"
    ],
    chakras: ["Crown", "Third Eye", "Sacral"],
    zodiacSigns: ["Cancer", "Libra", "Scorpio"],
    elements: ["Water"]
  },
  {
    id: "8",
    slug: "red-jasper",
    name: "Red Jasper",
    shortDescription: "The nurturing stone of endurance and strength",
    longDescription: "Red Jasper is a stone of physical strength and energy, stimulating the root chakra and imparting stamina. It strengthens one's life force and promotes a courageous attitude. This stone helps bring problems to light before they become too big, and provides insights into difficult situations. Red Jasper makes an excellent worry or rubbing stone to be carried for grounding and calming excess energy. It is wonderful for stabilizing the aura by bringing it gently into alignment with the physical body, and can be used in healing to realign the layers of the subtle bodies. It aids the release of toxins from the cells, and helps in assimilating new experiences and ideas into the mind. Red Jasper also reverses a lack of drive and initiative, and generally increases energy levels.",
    image: "https://pixabay.com/get/g7a5162671713d103a066df88fca71a62b405ecce3d73d8cbf81f89f945e443610e3ee9ba1549141a3ddd30c641e5683c5259dbca40f91f16f2185db2e2de0df3_1280.jpg",
    category: "Vitality",
    properties: [
      "Increases physical stamina",
      "Provides emotional endurance",
      "Stimulates life force energy",
      "Grounds and stabilizes",
      "Promotes courage and determination"
    ],
    chakras: ["Root"],
    zodiacSigns: ["Aries", "Scorpio", "Capricorn"],
    elements: ["Fire", "Earth"]
  },
  {
    id: "9",
    slug: "amethyst",
    name: "Amethyst",
    shortDescription: "The spiritual stone of peace and tranquility",
    longDescription: "Amethyst is a meditative and calming stone which works in the emotional, spiritual, and physical planes to promote calm, balance, and peace. It is also used to eliminate impatience. Amethyst is one of the most spiritual stones, promoting love of the divine, giving insights into its true nature, and encouraging selflessness and spiritual wisdom. It opens intuition and enhances psychic gifts. It works in the third eye, crown and etheric chakras. Amethyst assists in remembering and understanding dreams. It relieves insomnia. Place an amethyst under your pillow to bring about pleasant dreams, or rub it across your forehead to offer relief from headaches. Amethyst is excellent for meditation. It stills the mind and promotes spirituality.",
    image: "https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
    category: "Peace",
    properties: [
      "Promotes spiritual awareness",
      "Calms the mind",
      "Enhances meditation",
      "Relieves stress and anxiety",
      "Aids in restful sleep"
    ],
    chakras: ["Third Eye", "Crown"],
    zodiacSigns: ["Pisces", "Virgo", "Sagittarius", "Aquarius"],
    elements: ["Air", "Water"]
  }
];

export const getCrystalBySlug = (slug: string): Crystal | undefined => {
  return crystals.find(crystal => crystal.slug === slug);
};
