import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  hasError?: boolean;
}

export function CheckboxGroup({ options, values, onChange, hasError }: Props) {
  const toggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([...values, option]);
    }
  };

  return (
    <View className="flex-row flex-wrap gap-3">
      {options.map((option) => {
        const isSelected = values.includes(option);
        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.7}
            onPress={() => toggle(option)}
            className={`flex-row items-center rounded-lg border p-4 ${
              isSelected ? 'border-primary bg-primary-light' : 'border-gray-200 bg-white'
            } ${hasError ? 'border-error' : ''}`}
          >
            <View
              className={`mr-3 h-5 w-5 items-center justify-center rounded border ${
                isSelected ? 'border-primary bg-primary' : 'border-gray-300'
              }`}
            >
              {isSelected && (
                <View className="h-2.5 w-2.5 rounded-[1px] bg-white" />
              )}
            </View>
            <Text
              className={`font-noto text-base ${
                isSelected ? 'font-medium text-primary-dark' : 'text-gray-700'
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
