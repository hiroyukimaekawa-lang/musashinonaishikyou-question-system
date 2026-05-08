export const hospitalConfig = {
  hospitalName: process.env.EXPO_PUBLIC_HOSPITAL_NAME || '武蔵野内視鏡クリニック',
  primaryColor: process.env.EXPO_PUBLIC_PRIMARY_COLOR || '#3B82F6',
  gasUrl: process.env.EXPO_PUBLIC_GAS_URL || '',
  logoUrl: process.env.EXPO_PUBLIC_LOGO_URL || '',
  googleReviewUrl: process.env.EXPO_PUBLIC_GOOGLE_REVIEW_URL || 'https://search.google.com/local/writereview?placeid=ChIJ-3V0Q96_GGARjVp17p6G5v0', // サンプルID
};
