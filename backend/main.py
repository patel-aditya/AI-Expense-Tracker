from fastapi import FastAPI

from database import engine,Base
from models import user, expense, budget
from core.config import settings

from routers import auth, expenses, budgets


# create tables
Base.metadata.create_all(bind = engine)

app = FastAPI(title="Expense Tracker")

# connect with router
app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(budgets.router)

@app.get("/")
def root():
    return {"message": "Expense Tracker is running","environment": settings.ENVIRONMENT} 