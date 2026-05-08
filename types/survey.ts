export interface SurveyAnswer {
  patientName: string;
  examType: string;
  previousExam: string;
  examPain: string;
  doctorExplanation: string;
  waitingTime: string;
  nurseResponse: string;
  receptionResponse: string;
  nextTime: string;
  recommend: string;
  reason: string[];
  comments: string;
  submittedAt: string;
}

export interface SurveyFormState {
  patientName: string;
  examType: string;
  previousExam: string;
  examPain: string;
  doctorExplanation: string;
  waitingTime: string;
  nurseResponse: string;
  receptionResponse: string;
  nextTime: string;
  recommend: string;
  reason: string[];
  comments: string;
}

export type SurveyFormErrors = Partial<Record<keyof SurveyFormState, string>>;
