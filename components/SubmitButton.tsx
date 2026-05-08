import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
}

export function SubmitButton({ title, onPress, disabled, className = '' }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      className={`h-16 flex-row items-center justify-center rounded-full px-12 shadow-lg ${
        disabled ? 'bg-gray-300' : 'bg-primary'
      } ${className}`}
      style={!disabled ? {
        shadowColor: '#5E969E',
        shadowOpacity: 0.3,
      } : {}}
    >
      {disabled ? (
        <ActivityIndicator color="white" className="mr-3" />
      ) : null}
      <Text className="font-noto text-lg font-bold text-white tracking-widest">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
