// Mock data for the Private Solutions forum

export type Member = {
  id: string
  username: string
  avatar?: string
  role: 'admin' | 'moderator' | 'vendor' | 'member'
  posts: number
  joined: string
  online: boolean
}

export type Thread = {
  id: string
  title: string
  categorySlug: string
  categoryName: string
  author: Member
  replyCount: number
  viewCount: number
  lastReply: {
    author: string
    at: string
  }
  pinned?: boolean
  locked?: boolean
  tag?: string
  createdAt: string
  content: string
  replies: Reply[]
}

export type Reply = {
  id: string
  author: Member
  content: string
  createdAt: string
  likes: number
}

export type Category = {
  slug: string
  name: string
  description: string
  icon: string
  color: string
  threadCount: number
  postCount: number
  subforums?: SubForum[]
  latestThread?: {
    title: string
    id: string
    author: string
    at: string
  }
}

export type SubForum = {
  slug: string
  name: string
  description: string
  threadCount: number
}

// ─── Members ────────────────────────────────────────────────────────────────

export const MEMBERS: Member[] = [
  { id: '1', username: 'HuzaifaAdmin', role: 'admin', posts: 412, joined: '2024-01-01', online: true },
  { id: '2', username: 'SpectralDMA', role: 'vendor', posts: 287, joined: '2024-02-10', online: true },
  { id: '3', username: 'NullPtr_x64', role: 'moderator', posts: 193, joined: '2024-03-05', online: true },
  { id: '4', username: 'KernelPanic', role: 'member', posts: 88, joined: '2024-04-18', online: false },
  { id: '5', username: 'FirmwareGod', role: 'vendor', posts: 341, joined: '2024-01-22', online: true },
  { id: '6', username: 'r3verseX', role: 'member', posts: 52, joined: '2024-05-01', online: true },
  { id: '7', username: 'ShadowFW', role: 'vendor', posts: 174, joined: '2024-02-28', online: false },
  { id: '8', username: 'hex0day', role: 'member', posts: 29, joined: '2024-06-10', online: true },
  { id: '9', username: 'PCIleech_Fan', role: 'member', posts: 64, joined: '2024-03-30', online: false },
  { id: '10', username: 'EliteBypass', role: 'vendor', posts: 219, joined: '2024-01-15', online: true },
]

// ─── Threads ─────────────────────────────────────────────────────────────────

export const THREADS: Thread[] = [
  {
    id: '1',
    title: '[RELEASE] Shadow DMA Firmware v3.1 — EAC/BE/MRAC Bypass',
    categorySlug: 'firmware',
    categoryName: 'Firmware',
    author: MEMBERS[4],
    replyCount: 47,
    viewCount: 2341,
    pinned: true,
    tag: 'Release',
    createdAt: '2026-09-10T12:00:00Z',
    lastReply: { author: 'r3verseX', at: '2h ago' },
    content: `Just dropped v3.1 of Shadow DMA Firmware. This update includes full EAC, BattlEye, and MRAC bypass support.\n\n**Changes:**\n- Updated IOMMU bypass logic\n- Fixed DMA card init failures on newer boards\n- Added support for PCIe 4.0 x4 slots\n\nDM me on Discord for purchase: Private Solutions server.`,
    replies: [
      { id: 'r1', author: MEMBERS[1], content: 'Tested on Alveo U200 — works flawlessly. PUBG + EAC no issues.', createdAt: '2026-09-10T14:00:00Z', likes: 12 },
      { id: 'r2', author: MEMBERS[5], content: 'Any plans for Tarkov support?', createdAt: '2026-09-11T09:00:00Z', likes: 3 },
      { id: 'r3', author: MEMBERS[4], content: '@r3verseX Tarkov support coming in v3.2, ETA 2 weeks.', createdAt: '2026-09-11T10:00:00Z', likes: 8 },
    ],
  },
  {
    id: '2',
    title: 'Best DMA cards for beginners in 2026?',
    categorySlug: 'dma-hardware',
    categoryName: 'DMA Hardware',
    author: MEMBERS[3],
    replyCount: 23,
    viewCount: 891,
    tag: 'Discussion',
    createdAt: '2026-09-14T08:00:00Z',
    lastReply: { author: 'FirmwareGod', at: '5h ago' },
    content: `Looking to get into DMA for the first time. What cards are recommended for someone starting out? Budget is around \$150-200.`,
    replies: [
      { id: 'r4', author: MEMBERS[4], content: 'For beginners, the 35T is the gold standard. Plug and play with most firmware.', createdAt: '2026-09-14T09:00:00Z', likes: 15 },
      { id: 'r5', author: MEMBERS[1], content: 'Squirrel 35T or COMeT — both excellent entry cards. Avoid eBay knockoffs.', createdAt: '2026-09-14T10:00:00Z', likes: 9 },
    ],
  },
  {
    id: '3',
    title: '[OFFICIAL] SpectralDMA — EAC/BE Firmware + Setup Support',
    categorySlug: 'firmware',
    categoryName: 'Firmware',
    author: MEMBERS[1],
    replyCount: 61,
    viewCount: 3102,
    pinned: true,
    tag: 'Release',
    createdAt: '2026-08-20T10:00:00Z',
    lastReply: { author: 'hex0day', at: '1d ago' },
    content: `**SpectralDMA** is now offering:\n\n- EAC Firmware (all popular games)\n- BE Firmware\n- Full setup & troubleshooting support\n- Lifetime updates for purchased firmware\n\nVisit our Store or Discord to order.`,
    replies: [],
  },
  {
    id: '4',
    title: 'DMA card not initializing — PCIe error 43',
    categorySlug: 'support',
    categoryName: 'Support',
    author: MEMBERS[8],
    replyCount: 8,
    viewCount: 412,
    tag: 'Help',
    createdAt: '2026-09-19T15:00:00Z',
    lastReply: { author: 'NullPtr_x64', at: '3h ago' },
    content: `My 35T is showing PCIe error 43 in Device Manager. Board is Z690, card is in x1 slot. Already tried different slots. Any ideas?`,
    replies: [
      { id: 'r6', author: MEMBERS[2], content: 'Error 43 usually means the firmware is not flashed correctly or the card BIOS needs to be updated. Can you share your current firmware version?', createdAt: '2026-09-19T16:00:00Z', likes: 4 },
    ],
  },
  {
    id: '5',
    title: 'How to set up PCIleech + DMA for first time',
    categorySlug: 'guides',
    categoryName: 'Guides',
    author: MEMBERS[2],
    replyCount: 34,
    viewCount: 5671,
    pinned: true,
    tag: 'Guide',
    createdAt: '2026-07-01T10:00:00Z',
    lastReply: { author: 'KernelPanic', at: '2d ago' },
    content: `Complete setup guide for PCIleech and DMA cards. This covers everything from flashing firmware to running your first memory read.`,
    replies: [],
  },
  {
    id: '6',
    title: 'Private Solutions Discord — Rules & Verification',
    categorySlug: 'announcements',
    categoryName: 'Announcements',
    author: MEMBERS[0],
    replyCount: 3,
    viewCount: 1200,
    pinned: true,
    locked: true,
    tag: 'Announcement',
    createdAt: '2026-05-15T10:00:00Z',
    lastReply: { author: 'HuzaifaAdmin', at: '30d ago' },
    content: `Welcome to Private Solutions! Read the rules before posting.`,
    replies: [],
  },
  {
    id: '7',
    title: '[INFO] 75T Firmware — HWID Spoofer included',
    categorySlug: 'firmware',
    categoryName: 'Firmware',
    author: MEMBERS[6],
    replyCount: 12,
    viewCount: 677,
    tag: 'Release',
    createdAt: '2026-09-17T11:00:00Z',
    lastReply: { author: 'EliteBypass', at: '6h ago' },
    content: `Custom 75T firmware with built-in HWID spoofer. Supports EAC, BE. Check Store for purchase details.`,
    replies: [],
  },
  {
    id: '8',
    title: 'IOMMU bypass techniques — 2026 overview',
    categorySlug: 'firmware',
    categoryName: 'Firmware',
    author: MEMBERS[9],
    replyCount: 19,
    viewCount: 1543,
    tag: 'Research',
    createdAt: '2026-09-05T09:00:00Z',
    lastReply: { author: 'FirmwareGod', at: '1d ago' },
    content: `Covering current state of IOMMU bypass for DMA operations in 2026. Includes group isolation techniques and PCIe topology tricks.`,
    replies: [],
  },
]

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    slug: 'announcements',
    name: 'Announcements',
    description: 'Official news, updates, and important notices from staff.',
    icon: '📢',
    color: 'text-amber-400',
    threadCount: 8,
    postCount: 31,
    latestThread: {
      title: 'Private Solutions Discord — Rules & Verification',
      id: '6',
      author: 'HuzaifaAdmin',
      at: '30d ago',
    },
  },
  {
    slug: 'dma-hardware',
    name: 'DMA Hardware',
    description: 'Discussion of DMA cards, PCIe hardware, and compatible boards.',
    icon: '🔌',
    color: 'text-blue-400',
    threadCount: 42,
    postCount: 387,
    subforums: [
      { slug: 'dma-hardware/cards', name: 'Cards & Boards', description: 'Squirrel, 35T, 75T, and more', threadCount: 28 },
      { slug: 'dma-hardware/setup', name: 'Setup & Installation', description: 'PCIe slot config, BIOS settings', threadCount: 14 },
    ],
    latestThread: {
      title: 'Best DMA cards for beginners in 2026?',
      id: '2',
      author: 'KernelPanic',
      at: '5h ago',
    },
  },
  {
    slug: 'firmware',
    name: 'Firmware',
    description: 'Firmware releases, updates, flashing guides, and bypass discussion.',
    icon: '⚡',
    color: 'text-indigo-400',
    threadCount: 67,
    postCount: 812,
    subforums: [
      { slug: 'firmware/releases', name: 'Releases', description: 'Official and community firmware drops', threadCount: 19 },
      { slug: 'firmware/development', name: 'Development', description: 'Research and dev discussion', threadCount: 48 },
    ],
    latestThread: {
      title: '[RELEASE] Shadow DMA Firmware v3.1 — EAC/BE/MRAC Bypass',
      id: '1',
      author: 'FirmwareGod',
      at: '2h ago',
    },
  },
  {
    slug: 'guides',
    name: 'Guides & Tutorials',
    description: 'Step-by-step setup guides, video walkthroughs, and how-tos.',
    icon: '📖',
    color: 'text-emerald-400',
    threadCount: 31,
    postCount: 498,
    latestThread: {
      title: 'How to set up PCIleech + DMA for first time',
      id: '5',
      author: 'NullPtr_x64',
      at: '2d ago',
    },
  },
  {
    slug: 'support',
    name: 'Support',
    description: 'Get help with DMA issues, error codes, setup problems, and troubleshooting.',
    icon: '🛠️',
    color: 'text-rose-400',
    threadCount: 124,
    postCount: 891,
    latestThread: {
      title: 'DMA card not initializing — PCIe error 43',
      id: '4',
      author: 'PCIleech_Fan',
      at: '3h ago',
    },
  },
  {
    slug: 'general',
    name: 'General',
    description: 'Off-topic discussion, introductions, and community chat.',
    icon: '💬',
    color: 'text-slate-400',
    threadCount: 56,
    postCount: 723,
    latestThread: {
      title: 'Introduce yourself!',
      id: '9',
      author: 'HuzaifaAdmin',
      at: '4h ago',
    },
  },
]

// ─── Stats ────────────────────────────────────────────────────────────────────

export const STATS = {
  members: 1247,
  threads: 417,
  posts: 4585,
  onlineCount: 34,
}

export const ONLINE_MEMBERS = MEMBERS.filter((m) => m.online)
export const NEW_MEMBERS = [...MEMBERS].reverse().slice(0, 5)

export const LATEST_THREADS = THREADS.slice(0, 6)
