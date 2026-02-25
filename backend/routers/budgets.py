from fastapi import APIRouter, Depends, HTTPException, status 
from schemas.budget import BudgetCreate, BudgetResponse, BudgetUpdate
from sqlalchemy.orm import Session
from database import get_db
from models.budget import Budget
from models.user import User
from dependencies import get_current_user

router = APIRouter(prefix="/budgets", tags=["budgets"])

@router.post("/", response_model=BudgetResponse)
def create_budget(budget_data: BudgetCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_budget = Budget(
        category = budget_data.category,
        amount = budget_data.monthly_limit,
        user_id = current_user.id
    )

    return new_budget