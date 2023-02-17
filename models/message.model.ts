import { model, Schema } from 'mongoose'

let schema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    content: { type: String, trim: true },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'chat',
    },
    readBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
}, { timestamps: true })

const Chat = model('chat', schema)
export default Chat