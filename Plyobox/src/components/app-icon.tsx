import { SymbolView } from 'expo-symbols';

export type AppIconName =
  | 'account'
  | 'add'
  | 'arrow-back'
  | 'arrow-right'
  | 'attendance'
  | 'bell'
  | 'calendar'
  | 'camera'
  | 'cash'
  | 'chart'
  | 'check'
  | 'check-circle'
  | 'chevron-right'
  | 'clock'
  | 'close'
  | 'dumbbell'
  | 'edit'
  | 'home'
  | 'info'
  | 'lock'
  | 'more'
  | 'person'
  | 'qr'
  | 'receipt'
  | 'search'
  | 'settings'
  | 'share'
  | 'sparkle'
  | 'star'
  | 'upload'
  | 'wallet';

const symbolNames = {
  account: { ios: 'person.crop.circle', android: 'account_circle', web: 'account_circle' },
  add: { ios: 'plus', android: 'add', web: 'add' },
  'arrow-back': { ios: 'arrow.left', android: 'arrow_back', web: 'arrow_back' },
  'arrow-right': { ios: 'arrow.right', android: 'arrow_forward', web: 'arrow_forward' },
  attendance: { ios: 'checkmark.seal', android: 'fact_check', web: 'fact_check' },
  bell: { ios: 'bell', android: 'notifications', web: 'notifications' },
  calendar: { ios: 'calendar', android: 'calendar_month', web: 'calendar_month' },
  camera: { ios: 'camera', android: 'photo_camera', web: 'photo_camera' },
  cash: { ios: 'banknote', android: 'payments', web: 'payments' },
  chart: { ios: 'chart.bar.fill', android: 'bar_chart', web: 'bar_chart' },
  check: { ios: 'checkmark', android: 'check', web: 'check' },
  'check-circle': { ios: 'checkmark.circle.fill', android: 'check_circle', web: 'check_circle' },
  'chevron-right': { ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' },
  clock: { ios: 'clock', android: 'schedule', web: 'schedule' },
  close: { ios: 'xmark', android: 'close', web: 'close' },
  dumbbell: {
    ios: 'figure.strengthtraining.traditional',
    android: 'fitness_center',
    web: 'fitness_center',
  },
  edit: { ios: 'pencil', android: 'edit', web: 'edit' },
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  info: { ios: 'info.circle', android: 'info', web: 'info' },
  lock: { ios: 'lock.fill', android: 'lock', web: 'lock' },
  more: { ios: 'ellipsis', android: 'more_horiz', web: 'more_horiz' },
  person: { ios: 'person', android: 'person', web: 'person' },
  qr: { ios: 'qrcode.viewfinder', android: 'qr_code_scanner', web: 'qr_code_scanner' },
  receipt: { ios: 'doc.text', android: 'receipt_long', web: 'receipt_long' },
  search: { ios: 'magnifyingglass', android: 'search', web: 'search' },
  settings: { ios: 'gearshape', android: 'settings', web: 'settings' },
  share: { ios: 'square.and.arrow.up', android: 'share', web: 'share' },
  sparkle: { ios: 'sparkles', android: 'auto_awesome', web: 'auto_awesome' },
  star: { ios: 'star.fill', android: 'star', web: 'star' },
  upload: { ios: 'arrow.up.doc', android: 'upload_file', web: 'upload_file' },
  wallet: { ios: 'wallet.pass', android: 'account_balance_wallet', web: 'account_balance_wallet' },
} as const;

type AppIconProps = {
  name: AppIconName;
  size?: number;
  color: string;
};

export function AppIcon({ name, size = 20, color }: AppIconProps) {
  return (
    <SymbolView
      name={symbolNames[name]}
      tintColor={color}
      size={size}
      style={{ width: size, height: size }}
    />
  );
}
