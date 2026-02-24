from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List
from models.user import User
from database import get_db
from schemas.expense import ExpenseCreate, ExpenseResponse, ExpenseUpdate
from models.expense import Expense
from dependencies import get_current_user
from core.constants import EXPENSE_NOT_FOUND

router = APIRouter(prefix="/expenses", tags=["expenses"])

@router.post("/", response_model=ExpenseResponse)
def create_expense(expense_data: ExpenseCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    new_expense = Expense(
        description = expense_data.description,
        amount = expense_data.amount,
        category = expense_data.category,
        user_id = current_user.id
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return new_expense

# get all expenses (Pagination)
@router.get("/", response_model=List[ExpenseResponse])
def get_expenses(
    page: int = Query(1, ge= 1),
    limit: int = Query(10, ge=1),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    offset = (page - 1)*limit

    expenses = (
        db.query(Expense).filter(Expense.user_id == current_user.id).offset(offset).limit(limit).all()
    )

    return expenses

# get single expense
@router.get("/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()

    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=EXPENSE_NOT_FOUND)
    
    return expense


# update Expense
@router.patch("/{expense_id}", response_model=ExpenseResponse)
def update_expense(expense_id: int, expense_data: ExpenseUpdate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()

    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=EXPENSE_NOT_FOUND)
    
    for filed, value in expense_data.model_dump(exclude_unset=True).items():
        setattr(expense, filed, value)

    db.commit()
    db.refresh(expense)

    return expense


# delete expense
@router.delete("/{expense_id}")
def delete_expense(expense_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    expense = db.query(Expense).filter(Expense.id == expense_id, Expense.user_id == current_user.id).first()

    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=EXPENSE_NOT_FOUND)
    
    db.delete(expense)
    db.commit()

    return "Expense have been deleted"


