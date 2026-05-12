import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function Header() {
  return (
    <View className="w-full border-b border-gray-100 bg-white py-4 shadow-sm z-10">
      <View className="flex-row items-center justify-center px-4">
        <View className="mr-2 h-8 w-8 items-center justify-center rounded-full bg-[#5E969E20]">
          <Ionicons name="heart" size={20} color="#5E969E" />
        </View>
        <Text 
          numberOfLines={1}
          adjustsFontSizeToFit
          className="font-noto text-lg sm:text-xl font-bold tracking-tighter text-[#5E969E] flex-1 sm:flex-none text-center"
        >
          むさしの内視鏡・胃腸内科クリニック
        </Text>
      </View>
    </View>
  );
}
