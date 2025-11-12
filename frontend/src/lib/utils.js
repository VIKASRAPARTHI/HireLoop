export const getDifficultyBadgeClass = (difficulty) => {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "badge-primary";
    case "medium":
      return "badge-secondary";
    case "hard":
      return "badge-primary";
    default:
      return "badge-ghost";
  }
};
