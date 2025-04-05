from fastapi import APIRouter, Depends, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from utils.response import CustomResponse
from utils.clerk import Clerk
from utils.crud import CRUD
router = APIRouter()
security = HTTPBearer()

custom_response = CustomResponse()
clerk = Clerk()
crud = CRUD()


@router.get("/")
async def login(
        request: Request,
        credentials: HTTPAuthorizationCredentials = Depends(security)
        ):
    try:
        token = credentials.credentials
        user_info = await clerk.get_user_info(token)
        exist_user = crud.is_user_exist(user_info["user_id"])
        print(f"✔[SERVER] User already exist: {exist_user}")
        if not exist_user:
            new_user = crud.add_new_user(user_info)
            print(f"✔[SERVER] New user created in DB {new_user}")
        message = "All login process is successfully done."

        return custom_response.success_response(message)
    except Exception as e:
        print(e)
