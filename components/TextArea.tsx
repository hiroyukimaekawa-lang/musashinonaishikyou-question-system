import React from 'react';
import { Text, TextInput as RNTextInput, TextInputProps, View } from 'react-native';

interface Props extends TextInputProps {
  hasError?: boolean;
}

export function TextArea({ hasError, className = '', ...props }: Props) {
  const maxLength = 1000;
  const currentLength = props.value?.length || 0;

  return (
    <View className="w-full">
      <RNTextInput
        multiline
        numberOfLines={4}
        className={`min-h-[150px] bg-white border rounded-lg p-4 text-base text-gray-900 font-noto ${
          hasError ? 'border-error' : 'border-gray-200'
        } focus:border-primary ${className}`}
        placeholderTextColor="#9ca3af"
        textAlignVertical="top"
        maxLength={maxLength}
        {...props}
      />
      <View className="mt-1 flex-row justify-end">
        <Text className="text-xs text-gray-400 font-noto">
          {currentLength} / {maxLength} 文字
        </Text>
      </View>
    </View>
  );
}
