from schemas import StandardResponse
from fastapi.responses import JSONResponse


class CustomResponse:
    def success_response(self, message: str, data: dict = None):
        return JSONResponse(
            content=StandardResponse(
                success=True,
                message=message,
                data=data or {}).model_dump()
        )
