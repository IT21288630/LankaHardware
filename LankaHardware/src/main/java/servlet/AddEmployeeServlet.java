package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;


import service.EmployeeServiceImpl;
import service.IEmployeeService;

/**
 * Servlet implementation class AddEmployeeServlet
 */
@WebServlet("/AddEmployeeServlet")
public class AddEmployeeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddEmployeeServlet() {
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
		
		String empNo = request.getParameter("empNo");
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String designation = request.getParameter("designation");
		String phoneNum = request.getParameter("phoneNum");
		String address = request.getParameter("address");
		String gender = request.getParameter("gender");
		String date = request.getParameter("date");
		String wage = request.getParameter("wage");
		Double salary = Double.parseDouble(request.getParameter("salary")) ;
		IEmployeeService iEmployeeService = new EmployeeServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(iEmployeeService.addEmployees(empNo, name, email, designation,phoneNum,address,gender, date, wage, salary));

		out.print(resp);
	}

}
