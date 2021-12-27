const User = require('../models/user')

module.exports.index = (req, res)=>{
    res.render('landingpage')
}

module.exports.renderRegisterForm = (req,res)=>{
    res.render('user/register')
}

module.exports.registerUser = async(req,res)=>{
    try {
        const {email,username,password} = req.body
        const user = new User({email, username});
        const regUser = await User.register(user,password)
        req.logIn(regUser,err=> {
            if(err) return next(err)
            console.log(req.user);
            req.flash('success','successfully registered');
            res.redirect('/grounds')
        })
    } catch (error) {
        req.flash('error',error.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render('user/login')
}

module.exports.loginUser = async(req,res)=>{
    try{
    const redirectUrl = req.session.returnTo || '/grounds'
    delete req.session.returnTo
    req.flash('success',`welcome back ${req.user.username}`)
    res.redirect(redirectUrl)
    }
    catch(error) {
        req.flash('error',error.message);
        res.redirect('/login')
    }
}

module.exports.logout = (req,res)=>{
    req.flash('success',`succesfully logged out ${req.user.username}`)
    req.logOut()
    res.redirect('/grounds')
}