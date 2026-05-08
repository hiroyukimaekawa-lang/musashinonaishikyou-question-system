import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function SubmitButton({ title, onPress, disabled }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className={`h-14 flex-row items-center justify-center rounded-xl px-8 ${
        disabled ? 'bg-gray-300' : 'bg-primary'
      } mt-4 mb-10 w-full`}
    >
      {disabled ? (
        <ActivityIndicator color="white" className="mr-2" />
      ) : null}
      <Text className="font-noto text-lg font-bold text-white tracking-wider">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
