from pydantic import BaseModel, EmailStr, Field
from typing import Optional 


class BudgetBase(BaseModel):
    category: str = Field(..., example="Food")
    monthly_limit: float = Field(..., example=500.00)

class BudgetCreate(BudgetBase):
    pass    

class BudgetUpdate(BaseModel):
    category: Optional[str] = None
    monthly_limit: Optional[float] = Field(None, gt=0)

class BudgetResponse(BudgetBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True