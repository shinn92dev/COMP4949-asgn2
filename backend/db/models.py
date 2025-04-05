from db.database import Base
from sqlalchemy import (Column, Integer, String, DateTime, Boolean, ForeignKey)
from sqlalchemy.orm import relationship


class Users(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True, unique=True)
    email = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, nullable=False)
    is_survey_done = Column(Boolean, default=False, nullable=False)

    diaries = relationship(
        "Diary",
        back_populates="user",
        cascade="all, delete-orphan"
        )
    scores = relationship(
        "DepressionScore",
        back_populates="user",
        cascade="all, delete-orphan"
        )


class DepressionScore(Base):
    __tablename__ = "depression_score"

    score_id = Column(Integer, primary_key=True, index=True, unique=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    diary_id = Column(Integer, ForeignKey("diary.diary_id"), nullable=True)
    score = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False)

    user = relationship("Users", back_populates="scores")
    diary = relationship("Diary", back_populates="score")


class Diary(Base):
    __tablename__ = "diary"
    diary_id = Column(Integer, primary_key=True, index=True, unique=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    diary = Column(String, nullable=False)

    user = relationship("Users", back_populates="diaries")
    score = relationship(
        "DepressionScore",
        back_populates="diary",
        uselist=False
        )
