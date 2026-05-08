import { TextInput as RNTextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  hasError?: boolean;
}

export function TextArea({ hasError, className = '', ...props }: Props) {
  return (
    <RNTextInput
      multiline
      numberOfLines={4}
      className={`min-h-[120px] bg-gray-50 border rounded-lg p-4 text-base text-gray-900 font-noto ${
        hasError ? 'border-error' : 'border-gray-200'
      } focus:border-primary focus:bg-white ${className}`}
      placeholderTextColor="#9ca3af"
      textAlignVertical="top"
      {...props}
    />
  );
}
