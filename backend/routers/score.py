from fastapi import APIRouter
# from fastapi.security import HTTPBearer
from utils.response import CustomResponse
from pydantic import BaseModel
from utils.crud import CRUD
from utils.predict import Prediction
from fastapi import HTTPException

router = APIRouter()

custom_response = CustomResponse()
crud = CRUD()
predictor = Prediction()


class ScoreFetchRequest(BaseModel):
    user_id: str


@router.post("/get")
async def fetch_all_diary(
        payload: ScoreFetchRequest
        ):
    try:
        user_id = payload.user_id

        if not user_id:
            raise HTTPException(
                status_code=400,
                detail="user_id is required"
                )
        scores = crud.get_all_scores(user_id)
        message = f"All scores for {user_id} is fetched successfully."
        return custom_response.success_response(
            message,
            {"scores": scores}
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Unexpected server error")
