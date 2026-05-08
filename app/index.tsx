import React from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { TextInput } from '../components/TextInput';
import { TextArea } from '../components/TextArea';
import { Select } from '../components/Select';
import { NPSSelector } from '../components/NPSSelector';
import { SubmitButton } from '../components/SubmitButton';
import { FormError } from '../components/FormError';

import { useSurveyForm } from '../hooks/useSurveyForm';
import questionsData from '../questions/surveyQuestions.json';
import { SurveyFormState } from '../types/survey';

function RequiredBadge() {
  return (
    <Text className="ml-1 text-sm font-bold text-[#D34141]">※必須</Text>
  );
}

function LanguageSelector() {
  return (
    <View className="mb-6 flex-row items-center justify-start">
      <Ionicons name="globe-outline" size={20} color="#556977" />
      <Text className="ml-2 font-noto text-sm text-[#556977]">Language</Text>
      <View className="ml-4 flex-row items-center rounded border border-gray-200 bg-white px-3 py-1.5">
        <Text className="font-noto text-sm text-gray-700">日本語</Text>
        <Ionicons name="chevron-down" size={16} color="#94a3b8" style={{ marginLeft: 8 }} />
      </View>
    </View>
  );
}

export default function SurveyScreen() {
  const { form, errors, submitting, updateField, submit } = useSurveyForm();

  const onSubmit = async () => {
    const result = await submit();

    if (!result.success) {
      if ('error' in result) {
        Alert.alert('送信に失敗しました', '通信環境をご確認の上、再度お試しください。');
      } else {
        Alert.alert('入力エラー', '必須項目をご確認ください。');
      }
      return;
    }

    router.replace({
      pathname: '/thanks',
      params: { comments: form.comments }
    });
  };

  const renderQuestion = (question: any) => {
    if (question.type === 'section_title') {
      return (
        <View key={question.id} className="mb-6 mt-4">
          <Text className="font-noto text-base font-bold text-gray-700">
            {question.title} <Text className="text-[#D34141] font-normal">※必須</Text>
          </Text>
        </View>
      );
    }

    const error = errors[question.id as keyof SurveyFormState];
    const value = form[question.id as keyof SurveyFormState];

    return (
      <View key={question.id} className="mb-10 w-full">
        <View className="mb-4 flex-row items-center flex-wrap">
          {question.type === 'nps' ? (
             <View className="mr-3 h-6 w-6 items-center justify-center rounded bg-primary">
                <Text className="text-white text-xs font-bold">
                  {question.title.match(/^\d+/)?.[0] || ''}
                </Text>
             </View>
          ) : null}
          <Text className="font-noto text-base font-bold text-gray-800">
            {question.type === 'nps' ? question.title.replace(/^\d+\.\s*/, '') : question.title}
          </Text>
          {question.required && question.type !== 'nps' && <RequiredBadge />}
        </View>

        {question.type === 'text' && (
          <TextInput
            value={value as string}
            onChangeText={(text) => updateField(question.id as keyof SurveyFormState, text)}
            placeholder="入力してください"
            hasError={!!error}
          />
        )}

        {question.type === 'select' && (
          <Select
            options={question.options}
            value={value as string}
            onChange={(val) => updateField(question.id as keyof SurveyFormState, val)}
            hasError={!!error}
          />
        )}

        {question.type === 'nps' && (
          <NPSSelector
            value={value ? Number(value) : null}
            onChange={(val) => updateField(question.id as keyof SurveyFormState, String(val))}
          />
        )}

        {question.type === 'textarea' && (
          <TextArea
            value={value as string}
            onChangeText={(text) => updateField(question.id as keyof SurveyFormState, text)}
            placeholder="ご自由にご記入ください"
            hasError={!!error}
          />
        )}

        <FormError error={error} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Header />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <HeroBanner />

        <View className="w-full max-w-[760px] px-6">
          <LanguageSelector />
          
          <View className="mb-8 border-b border-gray-100 pb-4">
             <Text className="text-sm text-gray-500 font-noto leading-relaxed">
               ※ 本アンケートは匿名でご回答いただけます。個人が特定されることはありません。
             </Text>
          </View>

          <View className="w-full">
            {questionsData.map(renderQuestion)}
          </View>

          <View className="mt-10 items-center">
            <SubmitButton
              title="アンケートを送信する"
              onPress={onSubmit}
              disabled={submitting}
              className="w-full max-w-sm rounded-full py-4 bg-primary"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
