const User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {

    signup(req, res, next) 
    {   
        // perform the hash
        bcrypt.hash(req.body.password,10)
                .then((hash)=>{
                    const user = new User({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone: req.body.phone,
                        email: req.body.email,
                        password: hash
                    });
                    return user.save()
                })
                .then((createdUser) => {
                        const user = {
                            id: createdUser._id,
                            first_name: createdUser.first_name,
                            last_name: createdUser.last_name,
                            email: createdUser.email,
                            phone: createdUser.phone
                        };
                        const token = jwt.sign(user, "this_is_some_random_salt_for_hash",{expiresIn:'1h'})
                        res.status(200).json({
                            status: 'success',
                            data: {
                                token: token,
                                expiresIn:3600
                            }
                        });
                    })
                    .catch((error) => {
                        res.status(500).json({
                            status: 'failed',
                            errors: error
                        });
                    });
        
    },
    login(req, res, next)
    {
        let resUser;
        User.findOne({email:req.body.email})
            .then((user)=>{
                if (!user) {
                    res.status(401).json({status:'failed',data:{message:'authentication failed'}});
                }
                resUser = user;
                //perform compare password
                return bcrypt.compare(req.body.password, user.password);
            })
            .then((authenticated)=>{
                if (!authenticated) {
                    res.status(401).json({status:'failed',data:{message:'authentication failed'}});
                }
                //build jwt token and retrun data
                 const token = jwt.sign({
                             id: resUser._id,
                             first_name: resUser.first_name,
                             last_name: resUser.last_name,
                             email: resUser.email,
                             phone: resUser.phone
                         }, "this_is_some_random_salt_for_hash", {
                     expiresIn: '1h'
                 });
                 res.status(200).json({
                     status: 'success',
                     data: {
                         token: token,
                         expiresIn: 3600
                     }
                 });
            })
            .catch(()=>{
                res.status(401).json({status:'failed',data:{message:'authentication failed'}});
            });
    },
    update(req, res, next) {

    },
    get(req, res, next) {

    },
    delete(req, res, next) {

    }
};