"""merged migration branches

Revision ID: 79b86ee749f4
Revises: d6ed06880539, ddf2e30ec87c
Create Date: 2025-05-03 20:03:48.959574

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '79b86ee749f4'
down_revision = ('d6ed06880539', 'ddf2e30ec87c')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
