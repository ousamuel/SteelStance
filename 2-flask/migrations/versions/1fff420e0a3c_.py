"""empty message

Revision ID: 1fff420e0a3c
Revises: 7080dc5c25c5
Create Date: 2023-09-18 18:32:08.599016

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1fff420e0a3c'
down_revision = '7080dc5c25c5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('days', sa.String(), nullable=True))
        batch_op.drop_column('date')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('programs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date', sa.VARCHAR(), nullable=True))
        batch_op.drop_column('days')

    # ### end Alembic commands ###
