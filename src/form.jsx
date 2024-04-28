import React, { useState } from "react";
import { questionsData } from "./questions-data";
import Bar from "./areaGraph";
import { calculateMentalHealthScore } from "./calculateMentalHealthScore";

const MentalHealthAssessment = () => {
  const [formData, setFormData] = useState({});
  const [totalResult, setResult] = useState({});
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call your calculateMentalHealthScore function here with formData
    console.log("Form submitted:", formData); // For now, just log the data
    setResult(calculateMentalHealthScore(formData));
  };

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
                <div key={option.label}>
                  <input
                    type="radio"
                    name={question.id}
                    id="moodHappy"
                    value={option.value}
                    className="mr-2"
                    onChange={handleChange}
                  />
                  <label htmlFor="moodHappy" className="text-gray-700">
                    {option.label}
                  </label>
                </div>
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
      {totalResult.score ? Math.floor(totalResult.score) : "pas encore calculé"}
      <br />
      {totalResult.interpretation}
      <Bar score={totalResult.score} />
    </div>
  );
};

export default MentalHealthAssessment;
