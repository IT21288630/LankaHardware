package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.User;
import service.IRegisterWithEmailOTPService;
import service.IUserService;

public class RegisterServlet extends HttpServlet {
    
    private IRegisterWithEmailOTPService registerService;

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
