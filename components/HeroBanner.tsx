import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';

export function HeroBanner() {
  return (
    <View className="mb-8 w-full items-center">
      <LinearGradient
        colors={['#8EB8BC', '#5E969E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full h-[220px] items-center justify-center sm:h-[260px]"
      >
        <Text className="font-noto text-sm tracking-[0.2em] text-white opacity-90 uppercase mb-2">
          Questionnaire
        </Text>
        <Text className="font-noto text-3xl sm:text-4xl font-bold text-white tracking-widest mb-4">
          患者さまアンケート
        </Text>
        <View className="h-[2px] w-12 bg-white/50 mb-6" />
        <Text className="font-noto text-sm sm:text-base text-white opacity-90 px-6 text-center leading-relaxed">
          より良い医療サービスの提供のため、{"\n"}率直なご意見をお聞かせください
        </Text>
      </LinearGradient>
    </View>
  );
}
