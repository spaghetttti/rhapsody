export function calculateMentalHealthScore(formData) {
  let totalScore = 0;

  // Iterate through form data and accumulate scores
  for (const questionId in formData) {
    console.log(formData[questionId]);
    if (formData.hasOwnProperty(questionId)) {
      const score = parseFloat(formData[questionId]); // Attempt conversion
      if (!isNaN(score)) { // Check if conversion is valid
        totalScore += score;
      }
    }
  }
  const interpretation = calculateInterpretation(totalScore);
  // Interpret the score (adjust ranges based on chosen assessment tool)

  // Return the score and interpretation as an object
  return {
    score: Math.floor(totalScore),
    interpretation: interpretation,
    time: new Date(),
  };
}

export function calculateInterpretation(totalScore) {
  let interpretation;
  if (totalScore >= 5) {
    interpretation =
      "Vous semblez bien vous porter ! Continuez vos bonnes habitudes.";
  } else if (totalScore >= 3) {
    interpretation =
      "Vous pourriez rencontrer quelques défis légers. Pensez à parler à un ami de confiance, un membre de votre famille ou un professionnel de la santé mentale.";
  } else if (totalScore >= 1) {
    interpretation =
      "Votre score suggère que vous pourriez avoir des difficultés. Demander de l'aide est un signe de force.";
  } else {
    interpretation =
      "Votre score indique un besoin significatif de soutien. Veuillez contacter immédiatement une ligne d'assistance en cas de crise ou un professionnel de la santé mentale.";
  }

  return interpretation;
}
