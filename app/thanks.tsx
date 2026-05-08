import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';

import { Header } from '../components/Header';

export default function ThanksScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Header />
      <View className="flex-1 items-center justify-center px-4">
        <View className="items-center justify-center rounded-2xl bg-white p-8 shadow-sm w-full max-w-[500px]">
          <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-primary-light">
            <Text className="text-4xl">✓</Text>
          </View>
          
          <Text className="mb-4 text-center font-noto text-xl font-bold text-gray-800">
            アンケートにご協力いただき{'\n'}ありがとうございました。
          </Text>
          
          <Text className="text-center font-noto text-base leading-relaxed text-gray-600 mb-8">
            頂戴した貴重なご意見は、{'\n'}今後のクリニック運営の参考とさせていただきます。
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => router.replace('/')}
            className="w-full h-14 bg-gray-100 rounded-xl items-center justify-center"
          >
            <Text className="font-noto text-base font-bold text-gray-600">
              トップへ戻る
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
