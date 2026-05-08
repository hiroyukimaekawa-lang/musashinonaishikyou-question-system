import { Image, Text, View } from 'react-native';
import { hospitalConfig } from '../constants/hospitalConfig';

export function Header() {
  return (
    <View className="border-b border-gray-100 bg-white px-4 py-3 shadow-sm z-10 flex-row items-center justify-center">
      {hospitalConfig.logoUrl ? (
        <Image
          source={{ uri: hospitalConfig.logoUrl }}
          className="h-8 w-8 mr-2"
          resizeMode="contain"
        />
      ) : null}
      <Text className="text-center font-noto text-lg font-bold text-gray-800">
        {hospitalConfig.hospitalName}
      </Text>
    </View>
  );
}
