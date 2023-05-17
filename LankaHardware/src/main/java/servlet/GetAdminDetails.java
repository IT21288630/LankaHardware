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

import model.Admin;
import service.AdminServiceImpl;
import service.IAdminService;

/**
 * Servlet implementation class GetAdminDetails
 */
@WebServlet("/GetAdminDetails")
public class GetAdminDetails extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetAdminDetails() {
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
	            IAdminService adminService = new AdminServiceImpl();
	            Admin adminProfile = adminService.adminProfile(email);

	            response.setContentType("application/json");
	            response.setCharacterEncoding("UTF-8");
	            PrintWriter out = response.getWriter();
	            String resp = new Gson().toJson(adminProfile);
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