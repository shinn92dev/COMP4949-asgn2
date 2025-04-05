from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "DEV"
    BASE_PREFIX: str = ""
    CLERK_SECRET_KEY: str
    DATABASE_URL: str

    class Config:
        env_file = ".env"


settings = Settings()

IS_DEV = settings.ENVIRONMENT == "DEV"
