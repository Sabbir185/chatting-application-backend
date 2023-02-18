import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

const decodeToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1]
        res.locals.user = jwt.verify(token, secret);
        next()
    } catch (err) {
        next()
    }
}
export default decodeToken


export const havePermission = (permission, roles) => {
    for (let role of roles || []) {
        if (role.permissions.includes(permission)) {
            return true
        }
    }
    return false
}