from enum import Enum
class ExpenseCategory(str, Enum):
    FOOD = "Food"
    TRAVEL = "Travel"
    ENTERTAINMENT = "Entertainment"
    SHOPPING = "Shopping"
    HEALTHCARE = "Healthcare"
    EDUCATION = "Education"
    OTHER = "Other"



# List version (useful for validation or dropdowns)
ALLOWED_CATEGORIES = [category.value for category in ExpenseCategory]


# Default category if AI fails to classify
DEFAULT_CATEGORY = ExpenseCategory.OTHER.value


# -------------------------------------
# Authentication Constants
# -------------------------------------

TOKEN_TYPE = "bearer"


# -------------------------------------
# Error Messages
# -------------------------------------

INVALID_CREDENTIALS = "Invalid email or password."
TOKEN_INVALID = "Invalid or expired token."
USER_NOT_FOUND = "User not found."
EXPENSE_NOT_FOUND = "Expense not found."
BUDGET_EXCEEDED = "Budget limit exceeded."


# -------------------------------------
# Budget Status Labels
# -------------------------------------

class BudgetStatus(str, Enum):
    SAFE = "Safe"
    WARNING = "Warning"
    EXCEEDED = "Exceeded"