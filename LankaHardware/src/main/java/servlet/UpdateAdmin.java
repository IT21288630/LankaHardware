package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import service.AdminServiceImpl;
import service.EmployeeServiceImpl;
import service.IAdminService;
import service.IEmployeeService;

/**
 * Servlet implementation class UpdateAdmin
 */
@WebServlet("/UpdateAdmin")
public class UpdateAdmin extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateAdmin() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		
		String Email = request.getParameter("EmailModal");
		String password = request.getParameter("passwordModal");
		String phone = request.getParameter("phoneModal");
		String name = request.getParameter("nameModal");
		String Address = request.getParameter("AddressNumModal");
		String Role = request.getParameter("RoleModal");
		
		
        System.out.println(Email+password+phone+name+Address+Role);
		
		/**Collection<Part> parts = request.getParts();*/
		
		IAdminService IAdminService = new AdminServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(IAdminService.updateAdmins(Email,password,phone,name,Address,Role));

		out.print(resp);
	}

}
