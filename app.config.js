const keyboardMode = process.env.REPRO_KEYBOARD_MODE || 'pan'

if (keyboardMode !== 'pan' && keyboardMode !== 'resize') {
  throw new Error('REPRO_KEYBOARD_MODE must be pan or resize')
}

module.exports = {
  name: 'TrueSheet Keyboard Repro',
  slug: 'truesheet-keyboard-repro',
  version: '1.0.0',
  orientation: 'portrait',
  android: {
    package: 'com.truesheet.keyboardrepro',
    softwareKeyboardLayoutMode: keyboardMode,
  },
}
