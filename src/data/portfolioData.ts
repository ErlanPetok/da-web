import type { Lang, ProjectItem, SkillNode } from '../utils/portfolio';

export const PROFILE = {
  monogram: 'EH',
  handle: 'ErlanHoshi',
  fullName: 'Erlangga Juan Fadilah',
  shortName: 'Erlangga',
  birthYear: '2008',
  school: 'SMK Al-Hadiid 1 Cileungsi',
  location: 'Bogor, Indonesia',
  locationMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bogor%2C+Indonesia',
  email: 'erlanggajuanfadilah10@gmail.com',
  phoneDisplay: '+62 858 8236 2126',
  phoneCopy: '+6285882362126',
  whatsappUrl:
    'https://wa.me/6285882362126?text=Halo%20Erlangga%2C%20saya%20tertarik%20bekerja%20sama%20untuk%20proyek%20website.',
  githubHandle: 'ErlanPetok',
  githubUrl: 'https://github.com/ErlanPetok',
  heroAvatarUrl:
    'https://images.hiwaifu.com/redraw/avatar/51/51b65905e1c1a6be2caff1a4e119dfb9.webp?image_process=resize,w_640',
  heroAvatarFallback: './assets/portfolio/art-1-full.webp',
  aboutPortraitUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjtjBJyjXQgWYNt9izdgEBpu7B8J-BlduPEW_9fznJnQ&s=10',
  aboutPortraitFallback: './assets/portfolio/art-4-full.webp',
  music: {
    youtubeId: '7IdYeEh8i8g',
    title: 'Amore',
    artist: 'ReoNa',
  },
};

export interface TimelineEntry {
  id: string;
  code: string;
  date: Record<Lang, string>;
  title: Record<Lang, string>;
  sub: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export interface ArtworkItem {
  id: string;
  indexCode: string;
  thumb: string;
  full: string;
  title: Record<Lang, string>;
  desc: Record<Lang, string>;
}

export interface CreativeEssay {
  id: 'game' | 'thinking';
  code: string;
  title: Record<Lang, string>;
  short: Record<Lang, string>;
  paras: Record<Lang, string[]>;
  points: Record<Lang, Array<[string, string]>>;
}

export const TIMELINE_ITEMS: TimelineEntry[] = [
  {
    id: 'web-dev',
    code: '01',
    date: { id: '2025 - Sekarang', en: '2025 - Present' },
    title: {
      id: 'Pengembangan Web & Proyek Pribadi',
      en: 'Web Development & Personal Projects',
    },
    sub: {
      id: 'Belajar mandiri dan berkarya',
      en: 'Independent learning and projects',
    },
    desc: {
      id: 'Membangun dan mengembangkan proyek web pribadi sambil meningkatkan keterampilan praktis.',
      en: 'Building and improving personal web projects while developing practical skills.',
    },
  },
  {
    id: 'smk',
    code: '02',
    date: { id: '2023 - Sekarang', en: '2023 - Present' },
    title: { id: 'SMK Al-Hadiid 1 Cileungsi', en: 'SMK Al-Hadiid 1 Cileungsi' },
    sub: {
      id: 'Sekolah Menengah Kejuruan · Saat ini',
      en: 'Vocational High School · Current',
    },
    desc: {
      id: 'Saat ini menempuh pendidikan di SMK Al-Hadiid 1 Cileungsi.',
      en: 'Currently studying at SMK Al-Hadiid 1 Cileungsi.',
    },
  },
  {
    id: 'smp',
    code: '03',
    date: { id: '2020 - 2023', en: '2020 - 2023' },
    title: { id: 'SMPN 31 Depok', en: 'SMPN 31 Depok' },
    sub: { id: 'Sekolah Menengah Pertama', en: 'Junior High School' },
    desc: {
      id: 'Menyelesaikan pendidikan menengah pertama di SMPN 31 Depok.',
      en: 'Completed junior high school at SMPN 31 Depok.',
    },
  },
  {
    id: 'sd',
    code: '04',
    date: { id: '2014 - 2020', en: '2014 - 2020' },
    title: { id: 'SDN Cilodong 1', en: 'SDN Cilodong 1' },
    sub: { id: 'Sekolah Dasar', en: 'Elementary School' },
    desc: {
      id: 'Menyelesaikan pendidikan dasar di SDN Cilodong 1.',
      en: 'Completed elementary education at SDN Cilodong 1.',
    },
  },
  {
    id: 'born',
    code: '05',
    date: { id: '2008', en: '2008' },
    title: { id: 'Lahir', en: 'Born' },
    sub: { id: 'Indonesia', en: 'Indonesia' },
    desc: { id: 'Lahir pada tahun 2008.', en: 'Born in 2008.' },
  },
];

export const SKILL_NODES: SkillNode[] = [
  {
    id: 'ui',
    code: 'ST-01',
    label: { id: 'Desain UI', en: 'UI Design' },
    description: {
      id: 'Merancang antarmuka yang bersih dan mudah dipakai di Figma, dari tata letak sampai warna dan tipografi.',
      en: 'Designing clean, usable interfaces in Figma, from layout to color and typography.',
    },
    x: 46,
    y: 48,
    links: ['html', 'illus', 'edit'],
  },
  {
    id: 'html',
    code: 'ST-02',
    label: { id: 'HTML & Web', en: 'HTML & Web' },
    description: {
      id: 'Membangun halaman web yang terstruktur dan nyaman dipakai di semua ukuran layar.',
      en: 'Building structured web pages that work well on every screen size.',
    },
    x: 20,
    y: 28,
    links: ['ui', 'network'],
  },
  {
    id: 'illus',
    code: 'ST-03',
    label: { id: 'Ilustrasi Digital', en: 'Digital Illustration' },
    description: {
      id: 'Menggambar karakter dan adegan secara digital. Saya menjelajahi komposisi, warna, karakter, dan penceritaan visual.',
      en: 'Drawing characters and scenes digitally. I explore composition, color, character and visual storytelling.',
    },
    x: 74,
    y: 24,
    links: ['ui', 'edit'],
  },
  {
    id: 'edit',
    code: 'ST-04',
    label: { id: 'Editing Foto & Video', en: 'Photo & Video Editing' },
    description: {
      id: 'Mengedit foto dan video: warna, potongan, dan tempo untuk bercerita secara visual.',
      en: 'Editing photos and videos: color, cuts and pacing to tell a clear visual story.',
    },
    x: 78,
    y: 72,
    links: ['ui', 'illus'],
  },
  {
    id: 'network',
    code: 'ST-05',
    label: { id: 'MikroTik', en: 'MikroTik' },
    description: {
      id: 'Mengatur dan mengelola jaringan dengan router MikroTik (RouterOS).',
      en: 'Setting up and managing networks with MikroTik routers (RouterOS).',
    },
    x: 16,
    y: 74,
    links: ['html'],
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'hoshino-daily',
    category: 'dashboard',
    categoryLabel: {
      id: 'Keuangan Pribadi · PWA',
      en: 'Personal Finance · PWA',
    },
    title: "Hoshino's Daily — Wallet Tracker",
    shortDesc: {
      id: 'Pelacak dompet pribadi yang terus dikembangkan dan diperbarui secara berkala.',
      en: 'A personal wallet tracker that is actively maintained and continuously improved.',
    },
    fullDesc: {
      id: 'PWA pelacak keuangan pribadi yang terus dikembangkan. Mendukung pencatatan pemasukan dan pengeluaran, pecahan mata uang yang dapat disesuaikan, penyimpanan data lokal, alat cadangan, tema, serta antarmuka bertema Hoshino.',
      en: 'An actively maintained personal wallet tracker PWA. It supports income and expense tracking, customizable denominations, local data storage, backup tools, themes, and an evolving Hoshino-themed interface. This project is ongoing and continues to receive updates.',
    },
    tags: ['PWA', 'HTML', 'CSS', 'JavaScript', 'LocalStorage', 'IndexedDB'],
    image: './assets/portfolio/wallet-tracker.jpg',
    demoUrl: 'https://wallethingy.erlanpetok.web.id',
    githubUrl: 'https://github.com/ErlanPetok/Wallet-thingy',
    status: 'ongoing',
    statusLabel: {
      id: 'Pengembangan Berlanjut',
      en: 'Ongoing Development',
    },
  },
  {
    id: 'fishing-adventure',
    category: 'game',
    categoryLabel: {
      id: 'Game Development · JavaScript',
      en: 'Game Development · JavaScript',
    },
    title: 'Fishing Adventure',
    shortDesc: {
      id: 'Game memancing browser penuh warna. Buka demo langsung untuk mencoba gameplay-nya.',
      en: 'A colorful browser fishing game. Open the live demo to experience the gameplay.',
    },
    fullDesc: {
      id: 'Game memancing berbasis browser yang dibangun dengan HTML, CSS, dan JavaScript untuk melatih logika permainan dan manipulasi DOM. Demo dapat dimainkan langsung secara online.',
      en: 'A browser-based fishing game built with HTML, CSS, and JavaScript. The playable demo is available online. This is presented as a completed project; the gameplay preview can be opened through the live demo.',
    },
    tags: ['HTML', 'CSS', 'JavaScript', 'Game Development', 'DOM'],
    image: './assets/portfolio/fishing-adventure.svg',
    demoUrl: 'https://erlanpetok.github.io/fishing-game/',
    githubUrl: 'https://github.com/ErlanPetok',
    status: 'complete',
    statusLabel: {
      id: 'Selesai · Demo Tersedia',
      en: 'Completed · Demo Available',
    },
  },
];

export const ART_ITEMS: ArtworkItem[] = [
  {
    id: '135070826',
    indexCode: '01',
    thumb: './assets/portfolio/art-0-thumb.webp',
    full: './assets/portfolio/art-0-full.webp',
    title: { id: 'Iblis Kecil yang Ceria', en: 'Cheerful Little Devil' },
    desc: {
      id: 'Pose ceria dengan sayap kelelawar, ekor berujung hati, dan sepatu bot kuning cerah di atas latar pink dan pastel yang ramai. Warnanya dibuat seriang karakternya.',
      en: 'A playful pose with bat wings, a heart-tipped tail and bright yellow rain boots, set against a loud pink and pastel backdrop. The colors are meant to feel as bouncy as the character.',
    },
  },
  {
    id: '135559025',
    indexCode: '02',
    thumb: './assets/portfolio/art-1-thumb.webp',
    full: './assets/portfolio/art-1-full.webp',
    title: { id: 'Senja di Tepi Danau', en: 'Dusk by the Lake' },
    desc: {
      id: 'Rambut pink panjang dan mata berbeda warna di depan danau dan pegunungan yang memudar ke senja keunguan. Latar bersapuan kuas berpadu dengan garis karakter yang bersih.',
      en: 'Long pink hair and mismatched eyes in front of a lake and mountains fading into purple dusk. The painterly background contrasts with the clean line art of the character.',
    },
  },
  {
    id: '138446926',
    indexCode: '03',
    thumb: './assets/portfolio/art-2-thumb.webp',
    full: './assets/portfolio/art-2-full.webp',
    title: { id: 'Tatapan di Bawah Matahari', en: 'Sunlit Glance' },
    desc: {
      id: 'Tatapan dari dekat sambil menoleh dengan cahaya hangat dari belakang pada rambut dan langit biru yang cerah. Pendar cahaya di sekitar rambut membangun suasananya.',
      en: 'A close-up look over the shoulder with strong warm backlight on the hair and a clear blue sky behind. The glow around the hair carries most of the mood.',
    },
  },
  {
    id: '139964960',
    indexCode: '04',
    thumb: './assets/portfolio/art-3-thumb.webp',
    full: './assets/portfolio/art-3-full.webp',
    title: { id: 'Cahaya Lembut', en: 'Soft Glow' },
    desc: {
      id: 'Cahaya hangat jatuh pada rambut dan wajah di depan langit gelap berasap. Kontras antara cahaya dan bayangan memberi potret ini kesan dramatis.',
      en: 'Warm light spills across the hair and face against a dark, smoky sky. The contrast between glow and shadow gives the portrait its drama.',
    },
  },
  {
    id: '140439370',
    indexCode: '05',
    thumb: './assets/portfolio/art-4-thumb.webp',
    full: './assets/portfolio/art-4-full.webp',
    title: { id: 'Senyum Kecil yang Bangga', en: 'Proud Little Smile' },
    desc: {
      id: 'Potret dekat yang jenaka dengan mata oranye dan biru, kilau bintang, serta seragam sekolah berdasi cyan. Garis tegas dan warna cerah membuatnya terasa ringan.',
      en: 'A close, playful portrait with orange and blue eyes, sparkles, and a school uniform with a cyan tie. Clean outlines and bright flat colors keep it light.',
    },
  },
  {
    id: '152031687',
    indexCode: '06',
    thumb: './assets/portfolio/art-5-thumb.webp',
    full: './assets/portfolio/art-5-full.webp',
    title: { id: 'Mahkota Bunga Daisy', en: 'Daisy Crown' },
    desc: {
      id: 'Rambut pendek, mata hijau, dan mahkota bunga daisy di depan gradasi biru lembut. Palet yang tenang dan cerah dengan detail bunga yang halus.',
      en: 'Short hair, green eyes and a daisy crown against a soft blue gradient. A calm, bright palette with delicate flower details.',
    },
  },
];

export const CREATIVE_ESSAYS: Record<'game' | 'thinking', CreativeEssay> = {
  game: {
    id: 'game',
    code: 'CR-02',
    title: { id: 'Gaming', en: 'Gaming' },
    short: {
      id: 'Minat pada video game dan cara permainan dirancang.',
      en: 'An interest in video games and how they are designed.',
    },
    paras: {
      id: [
        'Saya menikmati bermain video game, menjelajahi berbagai genre, dan mempelajari bagaimana mekanisme permainan membentuk pengalaman pemain.',
        'Game adalah tempat saya pertama kali memperhatikan interaksi: bagaimana rasanya sebuah menu, bagaimana umpan balik memberi tahu apa yang baru terjadi, dan kenapa putaran kecil bisa sulit ditinggalkan. Kebiasaan itu terbawa ke antarmuka yang saya buat.',
      ],
      en: [
        'I enjoy playing video games, exploring different genres, and learning how game mechanics shape the player experience.',
        'Games are where I first paid attention to interaction: how a menu feels, how feedback tells you what just happened, and why a tiny loop can be so hard to put down. I carry that habit into the interfaces I build.',
      ],
    },
    points: {
      id: [
        [
          'Putaran dan umpan balik',
          'Bagaimana aksi sederhana yang berulang tetap memuaskan lewat umpan balik dan tempo yang jelas.',
        ],
        [
          'Antarmuka yang mudah dibaca',
          'Bagaimana menu, HUD, dan petunjuk menyampaikan informasi dengan cepat tanpa mengganggu.',
        ],
        [
          'Suasana dan arah visual',
          'Bagaimana warna, suara, dan gaya visual membangun nuansa dunia permainan.',
        ],
      ],
      en: [
        [
          'Loops and feedback',
          'How a simple repeated action stays satisfying through clear feedback and pacing.',
        ],
        [
          'Readable interfaces',
          'How menus, HUDs and prompts communicate quickly without getting in the way.',
        ],
        [
          'Atmosphere and art direction',
          'How color, sound and visual style set the mood of a game world.',
        ],
      ],
    },
  },
  thinking: {
    id: 'thinking',
    code: 'CR-03',
    title: { id: 'Pemikiran Kreatif', en: 'Creative Thinking' },
    short: {
      id: 'Memadukan ide visual dengan pemecahan masalah praktis.',
      en: 'Combining visual ideas with practical problem-solving.',
    },
    paras: {
      id: [
        'Saya suka memadukan pemecahan masalah teknis dengan ide visual untuk membuat pengalaman digital yang berguna, ekspresif, dan menyenangkan.',
        'Menggambar melatih mata saya soal komposisi dan warna, sementara pemrograman melatih saya memecah masalah menjadi bagian kecil yang bisa diuji. Saat merancang halaman, saya mencoba memakai keduanya: susun strukturnya dulu, lalu tambahkan detail yang membuatnya terasa matang.',
      ],
      en: [
        'I like combining technical problem-solving with visual ideas to make digital experiences feel useful, expressive, and enjoyable.',
        'Drawing trained my eye for composition and color, while programming trained me to break a problem into small, testable parts. When I design a page I try to use both: get the structure right first, then add the details that make it feel considered.',
      ],
    },
    points: {
      id: [
        [
          'Mulai dari pengguna',
          'Setiap keputusan desain diuji dengan pertanyaan: apakah ini membantu orang yang memakainya?',
        ],
        [
          'Pecah masalah besar',
          'Masalah rumit dibagi menjadi langkah kecil yang bisa dikerjakan satu per satu.',
        ],
        [
          'Biarkan visual menyampaikan makna',
          'Warna, tata letak, dan gerak dipakai untuk menjelaskan, bukan sekadar menghias.',
        ],
      ],
      en: [
        [
          'Start with the person using it',
          'Every design decision is tested against one question: does this help the person using it?',
        ],
        [
          'Break big problems down',
          'Complicated problems are split into small steps that can be solved one at a time.',
        ],
        [
          'Let visuals carry meaning',
          'Color, layout and motion are used to explain things, not just to decorate.',
        ],
      ],
    },
  },
};

export const UI_COPY = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang',
      skills: 'Keahlian',
      timeline: 'Perjalanan',
      projects: 'Proyek',
      creative: 'Creative',
      github: 'GitHub',
      contact: 'Kontak',
    },
    hero: {
      topLeft: 'SMK AL-HADIID 1',
      topRight: 'ERLANHOSHI // ARCHIVE',
      status: 'Open to Freelance Projects',
      badgeLeft: 'FREELANCE DEV',
      badgeRight: 'ERLANGGA JUAN',
      introJp: '序章',
      introEn: 'INTRODUCTION.',
      personalityEn: 'PERSONALITY',
      personalityJp: '人格',
      motto:
        '"Siswa SMK, kreator visual, dan web enthusiast — membangun pengalaman digital penuh warna ♡"',
      desc: 'Saya adalah siswa SMK kelahiran 2008 di Bogor yang tertarik pada web development, desain antarmuka, ilustrasi digital, dan editing.',
      contactCta: 'Hubungi Saya',
      projectsCta: 'Lihat Proyek',
      roles: ['Freelance Web Developer', 'Frontend Enthusiast', 'UI Designer', 'Digital Illustrator'],
    },
    about: {
      tag: '01 // PROFILE',
      jpSub: '紹介 ABOUT ME',
      title: 'Tentang Saya',
      subtitle: 'Kenali lebih dekat siapa saya',
      role: 'Freelance Web Developer — Calon Lulusan SMK',
      p1: 'Halo! Saya Erlangga, lahir pada tahun 2008 dan saat ini bersekolah di SMK Al-Hadiid 1 Cileungsi. Saya tertarik pada web development, desain antarmuka, ilustrasi, dan editing. Saya senang mengembangkan kemampuan melalui proses belajar dan proyek pribadi.',
      p2: 'Sampai sekarang, saya sudah mengerjakan 10+ proyek website untuk UMKM, toko online kecil, dan teman-teman yang butuh website portofolio.',
      labels: {
        name: 'Nama',
        birth: 'Tahun lahir',
        location: 'Lokasi',
        edu: 'Pendidikan',
        email: 'Email',
        freelance: 'Freelance',
        freelanceVal: 'Tersedia',
      },
      funFacts: ['☕ 999+ kopi', '🎮 Gamer', '📚 Self-taught', '🌙 Night owl'],
    },
    skills: {
      tag: '02 // CONSTELLATION',
      jpSub: '技能 SKILLS',
      title: 'Keahlian',
      subtitle: 'Bidang yang sedang saya kembangkan',
      hint: 'Arahkan kursor atau ketuk bintang keahlian untuk melihat detail dan koneksinya.',
      connectedWith: 'Terhubung dengan',
      viewArt: 'Lihat karya saya',
    },
    timeline: {
      tag: '03 // CHRONICLE',
      jpSub: '軌跡 JOURNEY',
      title: 'Perjalanan Saya',
      subtitle: 'Pendidikan, karya, dan pencapaian',
    },
    projects: {
      tag: '04 // ARCHIVE',
      jpSub: '制作 PROJECTS',
      title: 'Proyek Saya',
      subtitle: 'Beberapa proyek yang telah saya kerjakan',
      filters: {
        all: 'Semua',
        'web-design': 'Web Design',
        ecommerce: 'E-Commerce',
        dashboard: 'Dashboard',
        game: 'Game',
      },
      emptyMsg: 'Belum ada proyek publik di kategori ini.',
      resetFilter: 'Tampilkan Semua',
      demo: 'Live Demo',
      github: 'GitHub',
      inspect: 'Detail Proyek',
    },
    creative: {
      tag: '05 // CREATIVE',
      jpSub: '創作 ART & MIND',
      title: 'Creative',
      subtitle: 'Sisi lain dari diri saya di balik kode',
      artTitle: 'Seni Digital & Ilustrasi',
      artCount: '6 karya',
      artDesc:
        'Saya senang menggambar dan membuat ilustrasi. Seni visual membantu saya mengeksplorasi komposisi, warna, karakter, dan penceritaan visual.',
      openArt: 'Lihat semua karya',
      readMore: 'Selengkapnya',
    },
    github: {
      tag: '06 // OPEN SOURCE',
      jpSub: '開発 GITHUB',
      title: 'GitHub',
      subtitle: 'Beberapa karya coding publik saya',
      desc: 'Jelajahi repositori dan proyek pengembangan saya.',
      visit: 'Kunjungi GitHub',
      loading: 'Memuat repositori publik…',
      unavailable: 'Sorotan repositori belum dapat dimuat saat ini.',
      browseAll: 'Jelajahi semua repositori di GitHub',
    },
    contact: {
      tag: '07 // DISPATCH',
      jpSub: '連絡 CONTACT',
      title: 'Hubungi Saya',
      subtitle: 'Mari berkolaborasi untuk proyek Anda',
      heading: 'Mari Bicara',
      desc: 'Punya ide proyek atau ingin bekerja sama? Saya fast response di WhatsApp!',
      wa: 'Chat via WhatsApp',
      copied: '✓ Berhasil disalin!',
      copyFail: 'Gagal menyalin',
      namePh: 'Nama Lengkap',
      emailPh: 'Email Anda',
      subjectPh: 'Subjek',
      messagePh: 'Tulis pesan Anda...',
      send: 'Kirim Pesan',
      sentNote: 'Aplikasi email Anda akan terbuka dengan pesan yang sudah siap dikirim.',
    },
    footer: {
      music: 'Soundtrack: Amore – ReoNa ♪',
      rights: 'All Rights Reserved.',
    },
    music: {
      play: 'Putar musik',
      pause: 'Jeda musik',
      showVideo: 'Tampilkan video',
      hideVideo: 'Sembunyikan video',
      ytOpen: 'Buka di YouTube',
      hostHint: 'Pemutaran YouTube disematkan mungkin dibatasi. Anda dapat membukanya langsung.',
      modeYt: 'YouTube',
      modeSynth: 'Sakura Synth',
      synthTitle: 'Sakura Music Box',
      synthArtist: 'Built-in Synth ♪',
      synthHint: 'Musik synth bawaan diputar langsung di browser tanpa perlu YouTube.',
      sfxOn: 'Suara UI: Aktif',
      sfxOff: 'Suara UI: Nonaktif',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      timeline: 'Journey',
      projects: 'Projects',
      creative: 'Creative',
      github: 'GitHub',
      contact: 'Contact',
    },
    hero: {
      topLeft: 'SMK AL-HADIID 1',
      topRight: 'ERLANHOSHI // ARCHIVE',
      status: 'Open to Freelance Projects',
      badgeLeft: 'FREELANCE DEV',
      badgeRight: 'ERLANGGA JUAN',
      introJp: '序章',
      introEn: 'INTRODUCTION.',
      personalityEn: 'PERSONALITY',
      personalityJp: '人格',
      motto:
        '"Vocational student, visual creator, and web enthusiast — crafting expressive digital experiences ♡"',
      desc: 'I am a vocational high school student born in 2008 in Bogor, Indonesia, passionate about web development, UI design, digital illustration, and photo/video editing.',
      contactCta: 'Contact Me',
      projectsCta: 'View Projects',
      roles: ['Freelance Web Developer', 'Frontend Enthusiast', 'UI Designer', 'Digital Illustrator'],
    },
    about: {
      tag: '01 // PROFILE',
      jpSub: '紹介 ABOUT ME',
      title: 'About Me',
      subtitle: 'Get to know me better',
      role: 'Freelance Web Developer — Almost Fresh Graduate of SMK',
      p1: 'Hi! I am Erlangga, born in 2008 and currently studying at SMK Al-Hadiid 1 Cileungsi. I am interested in web development, interface design, illustration, and editing. I enjoy building my skills through learning and personal projects.',
      p2: 'Until now, I have worked on 10+ website projects for small businesses, online stores, and friends who need portfolio websites.',
      labels: {
        name: 'Name',
        birth: 'Birth year',
        location: 'Location',
        edu: 'Education',
        email: 'Email',
        freelance: 'Freelance',
        freelanceVal: 'Available',
      },
      funFacts: ['☕ 999+ coffee', '🎮 Gamer', '📚 Self-taught', '🌙 Night owl'],
    },
    skills: {
      tag: '02 // CONSTELLATION',
      jpSub: '技能 SKILLS',
      title: 'Skills',
      subtitle: 'Technologies and creative crafts I build with',
      hint: 'Hover or click a skill star to inspect details and connected disciplines.',
      connectedWith: 'Connects with',
      viewArt: 'View my artwork',
    },
    timeline: {
      tag: '03 // CHRONICLE',
      jpSub: '軌跡 JOURNEY',
      title: 'My Journey',
      subtitle: 'Education, milestones, and growth',
    },
    projects: {
      tag: '04 // ARCHIVE',
      jpSub: '制作 PROJECTS',
      title: 'My Projects',
      subtitle: 'Selected works and experiments',
      filters: {
        all: 'All',
        'web-design': 'Web Design',
        ecommerce: 'E-Commerce',
        dashboard: 'Dashboard',
        game: 'Game',
      },
      emptyMsg: 'No archived projects listed in this category yet.',
      resetFilter: 'Show All Projects',
      demo: 'Live Demo',
      github: 'GitHub',
      inspect: 'Inspect Details',
    },
    creative: {
      tag: '05 // CREATIVE',
      jpSub: '創作 ART & MIND',
      title: 'Creative',
      subtitle: 'A little more about the person behind the code',
      artTitle: 'Digital Art & Illustration',
      artCount: '6 artworks',
      artDesc:
        'I enjoy drawing and creating illustrations. Visual art helps me explore composition, color, character, and visual storytelling.',
      openArt: 'View all artwork',
      readMore: 'Read more',
    },
    github: {
      tag: '06 // OPEN SOURCE',
      jpSub: '開発 GITHUB',
      title: 'GitHub',
      subtitle: 'Some of my public coding work',
      desc: 'Explore my repositories and development projects.',
      visit: 'Visit GitHub',
      loading: 'Loading public repositories…',
      unavailable: 'Repository highlights are unavailable right now.',
      browseAll: 'Browse all repositories on GitHub',
    },
    contact: {
      tag: '07 // DISPATCH',
      jpSub: '連絡 CONTACT',
      title: 'Contact Me',
      subtitle: "Let's collaborate on your project",
      heading: "Let's Talk",
      desc: 'Have a project idea or want to work together? I am fast to respond on WhatsApp!',
      wa: 'Chat via WhatsApp',
      copied: '✓ Copied to clipboard!',
      copyFail: 'Failed to copy',
      namePh: 'Full Name',
      emailPh: 'Your Email',
      subjectPh: 'Subject',
      messagePh: 'Write your message...',
      send: 'Send Message',
      sentNote: 'Your email app will open with the message ready to send.',
    },
    footer: {
      music: 'Soundtrack: Amore – ReoNa ♪',
      rights: 'All Rights Reserved.',
    },
    music: {
      play: 'Play music',
      pause: 'Pause music',
      showVideo: 'Show video',
      hideVideo: 'Hide video',
      ytOpen: 'Open on YouTube',
      hostHint: 'Embedded YouTube playback may be restricted. Open directly on YouTube anytime.',
      modeYt: 'YouTube',
      modeSynth: 'Sakura Synth',
      synthTitle: 'Sakura Music Box',
      synthArtist: 'Built-in Synth ♪',
      synthHint: 'Built-in pastel synth plays directly in your browser without YouTube.',
      sfxOn: 'UI Sound: On',
      sfxOff: 'UI Sound: Off',
    },
  },
} as const;
