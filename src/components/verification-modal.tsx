import { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

const CODE_LENGTH = 6

type VerificationModalProps = {
  visible: boolean
  onClose: () => void
  /** Called as soon as the last digit is entered. */
  onVerified: () => void
}

/** Bottom sheet asking for the 6-digit email code. It stays above the keyboard. */
export function VerificationModal({ visible, onClose, onVerified }: VerificationModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <View className="verify__overlay">
          {/* Tap outside the sheet to close */}
          <Pressable accessibilityLabel="Close" className="absolute inset-0" onPress={onClose} />
          <CodeSheet onVerified={onVerified} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

/**
 * One invisible TextInput holds the value; the boxes only display it.
 * Modal unmounts its children when hidden, so the code starts empty every time it opens.
 */
function CodeSheet({ onVerified }: { onVerified: () => void }) {
  const [code, setCode] = useState('')

  const handleChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, CODE_LENGTH)
    setCode(digits)

    if (digits.length === CODE_LENGTH) {
      Keyboard.dismiss()
      onVerified()
    }
  }

  return (
    <View className="verify__sheet">
      <Text className="verify__title">Check your email</Text>
      <Text className="verify__text mt-2">
        We just sent you an email with a 6-digit verification code. Enter it below to continue.
      </Text>

      <View className="mt-6 flex-row gap-2">
        {Array.from({ length: CODE_LENGTH }, (_, index) => (
          <View
            key={index}
            className={`verify__box ${index === code.length ? 'border-primary' : 'border-border'}`}>
            <Text className="verify__digit">{code[index] ?? ''}</Text>
          </View>
        ))}

        <TextInput
          value={code}
          onChangeText={handleChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          maxLength={CODE_LENGTH}
          autoFocus
          caretHidden
          accessibilityLabel="Verification code"
          style={[StyleSheet.absoluteFill, { opacity: 0 }]}
        />
      </View>
    </View>
  )
}
