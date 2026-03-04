from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from database import get_db
from dependencies import get_current_user
from models.user import User
from models.expense import Expense
from models.budget import Budget


router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/total-expense")
def get_total_expense(db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total = db.query(func.sum(Expense.amount)).filter(Expense.user_id == current_user.id).scalar()

    return {"total_expense": total or 0}


@router.get("/category-summary")
def category_summary(db:Session = Depends(get_db), current_user:User = Depends(get_current_user)):
    results = db.query(Expense.category, func.sum(Expense.amount).label("total")).filter(Expense.user_id == current_user.id).group_by(Expense.category).all()

    return[
        {
            "category":r.category,
            "total":r.total
        }
    for r in results
    ]

@router.get("/monthly-summary")
def monthly_summary(db:Session = Depends(get_db), current_user:User = Depends(get_current_user)):
    results = db.query(
        extract("year", Expense.date).label("year"),
        extract("month",Expense.date).label("month"),
        func.sum(Expense.amount).label("total")
    ).filter(
        Expense.user_id == current_user.id
    ).group_by(
        "year","month"
    ).order_by(
        "year","month"
    ).all()

    return[
        {
            "year": int(r.year),
            "month": int(r.month),
            "total":r.total
        }for r in results
    ]


@router.get("/budget-vs-expense")
def budget_vs_expense(db:Session = Depends(get_db), current_user:User = Depends(get_current_user)):
    total_expense = db.query(func.sum(Expense.amount)).filter(
        Expense.user_id == current_user.id
    ).scalar() or 0

    total_budget = db.query(func.sum(Budget.monthly_limit)).filter(
        Budget.user_id == current_user.id
    ).scalar() or 0

    return{
        "total_budget": total_budget,
        "total_expense": total_expense,
        "remaining": total_budget - total_expense
    }

@router.get("/total-budget")
def total_budget(db:Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total = db.query(func.sum(Budget.monthly_limit)).filter(Budget.user_id == current_user.id).scalar() or 0

    return {"total_budget" : total}