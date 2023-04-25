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

import model.Order;
import service.ManagerServiveImpl;


@WebServlet("/")
public class OManagerServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	private ManagerServiveImpl managerServiveImpl;
	
	
	public void init() {
		managerServiveImpl = new ManagerServiveImpl();
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
			case "/new":
				showNewForm(request, response);
				break;
			case "/insert":
				insertUser(request, response);
				break;
			case "/delete":
				deleteUser(request, response);
				break;
			case "/edit":
				showEditForm(request, response);
				break;
			case "/update":
				updateUser(request, response);
			case "/com":
				ListUser(request, response);
				break;
			default:
				listUser(request, response);
				break;
			}
		} catch (SQLException ex) {
			throw new ServletException(ex);
		}
	}

	private void listUser(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException, ServletException {
		List<Order> listUser = managerServiveImpl.selectAllUsers();
		request.setAttribute("listUser", listUser);
		RequestDispatcher dispatcher = request.getRequestDispatcher("vieworder.jsp");
		dispatcher.forward(request, response);
	}
	
	private void ListUser(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, IOException, ServletException {
		List<Order> listUser = managerServiveImpl.selectAllUsers();
		request.setAttribute("listUser", listUser);
		RequestDispatcher dispatcher = request.getRequestDispatcher("Completedorder.jsp");
		dispatcher.forward(request, response);
	}


	private void showNewForm(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		RequestDispatcher dispatcher = request.getRequestDispatcher("Addorder.jsp");
		dispatcher.forward(request, response);
	}

	private void showEditForm(HttpServletRequest request, HttpServletResponse response)
			throws SQLException, ServletException, IOException {
		int orderID = Integer.parseInt(request.getParameter("orderID"));
		Order existingUser = managerServiveImpl.selectUser(orderID);
		RequestDispatcher dispatcher = request.getRequestDispatcher("Addorder.jsp");
		request.setAttribute("user", existingUser);
		dispatcher.forward(request, response);

	}

	private void insertUser(HttpServletRequest request, HttpServletResponse response) 
			throws SQLException, IOException {
		String itemID = request.getParameter("itemID");
		String pname = request.getParameter("pname");
		String oDate = request.getParameter("oDate");
		String dDate = request.getParameter("dDate");
		double sPrice = (Double.parseDouble(request.getParameter("sPrice")));
		double tPrice = (Double.parseDouble(request.getParameter("tPrice")));
		String email = request.getParameter("email");
		String orderstatus = request.getParameter("orderstatus");
		Order newUser = new Order(itemID, pname, oDate, dDate, sPrice, tPrice, email, orderstatus);
		managerServiveImpl.insertUser(newUser);
		response.sendRedirect("list");
	}
	

	
	private void updateUser(HttpServletRequest request, HttpServletResponse response) 
			throws SQLException, IOException {
		int orderID = Integer.parseInt(request.getParameter("orderID"));
		String itemID = request.getParameter("itemID");
		String pname = request.getParameter("pname");
		String oDate = request.getParameter("oDate");
		String dDate = request.getParameter("dDate");
		double sPrice = (Double.parseDouble(request.getParameter("sPrice")));
		double tPrice = (Double.parseDouble(request.getParameter("tPrice")));
		String email = request.getParameter("email");
		String orderstatus = request.getParameter("orderstatus");

		Order book = new Order(orderID, itemID, pname, oDate, dDate, sPrice, tPrice, email, orderstatus);
		managerServiveImpl.updateUser(book);
		response.sendRedirect("list");
	}

	private void deleteUser(HttpServletRequest request, HttpServletResponse response) 
			throws SQLException, IOException {
		int orderID = Integer.parseInt(request.getParameter("orderID"));
		managerServiveImpl.deleteUser(orderID);
		response.sendRedirect("list");

	}
	

}
	
