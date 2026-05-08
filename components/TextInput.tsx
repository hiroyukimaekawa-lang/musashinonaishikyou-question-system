import { TextInput as RNTextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  hasError?: boolean;
}

export function TextInput({ hasError, className = '', ...props }: Props) {
  return (
    <RNTextInput
      className={`h-14 bg-gray-50 border rounded-lg px-4 text-base text-gray-900 font-noto ${
        hasError ? 'border-error' : 'border-gray-200'
      } focus:border-primary focus:bg-white ${className}`}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}
