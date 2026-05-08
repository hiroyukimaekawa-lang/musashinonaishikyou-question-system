import { View } from 'react-native';

export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <View className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 ${className}`}>
      {children}
    </View>
  );
}
