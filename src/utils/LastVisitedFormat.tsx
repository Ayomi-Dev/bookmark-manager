export const formatLastVisited = (date?: string | null) => {
  if (!date) return "Never visited";

  const last = new Date(date);
  const now = new Date();
  const diff = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

  if (diff === 0) return "Visited today";
  if (diff === 1) return "Visited yesterday";
  return `Visited ${diff} days ago`;
};
