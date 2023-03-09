package service;

import model.User;

public class RegisterWithEmailOTPServiceImpl implements IRegisterWithEmailOTPService {

    private IUserService userDao;
    private IEmailService emailService;

    public RegisterWithEmailOTPServiceImpl(IUserService iuserservice, IEmailService emailService) {
        this.userDao = userDao;
        this.emailService = emailService;
    }

    @Override
    public boolean registerUser(String name, String email, String password) {
        // check if user already exists
        if (userDao.getUserByEmail(email) != null) {
            return false;
        }
        
        // generate random OTP
        String otp = generateOTP();
        
        // save user to database
        User user = new User(name, email, password);
        userDao.saveUser(user);
        
        // send OTP to user's email
        emailService.sendEmail(email, "OTP for registration", "Your OTP is: " + otp);
        
        return true;
    }

    @Override
    public boolean sendOTP(String email) {
        // check if user exists
        User user = I.getUserByEmail(email);
        if (user == null) {
            return false;
        }
        
        // generate random OTP
        String otp = generateOTP();
        
        // send OTP to user's email
        emailService.sendEmail(email, "OTP for login", "Your OTP is: " + otp);
        
        return true;
    }

    @Override
    public boolean verifyOTP(String email, String otp) {
        // check if user exists
        User user = userDao.getUserByEmail(email);
        if (user == null) {
            return false;
        }
        
        // check if OTP is valid
        if (otp.equals(user.getOtp())) {
            user.setOtp(null); // clear OTP
            userDao.updateUser(user); // update user in database
            return true;
        }
        
        return false;
    }

    private String generateOTP() {
        // generate 6-digit random OTP
        return String.format("%06d", new Random().nextInt(999999));
    }

}
