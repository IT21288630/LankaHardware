package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.Admin;
import model.Employee;
import service.AdminServiceImpl;
import service.EmployeeServiceImpl;
import service.IAdminService;
import service.IEmployeeService;

/**
 * Servlet implementation class GetAllAdmin
 */
@WebServlet("/GetAllAdminsServlet")
public class GetAllAdminsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public GetAllAdminsServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		/**response.getWriter().append("Served at: ").append(request.getContextPath());*/
		ArrayList<Admin>  admins = new ArrayList();
		IAdminService iAdminService = new AdminServiceImpl();
		
		admins = iAdminService.getAllAdmin();

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();
		String resp = new Gson().toJson(admins);
		
		out.print(resp);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
