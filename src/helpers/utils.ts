export function classNames(classes: { [key: string]: boolean }) {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ');
}
