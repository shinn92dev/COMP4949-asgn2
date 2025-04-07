from fastapi import APIRouter
# from fastapi.security import HTTPBearer
from utils.response import CustomResponse
from pydantic import BaseModel
from utils.crud import CRUD
from utils.predict import Prediction
from fastapi import HTTPException

router = APIRouter()
# security = HTTPBearer()

custom_response = CustomResponse()
crud = CRUD()
predictor = Prediction()


class SurveyRequest(BaseModel):
    user_id: str
    data: dict


@router.post("/survey")
async def predict_from_survey(
        payload: SurveyRequest
        ):
    try:
        user_id = payload.user_id
        survey_result = payload.data
        if not user_id or not survey_result:
            raise HTTPException(
                status_code=400,
                detail="user_id and survey_result are required"
                )
        score = predictor.predict_score_from_survey(survey_result)
        saved_result = crud.add_depression_score(user_id, score, None)
        survey_update_result = crud.set_survey_done(user_id)
        message = f"Predicted depression score from survey: {score}."
        print(f"✅ [SERVER] New score from survey saved. {saved_result}")
        print(f"✅ [SERVER] Status updated: {survey_update_result}")
        return custom_response.success_response(
            message,
            {"survey_score": score}
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Unexpected server error")
