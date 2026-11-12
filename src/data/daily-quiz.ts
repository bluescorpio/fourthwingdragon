export type DailyQuizQuestion = {
  id: string;
  question: string;
  options: { id: 'a' | 'b' | 'c' | 'd'; text: string }[];
  correctOptionId: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  category: 'character' | 'dragon' | 'world' | 'book';
  spoilerScope: 'fourth-wing' | 'public-publisher-info';
  sourceTitle: string;
  sourceUrl: string;
  sourceNote: string;
  reviewStatus: 'verified';
};

const fourthWingUrl = 'https://rebeccayarros.com/fourthwing';
const threshingDayUrl = 'https://www.entangledpublishing.com/books/threshing-day';
const fw = (id: string, question: string, options: string[], correct: number, explanation: string, category: DailyQuizQuestion['category'], sourceNote: string): DailyQuizQuestion => ({
  id, question, options: options.map((text, index) => ({ id: ['a', 'b', 'c', 'd'][index] as 'a' | 'b' | 'c' | 'd', text })), correctOptionId: ['a', 'b', 'c', 'd'][correct] as 'a' | 'b' | 'c' | 'd', explanation, category, spoilerScope: 'fourth-wing', sourceTitle: 'Rebecca Yarros — Fourth Wing', sourceUrl: fourthWingUrl, sourceNote, reviewStatus: 'verified',
});
const td = (id: string, question: string, options: string[], correct: number, explanation: string, sourceNote: string): DailyQuizQuestion => ({
  id, question, options: options.map((text, index) => ({ id: ['a', 'b', 'c', 'd'][index] as 'a' | 'b' | 'c' | 'd', text })), correctOptionId: ['a', 'b', 'c', 'd'][correct] as 'a' | 'b' | 'c' | 'd', explanation, category: 'character', spoilerScope: 'public-publisher-info', sourceTitle: 'Entangled Publishing — Threshing Day', sourceUrl: threshingDayUrl, sourceNote, reviewStatus: 'verified',
});

export const dailyQuizQuestions: DailyQuizQuestion[] = [
  fw('fw-001','Which quadrant did Violet Sorrengail originally expect to enter?',['Healer Quadrant','Scribe Quadrant','Infantry Quadrant','Riders Quadrant'],1,'Violet expected a quiet life among books and history in the Scribe Quadrant.','character','The public synopsis names Violet’s intended quadrant.'),
  fw('fw-002','Who orders Violet to compete for a place among Navarre’s dragon riders?',['Violet’s mother','Xaden Riorson','A village scribe','The king of Navarre'],0,'The commanding general, who is also Violet’s mother, orders Violet into the competition.','character','The synopsis identifies the commanding general as Violet’s mother.'),
  fw('fw-003','How old is Violet in the public Fourth Wing synopsis?',['Eighteen','Nineteen','Twenty','Twenty-one'],2,'The public synopsis introduces Violet Sorrengail as twenty years old.','character','The synopsis states Violet’s age.'),
  fw('fw-004','What kind of college forms the main setting described for Fourth Wing?',['A naval academy','A war college for dragon riders','A school for royal diplomats','A guild for historians'],1,'Fourth Wing is introduced as taking place in the brutal, elite world of a war college for dragon riders.','world','The official page describes the book’s setting.'),
  fw('fw-005','What gives Violet an edge in the public synopsis?',['Her inherited crown','Her wits','A secret map','Her years of flight training'],1,'The synopsis says Violet must rely on every edge her wits can give her.','character','The synopsis explicitly identifies Violet’s wits as an edge.'),
  fw('fw-006','Why is competition for dragon bonds especially dangerous?',['There are fewer dragons willing to bond than cadets','Every cadet must bond two dragons','Dragons choose only graduates','The college closes after one day'],0,'The public synopsis says fewer dragons are willing to bond than there are cadets.','dragon','The synopsis compares the number of willing dragons and cadets.'),
  fw('fw-007','Which kingdom is named in the Fourth Wing synopsis?',['Navarre','Poromiel','Tyrrendor','Calldyr'],0,'The public synopsis describes candidates seeking to become the elite of Navarre.','world','The synopsis names Navarre.'),
  fw('fw-008','What is failing as the war outside grows more deadly?',['The college library','The kingdom’s protective wards','The royal trade fleet','The scribe archives'],1,'The synopsis says the kingdom’s protective wards are failing.','world','The synopsis names the protective wards as failing.'),
  fw('fw-009','What role does the synopsis give Xaden Riorson?',['Healer','Scribe','Wingleader','Historian'],2,'Xaden Riorson is introduced as a powerful and ruthless wingleader in the Riders Quadrant.','character','The synopsis identifies Xaden as a wingleader.'),
  fw('fw-010','In which quadrant is Xaden a wingleader?',['Riders Quadrant','Scribe Quadrant','Healer Quadrant','Infantry Quadrant'],0,'The public synopsis places Xaden’s wingleader role in the Riders Quadrant.','character','The synopsis names Xaden’s quadrant.'),
  fw('fw-011','What does Violet begin to suspect about the college leadership?',['It plans to close the college','It is hiding a terrible secret','It has outlawed dragons','It will move the archives'],1,'The public synopsis says Violet begins to suspect that leadership is hiding a terrible secret.','world','The synopsis states Violet’s suspicion without revealing the secret.'),
  fw('fw-012','Which phrase best matches Violet’s expected life before the order to join the riders?',['Quiet work among books and history','Royal service at court','Travel as a merchant','Command of a border fortress'],0,'Violet expected a quiet life among books and history before being sent toward the Riders Quadrant.','character','The synopsis describes Violet’s expected life.'),
  fw('fw-013','Fourth Wing is which numbered book in the Empyrean series?',['Book 1','Book 2','Book 3','Book 4'],0,'The official book details list Fourth Wing as Empyrean, Book 1.','book','The official page’s book details give the series number.'),
  fw('fw-014','Who wrote Fourth Wing?',['Rebecca Ross','Rebecca Yarros','Jennifer L. Armentrout','Sarah J. Maas'],1,'Rebecca Yarros is the author of Fourth Wing.','book','The official book page identifies the author.'),
  fw('fw-015','Which pair of genres appears in the official Fourth Wing book details?',['Fantasy Romance and Romance','Mystery and Historical','Horror and Memoir','Science Fiction and Biography'],0,'The official book details classify Fourth Wing under Fantasy Romance and Romance.','book','The official page lists these genres.'),
  fw('fw-016','What field interested Violet before the riders’ competition?',['Books and history','Shipbuilding','Royal accounting','Herbal farming'],0,'The synopsis connects Violet’s planned Scribe Quadrant life with books and history.','character','The synopsis names books and history.'),
  fw('fw-017','What is Violet competing to become?',['A royal adviser','One of Navarre’s dragon riders','A traveling healer','A military historian'],1,'Violet joins hundreds of candidates striving to become dragon riders.','dragon','The synopsis states the candidates’ goal.'),
  fw('fw-018','How does the synopsis describe Violet’s body?',['Armored','Brittle','Magically invisible','Unaffected by injury'],1,'The public synopsis describes Violet’s body as brittle, increasing the danger she faces.','character','The synopsis uses “brittle” to describe Violet’s body.'),
  fw('fw-019','What do dragons do to humans they consider fragile, according to the public premise?',['Assign them to scribes','Ignore them for a year','Incinerate them','Send them outside Navarre'],2,'The synopsis makes the danger plain: dragons incinerate humans they deem fragile rather than bonding them.','dragon','The synopsis states the consequence for “fragile” humans.'),
  fw('fw-020','Where does the synopsis say everyone has an agenda?',['Basgiath War College','The royal archives','Aretia market','The border village'],0,'The public synopsis says everyone at Basgiath War College has an agenda.','world','The synopsis names Basgiath War College.'),
  fw('fw-021','Which pressure grows worse with each passing day in the synopsis?',['The war outside','A winter storm','A trade dispute','A library fire'],0,'The war outside grows more deadly as Violet faces the college’s internal dangers.','world','The synopsis says the outside war grows more deadly.'),
  fw('fw-022','Why do some cadets see Violet as a target?',['Removing a rival could improve their chance of bonding','She already commands every dragon','She grades their history exams','She owns the college'],0,'With too few willing dragons, some competitors would remove Violet to improve their own odds.','dragon','The synopsis links scarcity of bonds to danger from other cadets.'),
  fw('fw-023','Which description fits Fourth Wing’s public premise?',['A peaceful archive apprenticeship','A competitive military college story','A modern workplace comedy','A historical royal biography'],1,'The official page presents an adventure fantasy in a brutal, competitive military college for dragon riders.','book','The official synopsis and content note describe the premise.'),
  fw('fw-024','What is rising while the protective wards fail?',['The death toll','Library membership','The number of willing dragons','Graduation requirements'],0,'The synopsis says the death toll continues to rise while the wards weaken.','world','The synopsis states that the death toll rises.'),
  fw('fw-025','Which character is explicitly called Violet’s mother in the synopsis?',['The commanding general','The head scribe','A healer captain','A dragon keeper'],0,'The synopsis identifies the commanding general as Violet’s mother without naming a separate officeholder.','character','The synopsis connects Violet’s mother with the commanding general.'),
  fw('fw-026','Which series includes Fourth Wing?',['The Empyrean','The Renegades','The Archives','The Harbinger'],0,'Fourth Wing is listed as the first book in the Empyrean series.','book','The official book details name the series.'),
  fw('fw-027','Which title is listed as Empyrean Book 2 on the official Fourth Wing page?',['Onyx Storm','Iron Flame','Threshing Day','Fourth Wing'],1,'The official series list places Iron Flame after Fourth Wing as Empyrean Book 2.','book','The official page’s series list identifies Iron Flame as Book 2.'),
  fw('fw-028','Which title is listed as Empyrean Book 3 on the official Fourth Wing page?',['Iron Flame','Onyx Storm','Threshing Day','In the Likely Event'],1,'The official series list identifies Onyx Storm as Empyrean Book 3.','book','The official page’s series list identifies Onyx Storm as Book 3.'),
  fw('fw-029','What are candidates at the war college trying to earn from a dragon?',['A bond','A history degree','A royal title','A trade license'],0,'The public premise centers on would-be riders competing for a dragon’s bond.','dragon','The official premise describes dragon bonds as the candidates’ goal.'),

  td('td-001','Which Threshing Day character is described by the publisher as “the clever friend”?',['Rhiannon Matthias','Mira Sorrengail','Imogen Cardulo','Sloane Mairi'],0,'The publisher’s public Threshing Day description labels Rhiannon Matthias the clever friend.','The public character list pairs Rhiannon Matthias with this description.'),
  td('td-002','Which character is introduced as “the dutiful rule-follower” in the Threshing Day description?',['Ridoc Gamlyn','Dain Aetos','Garrick Tavis','Aaric Graycastle'],1,'The publisher pairs Dain Aetos with the dutiful rule-follower description.','The public character list pairs Dain Aetos with this description.'),
  td('td-003','Who is called “the kindhearted protector” in the public Threshing Day list?',['Liam Mairi','Bodhi Durran','Sawyer Henrick','Xaden Riorson'],0,'Liam Mairi is introduced as the kindhearted protector.','The public character list pairs Liam Mairi with this description.'),
  td('td-004','Which character does the Threshing Day description call “the jokester”?',['Brennan Sorrengail','Ridoc Gamlyn','Dain Aetos','Garrick Tavis'],1,'The publisher’s short character list describes Ridoc Gamlyn as the jokester.','The public character list pairs Ridoc Gamlyn with this description.'),
  td('td-005','Who is “the underdog” in the publisher’s Threshing Day character list?',['Sawyer Henrick','Aaric Graycastle','Bodhi Durran','Liam Mairi'],0,'Sawyer Henrick is paired with the underdog description.','The public character list pairs Sawyer Henrick with this description.'),
  td('td-006','Which character is described as “the dependable aide”?',['Garrick Tavis','Ridoc Gamlyn','Brennan Sorrengail','Dain Aetos'],0,'The public publisher description calls Garrick Tavis the dependable aide.','The public character list pairs Garrick Tavis with this description.'),
  td('td-007','Who is introduced as “the impulsive fighter” in the Threshing Day list?',['Mira Sorrengail','Imogen Cardulo','Rhiannon Matthias','Sloane Mairi'],1,'Imogen Cardulo is paired with the impulsive fighter description.','The public character list pairs Imogen Cardulo with this description.'),
  td('td-008','Which character is “the second-in-command” in the publisher’s list?',['Bodhi Durran','Xaden Riorson','Aaric Graycastle','Sawyer Henrick'],0,'The Threshing Day description introduces Bodhi Durran as the second-in-command.','The public character list pairs Bodhi Durran with this description.'),
  td('td-009','Who is described as “the fearless rider” in the Threshing Day character list?',['Sloane Mairi','Mira Sorrengail','Rhiannon Matthias','Imogen Cardulo'],1,'The publisher pairs Mira Sorrengail with the fearless rider description.','The public character list pairs Mira Sorrengail with this description.'),
  td('td-010','Which character is introduced as “the brilliant tactician”?',['Brennan Sorrengail','Garrick Tavis','Dain Aetos','Liam Mairi'],0,'The public Threshing Day list calls Brennan Sorrengail the brilliant tactician.','The public character list pairs Brennan Sorrengail with this description.'),
  td('td-011','Who is “the restless royal” in the publisher’s Threshing Day list?',['Aaric Graycastle','Xaden Riorson','Bodhi Durran','Sawyer Henrick'],0,'Aaric Graycastle is introduced as the restless royal.','The public character list pairs Aaric Graycastle with this description.'),
  td('td-012','Which character is described as “the determined sister”?',['Mira Sorrengail','Sloane Mairi','Rhiannon Matthias','Imogen Cardulo'],1,'The publisher’s character list pairs Sloane Mairi with the determined sister description.','The public character list pairs Sloane Mairi with this description.'),
  td('td-013','Who is called “the powerful leader” in the Threshing Day description?',['Xaden Riorson','Dain Aetos','Garrick Tavis','Brennan Sorrengail'],0,'The public publisher description introduces Xaden Riorson as the powerful leader.','The public character list pairs Xaden Riorson with this description.'),
];

export const dailyQuizSchedule: Record<string, string[]> = {
  '2026-11-12':['fw-001','td-001','fw-013'], '2026-11-13':['fw-002','td-002','fw-014'],
  '2026-11-14':['fw-003','td-003','fw-015'], '2026-11-15':['fw-004','td-004','fw-016'],
  '2026-11-16':['fw-005','td-005','fw-017'], '2026-11-17':['fw-006','td-006','fw-018'],
  '2026-11-18':['fw-007','td-007','fw-019'], '2026-11-19':['fw-008','td-008','fw-020'],
  '2026-11-20':['fw-009','td-009','fw-021'], '2026-11-21':['fw-010','td-010','fw-022'],
  '2026-11-22':['fw-011','td-011','fw-023'], '2026-11-23':['fw-012','td-012','fw-024'],
  '2026-11-24':['fw-025','td-013','fw-026'], '2026-11-25':['fw-027','fw-028','fw-029'],
};

export const validateDailyQuiz = () => {
  const errors: string[] = [];
  const ids = new Set<string>();
  for (const q of dailyQuizQuestions) {
    if (ids.has(q.id)) errors.push(`Duplicate question ID: ${q.id}`);
    ids.add(q.id);
    if (q.options.length !== 4) errors.push(`${q.id} must have four options`);
    if (!q.options.some(option => option.id === q.correctOptionId)) errors.push(`${q.id} has no matching correct option`);
    if (q.reviewStatus !== 'verified' || !q.sourceUrl || !q.sourceNote) errors.push(`${q.id} is not fully verified`);
  }
  for (const [date, questionIds] of Object.entries(dailyQuizSchedule)) {
    if (questionIds.length !== 3) errors.push(`${date} must schedule exactly three questions`);
    for (const id of questionIds) if (!ids.has(id)) errors.push(`${date} references missing question ${id}`);
  }
  return errors;
};

export const scheduledThrough = Object.keys(dailyQuizSchedule).sort().at(-1) ?? 'TBD';
