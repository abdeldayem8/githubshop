import { createSelector, createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    language: 'en', 
  },
  reducers: {
    toggleLanguage: state => {
      state.language = state.language === 'en' ? 'ar' : 'en';
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;

export const selectDirection = createSelector(
  state => state.language.language,
  language => language === 'ar' ? 'rtl' : 'ltr'
);