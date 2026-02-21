from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index= True)
    category = Column(String, nullable=False)
    monthly_limit = Column(Float, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="budgets")