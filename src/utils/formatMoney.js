const formatter = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
