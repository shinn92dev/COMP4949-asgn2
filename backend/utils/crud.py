# from sqlalchemy.orm import Session
from db.database import SessionLocal
from db.models import Users


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

    def add_new_user(self, user: dict):
        db = SessionLocal()
        try:
            new_user = Users(**user)
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            return new_user
        finally:
            db.close()
