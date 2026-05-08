import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export function RatingSelector({ options, value, onChange, hasError }: Props) {
  return (
    <View className="flex-col gap-2">
      {options.map((option) => {
        const isSelected = value === option;
        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.7}
            onPress={() => onChange(option)}
            className={`flex-row items-center rounded-lg border p-4 w-full ${
              isSelected ? 'border-primary bg-primary-light' : 'border-gray-200 bg-white'
            } ${hasError ? 'border-error' : ''}`}
          >
            <View
              className={`mr-4 h-6 w-6 items-center justify-center rounded-full border-2 ${
                isSelected ? 'border-primary' : 'border-gray-300'
              }`}
            >
              {isSelected && <View className="h-3 w-3 rounded-full bg-primary" />}
            </View>
            <Text
              className={`font-noto text-base ${
                isSelected ? 'font-bold text-primary-dark' : 'text-gray-700'
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
