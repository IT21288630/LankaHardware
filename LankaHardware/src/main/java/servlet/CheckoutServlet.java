package servlet;

import java.io.IOException;


import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.CheckoutService;
import model.Checkout;

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    private CheckoutService checkoutService;
	
	public void init() {
		checkoutService = new CheckoutService();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/webapp/checkout.jsp");
		dispatcher.forward(request, response);
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String Name = request.getParameter("Name");
		String email = request.getParameter("email");
		String state = request.getParameter("state");
		String address = request.getParameter("address");
		String phone = request.getParameter("phone");
		String city = request.getParameter("city");
		String postcode = request.getParameter("postcode");
		
		Checkout checkout = new Checkout();
		checkout.setName(Name);
		checkout.setEmail(email);
		checkout.setState(state);
		checkout.setAddress(address);
		checkout.setPhone(phone);
		checkout.setCity(city);
		checkout.setPostcode(postcode);
		
		try {
			checkoutService.registerCheckout(checkout);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		response.sendRedirect("checkout.jsp");
	    
	}
}
