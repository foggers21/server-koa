const CustomStrategy = { Strategy } = require('passport-custom');
const { findUser } = require('../../utils/dataBaseUtils');
const bcrypt = require('bcryptjs');
const User = require('../../models/user.model');

module.exports =  new CustomStrategy(async (ctx, done) => {
  console.log('Email Strategy: ', ctx.body);

  try {
    // Test whether is a login using email and password
    if (ctx.body.email && ctx.body.password) {
      const user = await User.findOne({ email: ctx.body.email.toLowerCase() });
      if (!user) {
        done(null, false);
      }else if(user && bcrypt.compareSync(ctx.body.password, user.password)){

      done(null, user);
      }else{
        done(null,false);
      }
      // TODO - check password
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error);
  }
});
