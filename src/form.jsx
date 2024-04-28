import React, { useEffect, useState } from "react";
import { questionsData } from "./questions-data";
import Bar from "./areaGraph";
import { calculateMentalHealthScore } from "./calculateMentalHealthScore";
import { getUserAssessments, submitAssessment } from "./firebaseActions";
import { Link } from "react-router-dom";

const MentalHealthAssessment = ({ currentUser }) => {
  const [formData, setFormData] = useState({});
  const [totalResult, setResult] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call your calculateMentalHealthScore function here with formData
    console.log("Form submitted:", formData); // For now, just log the data
    const result = calculateMentalHealthScore(formData);
    setResult(result);
    submitAssessment(result, currentUser.email);
  };

  useEffect(() => {
    const fetchUserAssessments = async () => {
      if (currentUser) {
        const assessments = await getUserAssessments(currentUser.email);
        console.log(assessments);
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
          Submit Assessment
        </button>
      </form>
      Votre score est{" "}
      {totalResult.score ? totalResult.score : "pas encore calculé"}
      <br />
      {totalResult.interpretation}
      <Bar score={totalResult.score} />
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
