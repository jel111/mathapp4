export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  answers: Answer[];
}

export enum GameState {
  TopicSelection,
  StatisticsLesson,
  Playing,
  Finished,
}

export enum ProblemType {
    Multiplication,
    Division,
    FractionAddition,
    FractionSubtraction,
    StatisticsMean,
    StatisticsMedian,
    StatisticsMode,
    StatisticsRange,
}

export type Topic = 'multiplication-division' | 'fractions' | 'statistics';
