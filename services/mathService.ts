import { Question, Answer, ProblemType, Topic } from '../types';

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const generateMultiplicationQuestion = (): Omit<Question, 'id'> => {
    const num1 = getRandomInt(2, 12);
    const num2 = getRandomInt(10, 50);
    const correctAnswer = num1 * num2;
    const questionText = `What is ${num1} x ${num2}?`;

    const distractors = new Set<number>();
    while (distractors.size < 3) {
        const distractorType = getRandomInt(1, 3);
        let distractor;
        if (distractorType === 1) { // Close answer
            distractor = correctAnswer + getRandomInt(-10, 10);
        } else if (distractorType === 2) { // Off by one digit
            distractor = (num1 + getRandomInt(-2, 2)) * num2;
        } else { // completely random but similar magnitude
             distractor = correctAnswer + getRandomInt(-20, 20);
        }

        if (distractor !== correctAnswer && distractor > 0) {
            distractors.add(distractor);
        }
    }

    const answers: Answer[] = shuffleArray([
        { text: correctAnswer.toString(), isCorrect: true },
        ...Array.from(distractors).map(d => ({ text: d.toString(), isCorrect: false }))
    ]);

    return { questionText, answers };
};

const generateDivisionQuestion = (): Omit<Question, 'id'> => {
    const divisor = getRandomInt(2, 9);
    const quotient = getRandomInt(5, 25);
    const dividend = divisor * quotient;
    const questionText = `What is ${dividend} ÷ ${divisor}?`;

    const distractors = new Set<number>();
    while (distractors.size < 3) {
        const distractor = quotient + getRandomInt(-5, 5);
        if (distractor !== quotient && distractor > 0) {
            distractors.add(distractor);
        }
    }

    const answers: Answer[] = shuffleArray([
        { text: quotient.toString(), isCorrect: true },
        ...Array.from(distractors).map(d => ({ text: d.toString(), isCorrect: false }))
    ]);

    return { questionText, answers };
};

const generateFractionAdditionQuestion = (): Omit<Question, 'id'> => {
    const denominator = getRandomInt(5, 12);
    const num1 = getRandomInt(1, denominator - 2);
    const num2 = getRandomInt(1, denominator - num1 - 1);
    const sum = num1 + num2;

    const questionText = `What is ${num1}/${denominator} + ${num2}/${denominator}?`;
    const correctAnswerText = `${sum}/${denominator}`;

    const distractors = new Set<string>();
    while(distractors.size < 3) {
        const distractorType = getRandomInt(1, 2);
        let distractor;
        if (distractorType === 1) { // Wrong numerator
             const wrongSum = sum + getRandomInt(-2, 2);
             if (wrongSum > 0 && wrongSum !== sum) {
                distractor = `${wrongSum}/${denominator}`;
             }
        } else { // Add denominators
             distractor = `${sum}/${denominator*2}`;
        }
        if (distractor && distractor !== correctAnswerText) {
            distractors.add(distractor);
        }
    }
    
    const answers: Answer[] = shuffleArray([
        { text: correctAnswerText, isCorrect: true },
        ...Array.from(distractors).map(d => ({ text: d, isCorrect: false }))
    ]);

    return { questionText, answers };
};

const generateFractionSubtractionQuestion = (): Omit<Question, 'id'> => {
    const denominator = getRandomInt(5, 12);
    const num1 = getRandomInt(3, denominator - 1);
    const num2 = getRandomInt(1, num1 - 1);
    const difference = num1 - num2;

    const questionText = `What is ${num1}/${denominator} - ${num2}/${denominator}?`;
    const correctAnswerText = `${difference}/${denominator}`;

    const distractors = new Set<string>();
    while(distractors.size < 3) {
        const distractorType = getRandomInt(1, 2);
        let distractor;
        if (distractorType === 1) { // Wrong numerator
             const wrongDiff = difference + getRandomInt(-2, 2);
             if (wrongDiff > 0 && wrongDiff !== difference) {
                distractor = `${wrongDiff}/${denominator}`;
             }
        } else { // Subtract denominators
             distractor = `${difference}/0`; // This is an edge case, but represents a common mistake
        }
        if (distractor && distractor !== correctAnswerText) {
            distractors.add(distractor);
        }
    }
    
    const answers: Answer[] = shuffleArray([
        { text: correctAnswerText, isCorrect: true },
        ...Array.from(distractors).map(d => ({ text: d, isCorrect: false }))
    ]);

    return { questionText, answers };
};

const generateStatisticsQuestion = (): Omit<Question, 'id'> => {
    const dataSet = Array.from({length: 5}, () => getRandomInt(1, 20));
    dataSet.sort((a,b) => a - b);
    const questionType = [ProblemType.StatisticsMean, ProblemType.StatisticsMedian, ProblemType.StatisticsMode, ProblemType.StatisticsRange][getRandomInt(0,3)];
    
    let questionText = `For the numbers ${dataSet.join(', ')}, what is the `;
    let correctAnswer: number;
    
    switch(questionType) {
        case ProblemType.StatisticsMean:
            questionText += "mean?";
            correctAnswer = Math.round(dataSet.reduce((a,b) => a + b, 0) / dataSet.length);
            break;
        case ProblemType.StatisticsMedian:
            questionText += "median?";
            correctAnswer = dataSet[Math.floor(dataSet.length / 2)];
            break;
        case ProblemType.StatisticsMode: {
            questionText += "mode?";
            const counts = dataSet.reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {} as Record<number, number>);
            correctAnswer = parseInt(Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b));
            break;
        }
        case ProblemType.StatisticsRange:
        default:
            questionText += "range?";
            correctAnswer = dataSet[dataSet.length - 1] - dataSet[0];
            break;
    }

    const distractors = new Set<number>();
    while (distractors.size < 3) {
        const distractor = correctAnswer + getRandomInt(-5, 5);
        if (distractor !== correctAnswer && distractor >= 0) {
            distractors.add(distractor);
        }
    }

    const answers: Answer[] = shuffleArray([
        { text: correctAnswer.toString(), isCorrect: true },
        ...Array.from(distractors).map(d => ({ text: d.toString(), isCorrect: false }))
    ]);

    return { questionText, answers };
};


export const generateQuestions = (count: number, topic: Topic): Question[] => {
    const questions: Question[] = [];

    for (let i = 0; i < count; i++) {
        let questionData: Omit<Question, 'id'>;

        switch (topic) {
            case 'multiplication-division':
                questionData = i % 2 === 0 ? generateMultiplicationQuestion() : generateDivisionQuestion();
                break;
            case 'fractions':
                 questionData = i % 2 === 0 ? generateFractionAdditionQuestion() : generateFractionSubtractionQuestion();
                break;
            case 'statistics':
                questionData = generateStatisticsQuestion();
                break;
        }
        
        questions.push({
            id: `${i}-${new Date().getTime()}`,
            ...questionData
        });
    }

    return questions;
};
