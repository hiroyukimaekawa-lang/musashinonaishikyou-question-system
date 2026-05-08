import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Alert, SafeAreaView, ScrollView, Text, View } from 'react-native';

import { Header } from '../components/Header';
import { HeroBanner } from '../components/HeroBanner';
import { Card } from '../components/Card';
import { TextInput } from '../components/TextInput';
import { TextArea } from '../components/TextArea';
import { RadioGroup } from '../components/RadioGroup';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { RatingSelector } from '../components/RatingSelector';
import { SubmitButton } from '../components/SubmitButton';
import { FormError } from '../components/FormError';

import { useSurveyForm } from '../hooks/useSurveyForm';
import questionsData from '../questions/surveyQuestions.json';
import { SurveyFormState } from '../types/survey';

function RequiredBadge() {
  return (
    <View className="ml-2 rounded bg-error px-2 py-0.5">
      <Text className="text-xs font-bold text-white">必須</Text>
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

    router.replace('/thanks');
  };

  const renderQuestion = (question: typeof questionsData[0]) => {
    const error = errors[question.id as keyof SurveyFormState];
    const value = form[question.id as keyof SurveyFormState];

    return (
      <Card key={question.id}>
        <View className="mb-4 flex-row items-center">
          <Text className="font-noto text-lg font-bold text-gray-800">
            {question.title}
          </Text>
          {question.required && <RequiredBadge />}
        </View>

        {question.type === 'text' && (
          <TextInput
            value={value as string}
            onChangeText={(text) => updateField(question.id as keyof SurveyFormState, text)}
            placeholder="入力してください"
            hasError={!!error}
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

        {question.type === 'radio' && question.options && (
          <RadioGroup
            options={question.options}
            value={value as string}
            onChange={(val) => updateField(question.id as keyof SurveyFormState, val)}
            hasError={!!error}
          />
        )}

        {question.type === 'checkbox' && question.options && (
          <CheckboxGroup
            options={question.options}
            values={value as string[]}
            onChange={(vals) => updateField(question.id as keyof SurveyFormState, vals as any)}
            hasError={!!error}
          />
        )}

        {question.type === 'rating' && question.options && (
          <RatingSelector
            options={question.options}
            value={value as string}
            onChange={(val) => updateField(question.id as keyof SurveyFormState, val)}
            hasError={!!error}
          />
        )}

        <FormError error={error} />
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" backgroundColor="#ffffff" />
      <Header />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 60, alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full max-w-[760px]">
          <HeroBanner />
        </View>

        <View className="w-full max-w-[760px] px-4 md:px-0">
          <View className="mb-6 px-2">
            <Text className="font-noto text-base leading-relaxed text-gray-600">
              今後のより良いクリニックづくりのため、率直なご意見・ご感想をお聞かせください。
            </Text>
          </View>

          {questionsData.map(renderQuestion)}

          <SubmitButton
            title="アンケートを送信する"
            onPress={onSubmit}
            disabled={submitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
