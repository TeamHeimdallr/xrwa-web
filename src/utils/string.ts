export const truncateAddress = (addr?: string, limit = 4) => {
  if (!addr) return '';

  return addr.slice(0, limit) + '...' + addr.slice(-limit, addr.length);
};

export const formatNumberWithCommas = (num: string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
