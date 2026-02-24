from pydantic import BaseModel
from typing import Optional 

class MonthlySummary(BaseModel):
    month: str
    total_spent: float


class CategoryDistribution(BaseModel):
    category_percentages: dict[str, float]


class SpendingTrends(BaseModel):
    previous_month: float
    current_month: float
    percentage_change : float
    message: str


class BudgetAnalytics(BaseModel):
    category: str
    monthly_limit: float
    total_spent: float
    remaining_budget: float
    status: str