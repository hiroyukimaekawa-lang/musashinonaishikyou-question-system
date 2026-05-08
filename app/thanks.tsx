import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Linking, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '../components/Header';
import { TextArea } from '../components/TextArea';
import { hospitalConfig } from '../constants/hospitalConfig';

export default function ThanksScreen() {
  const params = useLocalSearchParams();
  const initialComments = typeof params.comments === 'string' ? params.comments : '';
  const [reviewDraft, setReviewDraft] = useState(initialComments);
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(reviewDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenGoogleMaps = () => {
    if (hospitalConfig.googleReviewUrl) {
      Linking.openURL(hospitalConfig.googleReviewUrl);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Header />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8 w-full items-center">
          <LinearGradient
            colors={['#8EB8BC', '#5E969E']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full h-[180px] items-center justify-center sm:h-[220px]"
          >
            <Text className="font-noto text-2xl sm:text-3xl font-bold text-white tracking-widest">
              ご協力、ありがとうございました。
            </Text>
          </LinearGradient>
        </View>

        <View className="w-full max-w-[760px] px-6">
          <View className="mb-8 items-center">
            <Text className="text-center font-noto text-base text-gray-600 leading-relaxed">
              アンケートのご回答が完了しました。{"\n"}ご協力いただき、心より感謝申し上げます。
            </Text>
          </View>

          <View className="mb-8 flex-row items-center justify-center">
            <View className="h-[1px] flex-1 bg-gray-200" />
            <Ionicons name="leaf-outline" size={20} color="#5E969E" style={{ marginHorizontal: 16 }} />
            <View className="h-[1px] flex-1 bg-gray-200" />
          </View>

          <View className="mb-6">
            <Text className="text-center font-noto text-xl font-bold text-gray-800 mb-4">
              Googleの口コミにご協力ください
            </Text>
            <Text className="font-noto text-sm text-gray-500 leading-relaxed mb-6">
              当院のサービス向上、また他の患者さまの参考のため、Googleへの口コミをご入力いただけますと幸いです。{"\n"}いただいたご意見は、大切に拝見させていただきます。
            </Text>
          </View>

          <View className="mb-6">
            <View className="mb-2 flex-row justify-between items-center">
              <Text className="font-noto text-xs font-bold text-gray-400">
                Googleの口コミに記載する内容を入力してください
              </Text>
              <TouchableOpacity onPress={handleCopyToClipboard} className="flex-row items-center">
                <Ionicons name={copied ? "checkmark-circle" : "copy-outline"} size={16} color={copied ? "#10b981" : "#5E969E"} />
                <Text className={`ml-1 font-noto text-xs font-bold ${copied ? 'text-emerald-500' : 'text-[#5E969E]'}`}>
                  {copied ? 'コピーしました' : 'コピーする'}
                </Text>
              </TouchableOpacity>
            </View>
            <TextArea
              value={reviewDraft}
              onChangeText={setReviewDraft}
              placeholder="アンケートの内容を元に下書きが作成されています。自由に編集してください。"
              className="bg-white border-gray-100"
            />
          </View>

          <View className="items-center mt-4">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleOpenGoogleMaps}
              className="flex-row items-center justify-center bg-white border border-gray-200 h-16 w-full max-w-sm rounded-full"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
                elevation: 2,
              }}
            >
              <View className="mr-3 bg-white p-1 rounded-full border border-gray-100">
                 <Ionicons name="logo-google" size={20} color="#4285F4" />
              </View>
              <Text className="font-noto text-lg font-bold text-gray-700">
                Googleで口コミを投稿する
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.replace('/')}
              className="mt-8"
            >
              <Text className="font-noto text-sm text-gray-400 underline decoration-gray-400">
                今回は回答しない（前のページに戻る）
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
