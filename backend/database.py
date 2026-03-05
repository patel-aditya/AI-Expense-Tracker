from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool

from core.config import settings

# Create SQLAlchemy Engine
engine = create_engine(settings.DATABASE_URL,poolclass=QueuePool, pool_size=5,max_overflow= 10, pool_pre_ping=True,echo=settings.DEBUG,connect_args={"sslmode": "require"})


# session Factory
SessionLocal = sessionmaker(autocommit = False, autoflush=False, bind = engine)

# base class for models
Base = declarative_base()

# Dependency (for fastapi)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()