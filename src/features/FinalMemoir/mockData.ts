// cspell:disable

import { MemoryItem, ShortQuote, HeroPhoto } from "./types";

export const mockHeroPhotos: HeroPhoto[] = [
  { id: "hp1", url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", caption: "The front porch, 1958." },
  { id: "hp2", url: "https://images.unsplash.com/photo-1553531087-b25a0b9a68ab?q=80&w=800&auto=format&fit=crop", caption: "The famous red suitcase." },
  { id: "hp3", url: "https://images.unsplash.com/photo-1495434942714-fb54719d08bf?q=80&w=800&auto=format&fit=crop", caption: "The oak table where everything was solved." },
  { id: "hp4", url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", caption: "The wedding reception, 2019." },
  { id: "hp5", url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop", caption: "Summer road trips to the coast." },
  { id: "hp6", url: "https://images.unsplash.com/photo-1586521995568-39abaa0c2311?q=80&w=800&auto=format&fit=crop", caption: "Letters kept in the top drawer." },
  { id: "hp7", url: "https://images.unsplash.com/photo-1577048981555-52037946973e?q=80&w=800&auto=format&fit=crop", caption: "Afternoon tea with the neighbors." },
  { id: "hp8", url: "https://images.unsplash.com/photo-1460533893735-45cea2212645?q=80&w=800&auto=format&fit=crop", caption: "The municipal gardens in autumn." }
];

export const mockMemories: MemoryItem[] = [
  {
    id: "mem-1",
    author: "Sarah",
    title: "Sunday mornings on the porch",
    text: "Nadia was always awake before everyone else. On Sunday mornings, while the rest of the house was still quiet, she would sit on the porch with the window beside her left open. She liked hearing the sounds of the neighborhood waking up—the birds in the trees, the footsteps of people passing by, and the distant voices of children playing. She noticed things other people ignored. She knew which neighbor had planted new flowers, which child had learned to ride a bicycle, and when someone was having a difficult day simply by looking at their face. Even as a young girl, Nadia seemed to understand that people often said more without words than they did with them.\n\nSarah remembers sitting beside her one Sunday morning. Nadia pointed toward the street and began telling her little stories about the people walking past. She made ordinary people seem interesting and ordinary moments seem important. “Everyone has a story,” she said, as if it were the simplest truth in the world. That was Nadia's gift. She paid attention. Years later, when people described her as a loving mother, a dependable aunt, or a loyal friend, Sarah often thought about that little girl on the porch. Before Nadia became all those things to other people, she was simply a girl sitting beside an open window, watching the world carefully and learning how to love it.",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    imageCaption: "The front porch, 1958.",
    reactionsCount: 14,
    chapter: "The girl with the open window",
    chapterSubtitle: "Before she was anyone's mother, aunt, or friend, Nadia was a girl who noticed everything.",
    date: "June 14, 1958",
  },
  {
    id: "mem-2",
    author: "Uncle Tariq",
    title: "The quiet rebellion",
    text: "Even as a teenager, Nadia possessed a quiet rebellion that manifested in the most unexpected ways. While the rest of us were content to follow the strict routines laid out by our parents, she would sneak thick, leather-bound novels into the kitchen, hiding them beneath the folds of her apron as she helped prepare dinner. I remember walking in on her once; she was stirring a pot of lentil soup with one hand while holding a worn copy of Dickens in the other, completely absorbed in a world far beyond our small neighborhood. When she realized I was watching, she didn't apologize or put the book away.\n\nInstead, she simply smiled, placed a finger over her lips, and handed me a warm piece of bread. That was how she navigated life—bending the rules just enough to make room for her own passions, but always with enough grace and generosity that no one could ever bear to be angry with her. She taught me early on that you could live a life of profound duty without ever losing your sense of personal wonder, a lesson that shaped the way I viewed my own responsibilities in the years that followed.",
    reactionsCount: 22,
    chapter: "The girl with the open window",
    chapterSubtitle: "Before she was anyone's mother, aunt, or friend, Nadia was a girl who noticed everything.",
    date: "September 8, 1962",
  },
  {
    id: "mem-3",
    author: "Amir",
    title: "The red suitcase",
    text: "Nadia's red suitcase was never just a suitcase. It seemed to follow her everywhere, becoming part of the family long before anyone realized how many memories it would eventually hold. Whenever she traveled, even for a short visit, she packed more than she needed. There were clothes folded neatly inside, a small notebook, family photographs, and, of course, her cinnamon biscuits. She insisted that every journey needed something homemade to eat. Amir remembers one particular trip when the family was traveling for several hours. Everyone was tired and impatient, but Nadia seemed completely unaffected. She opened her suitcase, handed everyone a biscuit, and began telling a story about a trip she had taken years earlier. By the time she finished, everyone was laughing. She had a way of making even inconvenient journeys feel like adventures.\n\nThe red suitcase also became a place where she kept small reminders of the people she loved. Old letters, photographs, handwritten recipes, and little objects that meant nothing to anyone else were precious to her. She never liked throwing away things connected to memories. Amir believes that was because Nadia understood something most people learn much later: objects disappear, but the stories attached to them can survive. Whenever Amir sees a red suitcase today, he thinks of Nadia. He remembers the cinnamon biscuits, the songs she hummed during long journeys, and the stories that made the road seem shorter. Nadia never traveled empty-handed. She carried pieces of home with her wherever she went.",
    imageUrl: "https://images.unsplash.com/photo-1553531087-b25a0b9a68ab?q=80&w=800&auto=format&fit=crop",
    imageCaption: "The famous red suitcase, packed for a journey.",
    reactionsCount: 25, 
    chapter: "The things she carried",
    chapterSubtitle: "She carried recipes, songs, and a talent for turning journeys into stories.",
    date: "August 2, 1974",
  },
  {
    id: "mem-4",
    author: "Aunt Salma",
    title: "The embroidered handkerchiefs",
    text: "There was a specific elegance to the way Nadia organized her life, perhaps best illustrated by her collection of embroidered handkerchiefs. She carried one with her every single day, tucked neatly into the side pocket of her handbag alongside loose mints and grocery receipts. They were never just for show; she used them to wipe away the tears of a distressed child in the park, to dust off a park bench before sitting, or to wrap up a fragile shell she found on the beach. What struck me most was that each handkerchief had a tiny, intricate floral pattern hand-stitched into the corner—a detail she added herself during the quiet evening hours.\n\nIt was a testament to her profound belief that even the most utilitarian objects should be treated with care and made beautiful. She spent countless hours selecting the perfect colored threads, working under the dim light of the living room lamp while the rest of the house slept. To this day, I cannot see a linen handkerchief without thinking of the quiet dignity with which she moved through the world, turning the mundane into something entirely exquisite.",
    reactionsCount: 15,
    chapter: "The things she carried",
    chapterSubtitle: "She carried recipes, songs, and a talent for turning journeys into stories.",
    date: "March 11, 1983",
  },
  {
    id: "mem-5",
    author: "Leila",
    title: "A second chance",
    text: "There was something about Nadia's home that made people feel safe. The door was rarely closed to someone who needed help, and there was almost always a chair available at the table. Leila remembers coming to Nadia during one of the most difficult periods of her life. She had made a mistake and was afraid that she had damaged a relationship beyond repair. She expected Nadia to tell her what she had done wrong. Instead, Nadia simply asked her to sit down. For a long time, Nadia said nothing. She listened. Leila talked about what had happened, explaining herself badly at first, then honestly. Nadia did not interrupt or judge her. When Leila finally stopped talking, Nadia asked one question: “What are you going to do differently?”\n\nIt was not the answer Leila expected, but it was exactly what she needed. Nadia believed that apologies meant very little if they were not followed by change. She encouraged Leila to face the person she had hurt, admit what she had done, and ask for forgiveness without demanding it. The conversation did not magically fix everything. Nadia never promised that it would. But she helped Leila understand that making a mistake did not have to be the end of the story. Years later, Leila still remembers sitting in that room. She remembers the tea on the table, the quietness of Nadia's voice, and the feeling that she was allowed to be imperfect without being abandoned. Nadia gave people something rare: the courage to try again. Her home had four walls, but somehow there was always room for one more person, one more problem, and one more chance.",
    reactionsCount: 31,
    chapter: "A room at the center",
    chapterSubtitle: "People came to Nadia with their troubles because she always made room for one more.",
    date: "November 21, 1996",
  },
  {
    id: "mem-6",
    author: "Elena",
    title: "The kitchen table",
    text: "The large oak table in the center of Nadia's kitchen was the gravitational pull of our entire family. It was battered and scratched from decades of use, bearing the faint indentations of children's homework, the rings of countless tea cups, and the subtle scorch marks from hot pans set down too hastily. Yet, no matter how chaotic the world outside felt, pulling up a chair to that table felt like dropping anchor in a safe harbor. Nadia would often sit at the head, peeling vegetables or snapping green beans, perfectly content to listen to whoever needed to talk. She had this remarkable ability to make you feel as though your problems were the only thing that mattered in that moment.\n\nShe rarely offered unsolicited advice; instead, she would ask gentle, probing questions that somehow guided you to your own solutions. She believed deeply in the therapeutic nature of a shared meal and a quiet space to simply exist without expectation. By the time you finished your tea and stood up from that scratched wooden chair, the heavy burdens you had carried through the front door always felt inexplicably lighter. That table was her true legacy.",
    imageUrl: "https://images.unsplash.com/photo-1495434942714-fb54719d08bf?q=80&w=800&auto=format&fit=crop",
    imageCaption: "The oak table where everything was solved.",
    reactionsCount: 19,
    chapter: "A room at the center",
    chapterSubtitle: "People came to Nadia with their troubles because she always made room for one more.",
    date: "February 16, 2004",
  },
  {
    id: "mem-7",
    author: "Daniel",
    title: "The last dance",
    text: "By the time of the wedding, Nadia moved more slowly than she once had. She needed to rest more often, and everyone expected her to spend most of the evening sitting with the family. But when the music started, Nadia stood up. Daniel remembers watching her walk toward the dance floor. At first, she moved carefully, holding onto someone's hand for balance. Then the music changed, and somehow she seemed to forget that she was supposed to be tired. She smiled. She danced. People around her began laughing and clapping, and Nadia stayed on the floor long after most of the guests had returned to their seats. Daniel remembers thinking that she looked exactly like the stories people had told about her when she was younger. The girl who sat by the open window. The woman with the red suitcase. The person who always had a chair waiting for someone who needed it.\n\nEverything seemed connected in that moment. Her life had been made of ordinary things: Sunday mornings, homemade biscuits, conversations at the kitchen table, family gatherings, difficult apologies, celebrations, and countless small acts of kindness. Yet those ordinary things had become extraordinary because Nadia had filled them with attention and love. When the song ended, she laughed and returned to her seat. She looked tired, but happy. Daniel says that is how he wants to remember her—not as someone whose life was coming to an end, but as someone who was still completely present in it. The years may have changed Nadia, but they never took away what mattered most. Her warmth remained. And long after the music stopped, it stayed with everyone who had been lucky enough to know her.",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    imageCaption: "The wedding reception, 2019.",
    reactionsCount: 34, 
    chapter: "What stays warm",
    chapterSubtitle: "The final years did not make her world smaller. They showed us what it had always held.",
    date: "May 18, 2019",
  },
  {
    id: "mem-8",
    author: "Marcus",
    title: "Autumn walks",
    text: "During her later years, when the house grew quieter and her pace slowed, Nadia developed a profound appreciation for her daily autumn walks through the municipal gardens. She would wrap herself in a thick wool scarf—the same burgundy one she wore for nearly a decade—and step out into the crisp air with a deliberate, unhurried grace. I accompanied her on several of these walks, and I was always struck by how fiercely observant she remained. She would pause to examine the intricate frost patterns on a fallen oak leaf, or stand completely still to listen to the distant, rhythmic hammering of a woodpecker.\n\nShe didn't mourn the passing of the seasons or the fading of her own physical strength. Instead, she seemed to find a deep, resonant comfort in the cycle of nature, recognizing that there is a specific, quiet beauty in things that are winding down. It was during those walks that I realized she wasn't just observing the world; she was making her peace with it, leaving behind a legacy of quiet observation that I carry with me on every walk I take today.",
    reactionsCount: 16,
    chapter: "What stays warm",
    chapterSubtitle: "The final years did not make her world smaller. They showed us what it had always held.",
    date: "October 12, 2021",
  }
];

export const mockShortQuotes: ShortQuote[] = [
  { id: "q1", author: "Aunt Sarah", text: "She always had peppermint candies in her left coat pocket. Always." },
  { id: "q2", author: "David (Nephew)", text: "I've never seen a woman cut an apple with such mathematical precision." },
  { id: "q3", author: "Maria (Neighbor)", text: "The only person on the street who actually knew everyone's dog by name." },
  { id: "q4", author: "Sara", text: "She owned exactly three scarves, and absolutely refused to buy a fourth." },
  { id: "q5", author: "Imran", text: "She'd hum that same sea shanty every single time she washed the dishes." },
  { id: "q6", author: "Uncle Tariq", text: "She never wore a watch, but always knew exactly when the kettle was about to boil." },
  { id: "q7", author: "Elena", text: "The smell of crushed cardamom always means grandma is in the room." },
  { id: "q8", author: "Marcus", text: "A handshake from Nadia meant far more than a signed contract." },
  { id: "q9", author: "Clara", text: "She folded her newspaper into perfect little squares before throwing it away." },
  { id: "q10", author: "Dr. Aris", text: "She could fix a broken radio with nothing but a butter knife and patience." }
];

export const scatterPositions = [
  { top: "10%", left: "5%", rotate: "-6deg" },
  { top: "15%", left: "35%", rotate: "4deg" },
  { top: "5%", left: "65%", rotate: "-3deg" },
  { top: "40%", left: "10%", rotate: "8deg" },
  { top: "50%", left: "45%", rotate: "-5deg" },
  { top: "35%", left: "75%", rotate: "6deg" },
  { top: "70%", left: "20%", rotate: "-8deg" },
  { top: "80%", left: "60%", rotate: "5deg" },
];