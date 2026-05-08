import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  hasError?: boolean;
};

export function Select({ options, value, onChange, placeholder = '選択してください', hasError }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <View className="w-full">
      <Pressable
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center justify-between rounded-lg border bg-white px-4 py-3 ${
          hasError ? 'border-error' : 'border-gray-200'
        }`}
      >
        <Text className={`font-noto text-base ${value ? 'text-gray-800' : 'text-gray-400'}`}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#94a3b8" />
      </Pressable>

      <Modal visible={isOpen} transparent animationType="fade">
        <Pressable
          onPress={() => setIsOpen(false)}
          className="flex-1 bg-black/50 items-center justify-center p-6"
        >
          <View className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
            <View className="border-b border-gray-100 p-4">
              <Text className="text-center font-noto text-lg font-bold text-gray-800">
                選択してください
              </Text>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {options.map((option, index) => (
                <Pressable
                  key={option}
                  onPress={() => handleSelect(option)}
                  className={`border-b border-gray-50 p-4 active:bg-gray-50 ${
                    value === option ? 'bg-primary-light' : ''
                  } ${index === options.length - 1 ? 'border-b-0' : ''}`}
                >
                  <Text
                    className={`font-noto text-base text-center ${
                      value === option ? 'font-bold text-primary' : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              onPress={() => setIsOpen(false)}
              className="bg-gray-50 p-4 active:bg-gray-100"
            >
              <Text className="text-center font-noto text-base font-bold text-gray-500">キャンセル</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
