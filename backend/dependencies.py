from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from models import user
from database import get_db
from core.security import decode_access_token
from models.user import User       
from core.constants import TOKEN_INVALID

# oauth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# get current Authenticated User

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
        payload = decode_access_token(token)

        user_id: str = payload.get("sub")

        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=TOKEN_INVALID)
        
        # fetch user from db
        user = db.query(User).filter(User.id == int(user_id)).first()

        if user is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=TOKEN_INVALID)
        
        return user