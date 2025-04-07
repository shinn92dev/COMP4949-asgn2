import pandas as pd
import xgboost as xgb
from pathlib import Path
import json
import textwrap
import requests


class Prediction:
    def __init__(self):
        self.current_file = Path(__file__).resolve()
        self.model_dir = self.current_file.parent.parent.parent / "models"
        self.model_name = "depression_score_model.xgb"
        self.feature_name = "selected_features.json"
        self.model_path = f"{self.model_dir}/{self.model_name}"
        self.feature_path = f"{self.model_dir}/{self.feature_name}"

    def _format_survey_data(self, survey_result: dict) -> dict:
        return {
            "Age": survey_result["age"],
            "Work/Study_Hours": survey_result["workHour"],
            "Academic_Pressure": survey_result["academicPressure"],
            "Financial_Stress": survey_result["financialStress"],
            "Have_you_ever_had_suicidal_thoughts": (
                survey_result["suicidalThought"]
                ),
            "CGPA": survey_result["gpa"],
            "Degree_Class 12": 1,
            "Dietary_Habits_Moderate": (
                1 if survey_result["dietaryHabit"] == "Moderate" else 0
                ),
            "Dietary_Habits_Unhealthy": (
                1 if survey_result["dietaryHabit"] == "Unhealthy" else 0
                ),
            "Study_Satisfaction": survey_result["academicSatisfaction"],
        }

    def predict_score_from_survey(self, survey_result: dict) -> int:
        model = xgb.XGBRegressor()
        model.load_model(self.model_path)
        user_input = self._format_survey_data(survey_result)
        with open(self.feature_path, 'r') as f:
            selected_features = json.load(f)

        input_df = pd.DataFrame([user_input])
        input_df = input_df[selected_features]
        score = model.predict(input_df)[0]
        weighed_score = (
            score * 1.3 if survey_result["suicidalThought"] else score
            )
        final_score = weighed_score / 30 * 100
        return int(final_score)

    def predict_score_from_diary(self, diary_text: str) -> int:
        prompt = textwrap.dedent(f"""
        You are a JSON API. Your only job is to return a JSON number as output.
        Do not explain, do not reason. Return only a number.
        No text. No formatting.

        Input (diary):
        "{diary_text}"

        Task:
        Evaluate the emotional tone of the diary.
        Determine how depressed the writer sounds.
        Return a single integer between 0 and 100
        that represents the level of depression:
         - 0 means no signs of depression,
        - 100 means extreme depression, suicidal or severely
          impaired mental state.

        Output:
        """)
        try:
            for _ in range(5):
                response = requests.post(
                    url="http://localhost:11434/api/generate",
                    json={
                        "model": "anthonyllm",
                        "prompt": prompt,
                        "stream": False
                    }
                )
                response.raise_for_status()
                result = response.json()
                raw_output = result["response"].strip()

                score = int(raw_output)
                return score
        except Exception as e:
            print("Error during AI prediction:", e)
            return None


if __name__ == "__main__":
    p = Prediction()
    # user = {
    #     "age": 20,
    #     "workHour": 8,
    #     "academicSatisfaction": 5,
    #     "academicPressure": 1,
    #     "financialStress": 1,
    #     "gpa": 8,
    #     "suicidalThought": False,
    #     "dietaryHabit": "Unhealthy"
    # }
    # print(p.predict_depression_score(user))

    print(p.predict_score_from_diary("I am too sad today."))
