from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ExpenseBase(BaseModel):
    description: str = Field(..., example="Grocery shopping at Walmart")
    amount: float = Field(..., example=150.75)
    category: str = Field(..., example="Food")

class ExpenseCreate(ExpenseBase):
    pass    

class ExpenseUpdate(BaseModel):
    description: Optional[str] = None
    amount: Optional[float] = Field(None, gt=0)
    category: Optional[str] = None


class ExpenseResponse(ExpenseBase):
    id: int
    date: datetime
    user_id: int
    
    class Config:
        from_attributes = True