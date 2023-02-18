import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import User from "../models/user.model";

const secret = process.env.JWT_SECRET;

// user signup
export const userRegistration = async (req, res, next) => {
    try {
        let { body } = req;
        const exitUser = await User.findOne({ email: body.email });
        if (!!exitUser) {
            return res.status(400).send({
                error: true,
                msg: 'An account with this credential has already existed',
            });
        }

        let hashedPassword: string = '';
        if (!!body.password) {
            hashedPassword = await bcrypt.hash(body.password, 8);
        } else {
            return res.status(400).send({
                error: true,
                msg: 'Password required',
            })
        }

        let user = new User({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role,
            pic: body.pic,
        })
        await user.save();
        let token = jwt.sign({ _id: user?._id }, secret, { expiresIn: '15 days' });
        return res.status(200).send({
            error: false,
            data: {
                token,
                _id: user._id,
                email: user.email,
                pic: user.pic,
            }
        });

    } catch (e) {
        console.log(e)
        if (e?.code === 11000) {
            return res.status(406).send({
                error: true,
                msg: 'An account with this credential has already existed',
            })
        }
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}


// user login
export const userLogin = async (req, res) => {
    try {
        let { body } = req;
        if (body.email && body.password) {
            const email = body.email.trim().toLowerCase()
            const user = await User.findOne({ email });
            if (user) {
                let auth = await bcrypt.compare(body.password, user.password);
                if (auth) {
                    let token = await jwt.sign({ _id: user._id }, secret, { expiresIn: '15d' })
                    return res.status(200).send({
                        error: false,
                        msg: 'Login successful',
                        data: {
                            token,
                            _id: user._id,
                            email: user.email,
                            pic: user.pic,
                        }
                    })

                } else {
                    return res.status(401).send({
                        error: true,
                        msg: 'Invalid credentials'
                    })
                }
            }

            return res.status(404).json({
                error: true,
                msg: 'User not found'
            })
        }

        return res.status(404).json({
            error: true,
            msg: 'Wrong Credentials'
        })

    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}

export const searchUser = async (req, res) => {
    try {
        let { query } = req;
        const { _id } = res.locals.user || {};
        let filter: any = {}
        console.log(_id)

        // @ts-ignore
        let data = await User.aggregate([
            {
                $match: {
                    $expr: { $ne: ["$_id", new mongoose.Types.ObjectId(_id)] }
                }

            },
            ...(!!query.search ? [
                {
                    $match: {
                        $or: [
                            { name: { $regex: new RegExp(query.search.toLowerCase(), "i") } },
                            { email: { $regex: new RegExp(query.search.toLowerCase(), "i") } }
                        ]
                    }
                }
            ] : []),
        ])

        return res.status(200).json({
            error: false,
            data
        })

    } catch (e) {
        return res.status(500).send({
            error: true,
            msg: 'Server failed'
        })
    }
}