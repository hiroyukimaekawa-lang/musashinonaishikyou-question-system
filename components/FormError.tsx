import { Text } from 'react-native';

export function FormError({ error }: { error?: string }) {
  if (!error) return null;
  return <Text className="font-noto text-sm text-error mt-2">{error}</Text>;
}
