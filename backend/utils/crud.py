# from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import Users
from fastapi import HTTPException


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
