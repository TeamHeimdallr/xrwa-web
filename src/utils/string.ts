export const truncateAddress = (addr?: string, limit = 12) => {
  if (!addr) return '';

  return addr.slice(0, limit) + '...';
};
