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


class DiaryFetchRequest(BaseModel):
    user_id: str


@router.post("/get")
async def fetch_all_diary(
        payload: DiaryFetchRequest
        ):
    try:
        user_id = payload.user_id

        if not user_id:
            raise HTTPException(
                status_code=400,
                detail="user_id is required"
                )
        diary = crud.get_all_diary(user_id)
        print("DIARY: ", diary)
        message = f"All diary for {user_id} is fetched successfully."
        return custom_response.success_response(
            message,
            {"diary": diary}
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Unexpected server error")


class DiaryStoreRequest(BaseModel):
    user_id: str
    diary: str
    date: str


@router.post("/store")
async def store_all_diary(
        payload: DiaryStoreRequest
        ):
    try:
        user_id = payload.user_id
        diary_text = payload.diary
        date = payload.date

        if not user_id:
            raise HTTPException(
                status_code=400,
                detail="user_id is required"
                )
        score = predictor.predict_score_from_diary(diary_text)
        new_diary = crud.add_new_diary(user_id, diary_text, date)
        diary_id = new_diary.diary_id
        crud.add_depression_score(user_id, score, diary_id)
        message = "Diary is saved and score is predicted successfully."
        return custom_response.success_response(
            message,
            {score: score}
            )
    except HTTPException as e:
        raise e
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Unexpected server error")
