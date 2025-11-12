from fastapi import APIRouter

from .auth import router as auth_router
from .ping import router as ping_router
from .tickets import router as tickets_router

router = APIRouter()

router.include_router(ping_router, tags=["demo"])
router.include_router(auth_router, tags=["auth"])
router.include_router(tickets_router, tags=["tickets"])

