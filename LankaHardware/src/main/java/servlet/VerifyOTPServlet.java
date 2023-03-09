package servlet;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.IRegisterWithEmailOTPService;

public class VerifyOTPServlet extends HttpServlet {

    private IRegisterWithEmailOTPService registerService;

    public void init() {
        EmailService emailService = new EmailService();
        OTPService otpService = new OTPService();
        UserDao userDao = new UserDaoImpl();
        registerService = new RegisterWithEmailOTPServiceImpl(emailService, otpService, userDao);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String otp = request.getParameter("otp");

        boolean verified = registerService.verifyOTP(email, otp);
        if (verified) {
            response.sendRedirect("profile.jsp");
        } else {
            request.getRequestDispatcher("/otp.jsp").forward(request, response);
        }
    }
}
