import { differenceInDays, parseISO } from 'date-fns';

export function getStatusColor(dateString: string) {
  const days = differenceInDays(new Date(), parseISO(dateString));
  
  if (days >= 60) return 'bg-red-500';    // 2 months+
  if (days >= 30) return 'bg-yellow-500'; // 1 month+
  return 'bg-green-500';                  // < 1 month
}

export function getStatusLabel(dateString: string) {
  const days = differenceInDays(new Date(), parseISO(dateString));
  if (days >= 60) return 'Lama (2 bln+)';
  if (days >= 30) return 'Sedang (1 bln+)';
  return 'Baru (< 1 bln)';
}
