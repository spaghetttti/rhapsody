import { collection, addDoc, doc, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const submitAssessment = async (result, userEmail) => {
  try {
    await addDoc(collection(db, "users", userEmail, "assessments"), {
      result,
    });
    console.log("Assessment data saved successfully!");
  } catch (error) {
    console.error("Error saving assessment:", error);
  }
};

export const getUserAssessments = async (userEmail) => {
  try {
    const userRef = doc(db, "users", userEmail);
    const assessmentsColRef = collection(userRef, "assessments");
    const querySnapshot = await getDocs(assessmentsColRef);
    const userAssessments = [];
    querySnapshot.forEach((doc) => {
      const assessmentData = doc.data();
      assessmentData.id = doc.id; // Include document ID for reference
      userAssessments.push(assessmentData);
    });
    return userAssessments;
  } catch (error) {
    console.error("Error retrieving assessments:", error);
    return []; // Return empty array on error
  }
};
