module.exports={
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()//若isAuthenticated()為true，則執行下一個步驟
    }
    res.redirect('/users/login')//若isAuthenticated()為false，則跳回login頁
  }
}