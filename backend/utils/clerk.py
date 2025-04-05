# from fastapi import HTTPException
from clerk_backend_api import Clerk as ClerkSDK
from core.config import settings
from clerk_backend_api.jwks_helpers import AuthenticateRequestOptions
import httpx
from datetime import datetime


class Clerk:
    CLERK_API_URL = "https://api.clerk.com/v1/clients/verify"

    def __init__(self):
        self.clerk = ClerkSDK(bearer_auth=settings.CLERK_SECRET_KEY)

    async def get_user_info(self, token: str) -> dict:
        request = httpx.Request("GET", "http://localhost", headers={
            "Authorization": f"Bearer {token}"
        })

        options = AuthenticateRequestOptions(
            authorized_parties=["http://localhost:3000"]
        )

        result = self.clerk.authenticate_request(request, options)

        if not result.is_signed_in:
            raise Exception(f"Not signed in: {result.reason}")

        return {
            "user_id": result.payload.get("user_id"),
            "name": result.payload.get("user_first_name"),
            "created_at": datetime.fromtimestamp(
                result.payload.get("user_created_at")
                ),
        }
