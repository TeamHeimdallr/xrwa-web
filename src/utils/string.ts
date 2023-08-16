export const truncateAddress = (addr?: string, limit = 4) => {
  if (!addr) return '';

  return addr.slice(0, limit) + '...' + addr.slice(-limit, addr.length);
};
