from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from core.config import settings
import db.models  # noqa: F401

from routers import test, authentication, user, predict, diary, score

ENV = settings.ENVIRONMENT
BASE_PREFIX = settings.BASE_PREFIX
print(f"🔴🟥CurrentMode: {ENV} | Base url: {BASE_PREFIX}")


def create_app():
    app = FastAPI()

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*", "http://localhost:3000",],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register Each Service
    app.include_router(test.router, prefix=f"{BASE_PREFIX}")
    app.include_router(
        authentication.router,
        prefix=f"{BASE_PREFIX}/authentication"
        )
    app.include_router(
        user.router,
        prefix=f"{BASE_PREFIX}/user"
        )
    app.include_router(
        predict.router,
        prefix=f"{BASE_PREFIX}/predict"
        )
    app.include_router(
        diary.router,
        prefix=f"{BASE_PREFIX}/diary"
        )
    app.include_router(
        score.router,
        prefix=f"{BASE_PREFIX}/score"
        )
    # Initialize Database
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ Database initialized successfully!")
    except Exception as e:
        print(f"⚠️ Database initialization failed: {e}")

    return app
