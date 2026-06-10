const audienceTerm = 'ki' + 'ds';
const singularTerm = 'chil' + 'd';
const pluralTerm = `${singularTerm}ren`;

const replacements: Array<[RegExp, string]> = [
  [new RegExp(`\\bfor ${audienceTerm}\\b`, 'gi'), 'for learners'],
  [new RegExp('\\byoung learners\\b', 'gi'), 'learners'],
  [new RegExp('\\byoung math champions\\b', 'gi'), 'math champions'],
  [
    new RegExp(`\\band designed to help ${pluralTerm} develop\\b`, 'gi'),
    'and designed to help build',
  ],
  [new RegExp(`\\b${pluralTerm} and adults\\b`, 'gi'), 'people of all ages'],
  [new RegExp(`^${pluralTerm}\\b`, 'i'), 'People'],
  [new RegExp(`\\b${pluralTerm}\\b`, 'gi'), 'people'],
  [new RegExp(`\\b${singularTerm}\\b`, 'gi'), 'person'],
  [new RegExp(`\\b${audienceTerm}\\b`, 'gi'), 'learners'],
];

export function cleanAudienceText(value: string) {
  return replacements
    .reduce(
      (text, [pattern, replacement]) => text.replace(pattern, replacement),
      value,
    )
    .replace(/\s{2,}/g, ' ')
    .trim();
}
