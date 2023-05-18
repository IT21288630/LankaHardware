package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import service.AdminServiceImpl;
import service.IAdminService;

/**
 * Servlet implementation class UpdataAdminProfile
 */
@WebServlet("/UpdataAdminProfile")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 1, // 1 MB
maxFileSize = 1024 * 1024 * 10, // 10 MB
maxRequestSize = 1024 * 1024 * 100 // 100 MB
)
public class UpdataAdminProfile extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdataAdminProfile() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		 HttpSession session = request.getSession(); // Retrieve the current session
		 String email = (String) session.getAttribute("email"); 
	      
		 
		 // Retrieve the email from the session
		 if(email!= null) {
			 String phone = request.getParameter("phone");
		        String name = request.getParameter("name");
		        String Address = request.getParameter("address");

		     
		       
		      
		        IAdminService adminService = new AdminServiceImpl();
		        Collection<Part> parts = request.getParts();
		        
		        System.out.println(phone+name+Address+parts);
		        
		        response.setContentType("application/json");
		        response.setCharacterEncoding("UTF-8");
		        PrintWriter out = response.getWriter();

		        String resp = new Gson().toJson(adminService.AdminUpdate(email, phone, name, Address, parts));

		        out.print(resp);
			 
		 }else {
			// Handle case when email is not available in the session
	            // Redirect to login page or show an error message
	            response.sendRedirect("Login.jsp?error=1");
		 }
	        
	}

}
