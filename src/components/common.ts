export const MAIN_BG_COLOR = 'bg-[#454545]';

export const MAIN_TXT_COLOR = 'text-red';

export const BTN_CLS = 'border rounded px-2 py-1 w-full';

export const MAIN_BORDER_COLOR = 'border-gray-500';

export const ROUND_BORDER_COLOR = `rounded border ${MAIN_BORDER_COLOR}`;

export function cx(...inputs: any[]): string {
  const inp = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];
  return inp.filter(Boolean).join(' ');
}
