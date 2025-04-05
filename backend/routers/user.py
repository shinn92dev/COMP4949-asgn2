from fastapi import APIRouter
# from fastapi.security import HTTPBearer
from utils.response import CustomResponse
from pydantic import BaseModel
from utils.crud import CRUD
from fastapi import HTTPException

router = APIRouter()
# security = HTTPBearer()

custom_response = CustomResponse()
crud = CRUD()


class SurveyRequest(BaseModel):
    user_id: str


@router.post("/survey/status")
async def check_initial_survey(
        payload: SurveyRequest
        ):
    try:
        user_id = payload.user_id
        if not user_id:
            raise HTTPException(status_code=400, detail="user_id is required")

        survey_status = crud.check_survey_status(user_id)
        message = "Initial survey status is fetched successfully."
        return custom_response.success_response(
            message,
            {"survey_statue": survey_status}
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Unexpected server error")
