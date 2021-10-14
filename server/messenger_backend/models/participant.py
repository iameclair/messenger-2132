from django.db import models

from . import utils, Conversation
from .user import User


# Participant this represent a user taking part into a conversation
class Participant(utils.CustomModel):
    # participant id correspond to a userid
    user = models.ForeignKey(
        User, on_delete=models.CASCADE,
        db_column="participantId",
        related_name="+"
    )
    # conversation id the id of a conversation in which the user is a participant
    # This is a one to many bidirectional relationship between conversation and participant
    conversation = models.ForeignKey(
        Conversation,
        on_delete=models.CASCADE,
        db_column="conversationId",
        related_name="participants",
        related_query_name="participant"
    )
    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)
