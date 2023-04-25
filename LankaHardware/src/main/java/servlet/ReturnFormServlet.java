package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import service.ReturnFormService;
import model.Return;


@WebServlet("/ReturnFormServlet")
public class ReturnFormServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
    
    private ReturnFormService returnFormService;
	
	public void init() {
		returnFormService = new ReturnFormService();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
		
		RequestDispatcher dispatcher = request.getRequestDispatcher("/webapp/returnform.jsp");
		dispatcher.forward(request, response);
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	    int oID = 0;
	    String name = request.getParameter("name");
	    String reason = request.getParameter("reason");
	    String comment = request.getParameter("comment");
	    double amount = 0.0;
	    String email = request.getParameter("email");

	    // Check that the oID parameter is not null before parsing it
	    String oIDParam = request.getParameter("oID");
	    if (oIDParam != null) {
	        oID = Integer.parseInt(oIDParam);
	    }
	    
	    // Check that the amount parameter is not null before parsing it
	    String amountParam = request.getParameter("amount");
	    if (amountParam != null) {
	        amount = Double.parseDouble(amountParam);
	    }

	    Return employee = new Return(oID, name, reason, comment, amount, email);
	    employee.setoID(oID);
		employee.setName(name);
		employee.setReason(reason);
		employee.setComment(comment);
		employee.setAmount(amount);
		employee.setEmail(email);

	    try {
	        returnFormService.registerEmployee(employee);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }

	    response.sendRedirect("Completedorder.jsp");
	    
	}
	   
	

}
