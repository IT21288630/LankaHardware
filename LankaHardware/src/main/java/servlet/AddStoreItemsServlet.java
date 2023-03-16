package servlet;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Item;
import service.IStockService;
import service.IStockServiceImpl;

@WebServlet("/insertStore")
public class AddStoreItemsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
		
		Item item = new Item();
		
		
		 String Warranty = request.getParameter("warrenty");
		 
		 item.setName(request.getParameter(""));
		 item.setBrand(request.getParameter(""));
		 item.setType(request.getParameter(""));
		 item.setPrice(request.getParameter(""));
		 item.setDescription(request.getParameter(""));
		 item.setMfDate(request.getParameter(""));
		 item.setExpDate(request.getParameter(""));
		 item.setWarranty(request.getParameter(""));

		 
		 IStockService istock = new IStockServiceImpl(); 
			
	
		 
		 
	}
	
	

}
