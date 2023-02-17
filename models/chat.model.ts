import { model, Schema } from 'mongoose'

let schema = new Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    groupAdmin: { type: Boolean, default: false }
}, { timestamps: true })

const Chat = model('chat', schema)
export default Chat