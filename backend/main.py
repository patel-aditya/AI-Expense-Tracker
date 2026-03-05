from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine,Base
from models import user, expense, budget
from core.config import settings

from routers import auth, expenses, budgets, analytics


# create tables
Base.metadata.create_all(bind = engine)

app = FastAPI(title="Expense Tracker")


# enabling communication between frontend and backend
app.add_middleware(
    CORSMiddleware,
    allow_origins = settings.CORS_ORIGINS,
    allow_credentials = settings.CORS_ALLOW_CREDENTIALS,
    allow_methods = settings.CORS_ALLOW_METHODS,
    allow_headers = settings.CORS_ALLOW_HEADERS,
)

# connect with router
app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(budgets.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {"message": "Expense Tracker is running","environment": settings.ENVIRONMENT} 