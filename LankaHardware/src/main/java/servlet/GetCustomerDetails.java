package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;

import model.Customer;
import service.AdminServiceImpl;
import service.CustomerServiceImpl;
import service.IAdminService;
import service.ICustomerService;

/**
 * Servlet implementation class GetCustomerDetails
 */
@WebServlet("/GetCustomerDetails")
public class GetCustomerDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetCustomerDetails() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		 HttpSession session = request.getSession();
	        String email = (String) session.getAttribute("email");
	        
	        if (email != null) {
	            ICustomerService customerService = new CustomerServiceImpl();
	            Customer customerProfile = customerService.customerProfile(email);

	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            PrintWriter out = response.getWriter();
	            String resp = new Gson().toJson(customerProfile);
	            out.print(resp);
	        } else {
	            // Handle case when email is not available in the session
	            // Redirect to login page or show an error message
	            response.sendRedirect("Login.jsp?error=1");
	        }
	    }
	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}