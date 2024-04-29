import React, { useEffect, useState } from "react";
import { questionsData } from "./questions-data";
import Bar from "./areaGraph";
import {
  calculateInterpretation,
  calculateMentalHealthScore,
} from "./calculateMentalHealthScore";
import { getUserAssessments, submitAssessment } from "./firebaseActions";
import { Link } from "react-router-dom";

const MentalHealthAssessment = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [totalResult, setResult] = useState([
    { primary: new Date(), secondary: 0 },
  ]);
  const [shortResult, setShortResult] = useState({
    average: { score: 0, interpretation: "" },
    latest: { score: 0, interpretation: "" },
  });
  console.log(totalResult);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const result = calculateMentalHealthScore(formData);
    setResult(result);
    submitAssessment(result, currentUser.email).then(() =>
      window.location.reload()
    );
  };

  const compareDates = (a, b) => {
    const dateA = a.primary;
    const dateB = b.primary;

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    const fetchUserAssessments = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const assessments = await getUserAssessments(currentUser.email);
          console.log(assessments);
          if (assessments.length > 0) {
            const data = [];
            let scoreSum = 0;
            const assessmentsNumber = assessments.length;
            assessments.forEach((assessment) => {
              const timestamp = assessment.result.time;
              scoreSum += assessment.result.score;
              const milliseconds =
                timestamp.seconds * 1000 +
                Math.floor(timestamp.nanoseconds / 1000000);
              data.push({
                primary: new Date(milliseconds),
                secondary: assessment.result.score,
              });
            });
            setShortResult({
              average: {
                score: Math.floor(scoreSum / assessmentsNumber),
                interpretation: calculateInterpretation(
                  Math.floor(scoreSum / assessmentsNumber)
                ),
              },
              latest: {
                score: assessments[assessmentsNumber - 1].result.score,
                interpretation:
                  assessments[assessmentsNumber - 1].result.interpretation,
              },
            });
            setResult(data.sort(compareDates));
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchUserAssessments();
  }, [currentUser]);

  return (
    <div className="container  mx-auto max-w-l px-4 py-8">
      <h1>Rhapsody - Évaluation de la santé mentale</h1>
      <p className="mb-4">
        Cette évaluation est conçue pour vous aider à comprendre votre état
        mental actuel. Veuillez répondre honnêtement en vous basant sur vos
        expériences au cours des deux dernières semaines.
      </p>
      <form id="mentalHealthForm" className="space-y-4" onSubmit={handleSubmit}>
        {questionsData.map((question) => (
          <div key={question.label} className="mb-2">
            <label
              htmlFor={question.id}
              className="block text-gray-700 font-bold mb-1"
            >
              {question.label}
            </label>
            <fieldset
              id={question.id}
              className="flex justify-center gap-4 flex-row space-y-1"
            >
              {question.options.map((option) => (
                <label
                  key={option.label}
                  htmlFor={question.label + option.value + option.label}
                  className="text-gray-700"
                >
                  <input
                    type="radio"
                    name={question.id}
                    id={question.label + option.value + option.label}
                    value={option.value}
                    className="mr-2"
                    onChange={handleChange}
                  />
                  <div>{option.label}</div>
                </label>
              ))}
            </fieldset>
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Soumettre l'évaluation
        </button>
      </form>
      Votre score la plus recent est {shortResult.latest.score}
      <br />
      {shortResult.latest.interpretation}
      <br />
      Votre score moyenne est {shortResult.average.score}
      <br />
      {shortResult.average.interpretation}
      <br />
      {loading ? (
        "chargement..."
      ) : (
        <Bar loading={loading} totalResult={totalResult} />
      )}
      <div className="mt-4">
        <Link
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700"
          to="/"
        >
          Accéder à la page d'authentication
        </Link>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;
