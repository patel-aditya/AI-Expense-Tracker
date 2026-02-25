from fastapi import APIRouter, Depends, HTTPException, status 
from schemas.budget import BudgetCreate, BudgetResponse, BudgetUpdate
from sqlalchemy.orm import Session
from database import get_db
from models.budget import Budget
from models.user import User
from dependencies import get_current_user
from typing import List

router = APIRouter(prefix="/budgets", tags=["budgets"])


# create budget
@router.post("/", response_model=BudgetResponse)
def create_budget(budget_data: BudgetCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_budget = Budget(
        category = budget_data.category,
        monthly_limit = budget_data.monthly_limit,
        user_id = current_user.id
    )

    db.add(new_budget)
    db.commit()
    db.refresh(new_budget)

    return new_budget


# see all budget
@router.get("/", response_model=List[BudgetResponse])
def get_budgets(db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    
    budgets = db.query(Budget).filter(Budget.user_id == current_user.id).all()

    return budgets

# update budgets
@router.patch("/{budget_id}", response_model=BudgetResponse)
def update_budget(budget_id: int, budget_data:BudgetUpdate, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget  = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()

    if not budget:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget Not Found")
    
    for field, value in budget_data.model_dump(exclude_unset=True).items():
        setattr(budget, field, value)


    db.commit()
    db.refresh(budget)

    return budget


# delete budget
@router.delete("/{budget_id}")
def delete_budget(budget_id: int, db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    budget = db.query(Budget).filter(Budget.id == budget_id, Budget.user_id == current_user.id).first()

    if not budget:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Budget Not Found")
    
    db.delete(budget)
    db.commit()

    return "Budget have been deleted"
