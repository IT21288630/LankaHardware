package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.PaymentService;
import model.Order;
import model.Payment;

@WebServlet("/PaymentServlet")
public class PaymentServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	 private PaymentService paymentService;
		
		public void init() {
			paymentService = new PaymentService();
		}

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
        response.getWriter().append("Served at: ").append(request.getContextPath());
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/webapp/checkout.jsp");
		dispatcher.forward(request, response);
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String pid = request.getParameter("pid");
		String card_no = request.getParameter("card_no");
		String ccv = request.getParameter("ccv");
		String exp_date = request.getParameter("exp_date");
		String name = request.getParameter("name");
		String type = request.getParameter("type");
		/*String order = request.getParameter("order");*/
		
		Payment payment = new Payment();
		payment.setPid(pid);
		payment.setCard_no(card_no);
		payment.setCcv(ccv);
		payment.setExp_date(exp_date);
		payment.setName(name);
		payment.setType(type);
		
		/*Order order1 = new Order();
		payment.setOrder(order1);*/
		
		try {
			paymentService.registerPayment(payment);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		response.sendRedirect("checkout.jsp");
	    
	
	}

}
