from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from fastapi.security import OAuth2PasswordRequestForm
from schemas.user import UserCreate, UserLogin, UserResponse
from schemas.token import Token
from models.user import User
from core.security import hash_password, verify_password, create_access_token
from core.constants import INVALID_CREDENTIALS, TOKEN_TYPE


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(user_data: UserCreate, db:Session = Depends(get_db)):
    # check if user already exists

    existing_user = db.query(User).filter(User.email == user_data.email).first()

    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    # hash password
    hashed_pw = hash_password(user_data.password)
    
    # create new user
    new_user = User(email = user_data.email, hashed_password = hashed_pw)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# Login
@router.post("/login", response_model=Token)
def login(user_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Find User
    user = db.query(User).filter(User.email == user_data.username).first()
    # validate credentials
    if not user or not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=INVALID_CREDENTIALS)
    

    # create jwt token
    access_token = create_access_token({"sub": str(user.id)})

    return{
        "access_token": access_token,
        "token_type": TOKEN_TYPE
    }