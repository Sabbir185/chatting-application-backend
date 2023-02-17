import {model, Schema} from 'mongoose'
import paginate from "mongoose-paginate-v2";
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

let schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
    isAdmin: { type: Boolean, required: true, default: false },
    role: {
        type: String,
        enum: ['user', 'admin'],
    },

}, {timestamps: true})


schema.plugin(paginate)
schema.plugin(aggregatePaginate)
const User = model('user', schema)

export default User