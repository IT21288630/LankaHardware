package service;

public interface IRegisterWithEmailOTPService {
    public boolean registerUser(String name, String email, String password);
    public boolean sendOTP(String email);
    public boolean verifyOTP(String email, String otp);
}


