package servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Checkout;
import model.Orderreal;
import service.CheckoutServiceImpl;
import service.ICheckoutService;

/**
 * Servlet implementation class CheckoutServlet
 */
@WebServlet("/CheckoutServlet")
public class CheckoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public CheckoutServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);

		Orderreal orderreal = new Orderreal();
		ICheckoutService iCheckoutService = new CheckoutServiceImpl();

		orderreal.setName(request.getParameter("fname") +" "+ request.getParameter("lname"));
		orderreal.setEmail(request.getParameter("email"));
		orderreal.setPhone(request.getParameter("phone"));
		orderreal.setAddress(request.getParameter("address"));
		
		iCheckoutService.checkout(orderreal);
	}

}
