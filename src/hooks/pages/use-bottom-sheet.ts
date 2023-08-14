import { useBototmSheetStore } from '~/states/components/bottom-sheet';

export const useBototmSheet = (id?: string) => {
  const { opened: _opened, open, close, toggle, reset } = useBototmSheetStore();

  const opened = id ? _opened.find(i => i === id) : false;

  return {
    opened,
    open: () => open(id),
    close: () => close(id),
    toggle: () => toggle(id),
    reset,
  };
};
