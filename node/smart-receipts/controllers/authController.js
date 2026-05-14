const authService = require('../services/authService');

exports.register = async (req, res, next) => {
  try{
    const { name, email, password, roleId } = req.body;
  
    const newUser = await authService.registerUser(name, email, password, roleId);
    return res.status(201).json(newUser);

  }catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const loginCredentials = await authService.loginUser(email, password);
    return res.status(200).json(loginCredentials);

  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res,next) => {
  try{
    const { userId } = req.user;
    const accessToken = req.accessToken;

    await authService.logoutUser(userId, accessToken);
    return res.status(201).send();
  }
  catch(error){
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try
  {
    const { refreshToken } = req.body;

    const tokenResponse = await authService.refreshToken(refreshToken);
    return res.status(200).json(tokenResponse);
  }
  catch(error)
  {
    next(error);
  }


};

exports.generate2fa = async (req, res, next) => {
  try
  {
    const { userId } = req.user;
  
    const qrcode = await authService.generate2fa(userId);
    res.setHeader("Content-Disposition", "attachment; filename=qrcode.png");
    return res.status(200).type('image/png').send(qrcode);
  }
  catch(error)
  {
    next(error);
  }
};

exports.validate2fa = async (req, res, next) => {
  try{
    const { totp } = req.body;
    const { userId } = req.user;
  
    await authService.validate2fa(totp, userId);
    return res.status(200).json({message: "OTP validated successfully"});

  }catch(error){
    next(error);
  }
};

exports.login2fa = async (req, res, next) => {
  try
  {
    const { temporaryToken, totp } = req.body;

    const loginCredentials = await authService.login2fa(temporaryToken, totp);
    return res.status(200).json(loginCredentials);
  }
  catch(error)
  {
    next(error);
  }
};

exports.googleCallback = async (req, res, next) => {
  try{
    const user = req.user;

    const loginCredentials = await authService.googleCallback(user);
    res.status(200).json(loginCredentials);
    
  }catch(error){
    next(error);
  }
};