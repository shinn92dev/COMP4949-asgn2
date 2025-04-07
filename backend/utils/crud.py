# from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import Users, DepressionScore, Diary
from fastapi import HTTPException
from datetime import datetime, timezone


class CRUD:
    def __init__(self):
        pass

    def get_db(self):
        db = SessionLocal()
        try:
            yield db
        finally:
            db.close()

    def is_user_exist(self, user_id: str) -> bool:
        db = SessionLocal()
        try:
            user = db.query(Users).filter(Users.user_id == user_id).first()
            if user:
                return True
            return False
        finally:
            db.close()

    def add_new_user(self, user: dict) -> Users:
        db = SessionLocal()
        try:
            new_user = Users(**user)
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        finally:
            db.close()

    def check_survey_status(self, user_id: str):
        db = SessionLocal()
        try:
            user = db.query(Users).filter(Users.user_id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            return user.is_survey_done
        finally:
            db.close()

    def set_survey_done(self, user_id: str) -> bool:
        db = SessionLocal()
        try:
            user = db.query(Users).filter(Users.user_id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            user.is_survey_done = True
            db.commit()
            return True
        finally:
            db.close()

    def add_depression_score(
        self,
        user_id: str,
        score: int,
        diary_id: int | None = None
    ) -> DepressionScore:
        db = SessionLocal()
        try:
            user = db.query(Users).filter(Users.user_id == user_id).first()
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
            new_score = DepressionScore(
                user_id=user_id,
                score=score,
                created_at=datetime.now(timezone.utc),
                diary_id=diary_id
            )
            db.add(new_score)
            db.commit()
            db.refresh(new_score)
            return new_score
        finally:
            db.close()

    def add_new_diary(self, user_id: str, diary_text: str, created_at: str):
        db = SessionLocal()
        try:
            if (not user_id or not diary_text):
                raise HTTPException(
                    status_code=404,
                    detail="Missing user id or diary text"
                    )
            formatted_date = datetime.strptime(created_at, "%Y-%m-%d")
            new_diary = Diary(
                user_id=user_id,
                diary=diary_text,
                created_at=formatted_date
                )
            db.add(new_diary)
            db.commit()
            db.refresh(new_diary)
            return new_diary
        finally:
            db.close()

    def get_all_diary(self, user_id: str):
        db = SessionLocal()
        try:
            user = db.query(Users).filter(Users.user_id == user_id).first()
            if not user:
                raise HTTPException(
                    status_code=404,
                    detail="User not found"
                    )
            all_diary = db.query(Diary).filter(Diary.user_id == user_id).all()
            print("ALL DIARY FROM CRUD: ", all_diary)
            if len(all_diary) == 0:
                print("DIARY NO")
                return []
            return [
                {
                    "diary_id": d.diary_id,
                    "diary": d.diary,
                    "created_at": d.created_at.isoformat(),
                    "score": d.score.score if d.score else None
                }
                for d in all_diary
                ]
        finally:
            db.close()
