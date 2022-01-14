export const stringifyTimestampDiff = (earlier: number, later: number = +new Date()): string => {
  const diffMS = later  - earlier;
  const seconds = Math.trunc(diffMS / 1000);
  const minutes = Math.trunc(seconds / 60);

  if (minutes < 1) {
    return 'Now';
  }

  if (minutes < 60) {
    return `${minutes} min`
  }

  const hours = Math.trunc(minutes / 60);

  if (hours < 24) {
    return `${hours} h`;
  }

  const days = Math.trunc(hours / 24)

  if (days === 1) {
    return 'Yesterday';
  }

  return new Date(earlier).toLocaleDateString();
};
