import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from 'react-native';
import { hospitalConfig } from '../constants/hospitalConfig';

export function HeroBanner() {
  return (
    <LinearGradient
      colors={['#EBF5FF', '#DBEAFE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="h-[180px] w-full items-center justify-center rounded-b-[40px] shadow-sm mb-6"
    >
      <Text className="mt-1 font-noto text-3xl font-bold text-primary-dark">
        {hospitalConfig.hospitalName}
      </Text>
      <Text className="font-noto text-base mt-2 tracking-widest text-primary">
        患者様アンケート
      </Text>
      <View className="mt-4 h-1 w-12 bg-primary rounded-full opacity-50" />
    </LinearGradient>
  );
}
