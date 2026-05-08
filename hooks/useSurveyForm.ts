import { useState } from 'react';
import { hospitalConfig } from '../constants/hospitalConfig';
import type { SurveyAnswer, SurveyFormErrors, SurveyFormState } from '../types/survey';
import questionsData from '../questions/surveyQuestions.json';

const INITIAL_STATE: SurveyFormState = {
  patientName: '',
  examType: '',
  previousExam: '',
  examPain: '',
  doctorExplanation: '',
  waitingTime: '',
  nurseResponse: '',
  receptionResponse: '',
  nextTime: '',
  recommend: '',
  reason: '',
  comments: '',
};

export function useSurveyForm() {
  const [form, setForm] = useState<SurveyFormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<SurveyFormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = <K extends keyof SurveyFormState>(
    field: K,
    value: SurveyFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: SurveyFormErrors = {};
    let isValid = true;

    questionsData.forEach((question) => {
      if (question.required) {
        const val = form[question.id as keyof SurveyFormState];
        if (
          !val ||
          (Array.isArray(val) && val.length === 0) ||
          (typeof val === 'string' && val.trim() === '')
        ) {
          nextErrors[question.id as keyof SurveyFormState] = '必須項目です';
          isValid = false;
        }
      }
    });

    setErrors(nextErrors);
    return isValid;
  };

  const submit = async () => {
    if (!validate()) {
      return { success: false, error: 'Validation failed' } as const;
    }

    if (!hospitalConfig.gasUrl) {
      return { success: false, error: 'GAS URL is not configured' } as const;
    }

    setSubmitting(true);

    try {
      const payload: SurveyAnswer = {
        ...form,
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(hospitalConfig.gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors', // CORSエラーを回避するため
      });

      // no-corsモードの場合、レスポンスの中身（JSONやステータスコード）は読み取れません。
      // fetch自体がネットワークエラーで例外を投げない限り、成功とみなします。
      return { success: true } as const;
    } catch (error) {
      return { success: false, error } as const;
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    errors,
    submitting,
    updateField,
    submit,
  };
}
