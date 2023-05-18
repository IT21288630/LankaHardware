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
import service.IAdminService;

/**
 * Servlet implementation class UpdataAdminProfile
 */
@WebServlet("/UpdataAdminProfile")
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
		doGet(request, response);
		String Email = request.getParameter("Email");
		String phone = request.getParameter("phone");
		String name = request.getParameter("name");
		String Address = request.getParameter("address");
		
		
		
        System.out.println(phone+name+Address);
		
		/**Collection<Part> parts = request.getParts();*/
        Collection<Part> parts = request.getParts();
		IAdminService IAdminService = new AdminServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(IAdminService.AdminUpdate(Email,phone,name,Address,parts));

		out.print(resp);
	}

}
