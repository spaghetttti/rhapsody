import { calculateMentalHealthScore, calculateInterpretation } from '../calculateMentalHealthScore';

describe('Mental Health Assessment Functions', () => {
  describe('calculateMentalHealthScore', () => {
    it('should return correct score for all possible input values', () => {
      const testCases = [
        { formData: { q1: 1, q2: 2, q3: 3 }, expectedScore: 6 },
        { formData: { q1: 0, q2: 2, q3: 4 }, expectedScore: 6 },
        { formData: { q1: 5, q2: 0, q3: 0 }, expectedScore: 5 },
      ];

      for (const testCase of testCases) {
        const { formData, expectedScore } = testCase;
        const result = calculateMentalHealthScore(formData);
        expect(result.score).toBe(expectedScore);
      }
    });

    it('should handle non-numeric values in form data', () => {
      const formData = { q1: 'hello', q2: 2, q3: true };
      const result = calculateMentalHealthScore(formData);
      expect(result.score).toBe(2); // Only numeric values (2) are considered
    });

    it('should handle missing form data properties', () => {
      const formData = { q2: 2 };
      const result = calculateMentalHealthScore(formData);
      expect(result.score).toBe(2); // Only present values (2) are considered
    });
  });

  describe('calculateInterpretation', () => {
    it('should return correct interpretation based on score', () => {
      const testCases = [
        { totalScore: 5, expectedInterpretation: 'Vous semblez bien vous porter ! Continuez vos bonnes habitudes.' },
        { totalScore: 4, expectedInterpretation: 'Vous pourriez rencontrer quelques défis légers. Pensez à parler à un ami de confiance, un membre de votre famille ou un professionnel de la santé mentale.' },
        { totalScore: 2, expectedInterpretation: "Votre score suggère que vous pourriez avoir des difficultés. Demander de l'aide est un signe de force." },
        { totalScore: 0, expectedInterpretation: "Votre score indique un besoin significatif de soutien. Veuillez contacter immédiatement une ligne d'assistance en cas de crise ou un professionnel de la santé mentale." },
      ];

      for (const testCase of testCases) {
        const { totalScore, expectedInterpretation } = testCase;
        const interpretation = calculateInterpretation(totalScore);
        expect(interpretation).toBe(expectedInterpretation);
      }
    });
  });
});
