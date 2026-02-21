from fastapi import FastAPI

from database import engine,Base
from models import user, expense, budget
from core.config import settings


# create tables
Base.metadata.create_all(bind = engine)

app = FastAPI(title="Expense Tracker")

print("Database connection:", engine)


@app.get("/")
def root():
    return {"message": "Expense Tracker is running","environment": settings.ENVIRONMENT} 