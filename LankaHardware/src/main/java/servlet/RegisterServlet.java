package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.User;
import service.IEmailService;
import service.IRegisterWithEmailOTPService;
import service.IUserService;
import service.RegisterWithEmailOTPServiceImpl;

public class RegisterServlet extends HttpServlet {
    
    private IRegisterWithEmailOTPService registerService;

    public void init() {
        IUserService iuserservice = new IUserService(); // create a UserDAO object
        IEmailService iemailService = new IEmailService(); // create an EmailService object
        registerService = new RegisterWithEmailOTPServiceImpl(iuserservice, iemailService); // create a RegisterWithEmailOTPServiceImpl object
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        // show registration form
        RequestDispatcher dispatcher = request.getRequestDispatcher("register.jsp");
        dispatcher.forward(request, response);
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        
        // register user
        boolean success = registerService.registerUser(name, email, password);
        if (success) {
            // show OTP form
            request.setAttribute("email", email);
            RequestDispatcher dispatcher = request.getRequestDispatcher("otp.jsp");
            dispatcher.forward(request, response);
        }
    }
}
