from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "DEV"
    BASE_PREFIX: str = ""

    class Config:
        env_file = ".env"


settings = Settings()

IS_DEV = settings.ENVIRONMENT == "DEV"
