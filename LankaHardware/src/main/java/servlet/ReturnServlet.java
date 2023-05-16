package servlet;

import java.io.IOException;

import java.sql.SQLException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Return;
import service.ReturnServiceImpl;


@WebServlet("/ReturnServlet")
public class ReturnServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

       
   
	private ReturnServiceImpl returnServiceImpl;
	
	
	public void init() {
		returnServiceImpl = new ReturnServiceImpl();
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String action = request.getServletPath();

		try {
			switch (action) {
			case "/new1":
				showNewForm1(request, response);
				break;
			case "/insert1":
				insertReturn(request, response);
				break;
			
			default:
				listReturn(request, response);
				break;
			}
		} catch (SQLException ex) {
			throw new ServletException(ex);
		}
	}

	private void listReturn(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException, ServletException {
		List<Return> listReturn = returnServiceImpl.selectAllReturn();
		request.setAttribute("listReturn", listReturn);
		RequestDispatcher dispatcher = request.getRequestDispatcher("viewrefund.jsp");
		dispatcher.forward(request, response);
	}
	

	private void showNewForm1(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		RequestDispatcher dispatcher = request.getRequestDispatcher("returnform.jsp");
		dispatcher.forward(request, response);
	}

	private void insertReturn(HttpServletRequest request, HttpServletResponse response) 
			throws SQLException, IOException {
		int oID = (Integer.parseInt(request.getParameter("oID")));
		String name = request.getParameter("name");
		String reason = request.getParameter("reason");
		String comment = request.getParameter("comment");
		double amount = (Double.parseDouble(request.getParameter("amount")));
		String email = request.getParameter("email");
		Return newUser = new Return(oID, name, reason, comment, amount,email);
		returnServiceImpl.insertReturn(newUser);
		response.sendRedirect("list");
	}
	

	


	
	

	
	
}
