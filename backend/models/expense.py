from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey

from sqlalchemy.orm import relationship
from datetime import datetime, timezone

from database import Base

class Expense(Base):
    __tablename__ = "expenses"

    id = Column(Integer, primary_key=True, index= True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable= False)
    date = Column(DateTime, default=datetime.now(timezone.utc))

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="expenses")