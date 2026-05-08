import { Platform, Pressable, Text, View } from 'react-native';

type Props = {
  value: number | null;
  onChange: (score: number) => void;
};

const scoreOptions = Array.from({ length: 10 }, (_, idx) => idx + 1);

export function NPSSelector({ value, onChange }: Props) {
  return (
    <View className="w-full">
      <View className="flex-row justify-between w-full px-1">
        {scoreOptions.map((score) => {
          const selected = value === score;
          return (
            <Pressable
              key={score}
              onPress={() => onChange(score)}
              className={`h-[32px] w-[32px] sm:h-10 sm:w-10 items-center justify-center rounded-full border ${
                selected
                  ? 'border-primary bg-primary'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <Text
                className={`font-noto text-xs sm:text-sm font-bold ${
                  selected ? 'text-white' : 'text-primary'
                }`}
              >
                {score}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-4 flex-row items-center px-1">
        <Text className="font-noto text-[10px] text-gray-400">←</Text>
        <View className="mx-1 h-[1px] flex-1 bg-gray-200" />
        <Text className="font-noto text-[10px] text-gray-400">→</Text>
      </View>

      <View className="mt-1 flex-row items-center justify-between px-1">
        <Text className="font-noto text-[11px] text-gray-500">非常に不満</Text>
        <Text className="font-noto text-[11px] text-gray-500">非常に満足</Text>
      </View>
    </View>
  );
}
