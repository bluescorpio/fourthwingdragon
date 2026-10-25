// src/data/empyrean.ts
// 数据来源：entangledpublishing.com，抓取日 2026-10-25
export const PUBLISHER = {
  threshingDay: {
    label: 'Entangled Publishing — Threshing Day',
    url: 'https://www.entangledpublishing.com/books/threshing-day',
  },
  fourthWing: {
    label: 'Entangled Publishing — Fourth Wing',
    url: 'https://www.entangledpublishing.com/books/fourth-wing',
  },
} as const;

export type Cadet = {
  /** 出版社页面上的写法 */
  name: string;
  /** 出版社页面上的描述短语，原样照抄；页面上没有则为 null */
  publisherLabel: string | null;
};

export const CADETS: Cadet[] = [
  { name: "Xaden Riorson", publisherLabel: "the powerful leader." },
  { name: "Rhiannon Matthias", publisherLabel: "the clever friend." },
  { name: "Dain Aetos", publisherLabel: "the dutiful rule-follower." },
  { name: "Liam Mairi", publisherLabel: "the kindhearted protector." },
  { name: "Ridoc Gamlyn", publisherLabel: "the jokester." },
  { name: "Sawyer Henrick", publisherLabel: "the underdog." },
  { name: "Garrick Tavis", publisherLabel: "the dependable aide." },
  { name: "Imogen Cardulo", publisherLabel: "the impulsive fighter." },
  { name: "Bodhi Durran", publisherLabel: "the second-in-command." },
  { name: "Mira Sorrengail", publisherLabel: "the fearless rider." },
  { name: "Brennan Sorrengail", publisherLabel: "the brilliant tactician." },
  { name: "Aaric Graycastle", publisherLabel: "the restless royal." },
  { name: "Sloane Mairi", publisherLabel: "the determined sister." },
];

export const CADET_COUNT = CADETS.length;

export const violetStatement: string | null = "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history.";
