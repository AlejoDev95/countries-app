import React, { PropsWithChildren } from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = PropsWithChildren & {
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 active:bg-blue-700',
  secondary: 'bg-gray-600 active:bg-gray-700',
  outline: 'bg-transparent border-2 border-blue-600 active:bg-blue-50',
  ghost: 'bg-transparent active:bg-gray-100',
};

const textVariantStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-blue-600',
  ghost: 'text-gray-700',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-3',
  lg: 'px-6 py-4',
};

const textSizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={`
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        rounded-lg
        items-center
        justify-center
        ${isDisabled ? 'opacity-50' : ''}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === 'primary' || variant === 'secondary'
              ? 'white'
              : '#2563eb'
          }
        />
      ) : (
        <Text
          className={`
            ${textVariantStyles[variant]}
            ${textSizeStyles[size]}
            font-semibold
          `}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};
