from messenger_backend.models import Message

async_mode = None

import os

import socketio
from online_users import online_users

basedir = os.path.dirname(os.path.realpath(__file__))
sio = socketio.Server(async_mode=async_mode, logger=False, cors_allowed_origins='*')
thread = None


@sio.event
def connect(sid, environ):
    sio.emit("my_response", {"data": "Connected", "count": 0}, room=sid)


@sio.on("go-online")
def go_online(sid, user_id):
    if user_id not in online_users:
        online_users.append(user_id)
    sio.emit("add-online-user", user_id, skip_sid=sid)


@sio.on("new-message")
def new_message(sid, message):
    sio.emit(
        "new-message",
        {"message": message["message"], "sender": message["sender"]},
        skip_sid=sid,
    )


@sio.on("message-read")
def message_read(sid, payload):
    messages = Message.objects.filter(conversation_id=payload["conversationId"])
    for message in messages:
        message.read = True
        message.save()
    # notify the sender that the message has been read
    sio.emit(
        "notify-message-read",
        {"userId": payload["senderId"]},
        skip_sid=sid
    )


@sio.on("logout")
def logout(sid, user_id):
    if user_id in online_users:
        online_users.remove(user_id)
    sio.emit("remove-offline-user", user_id, skip_sid=sid)
