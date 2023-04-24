package servlet;

import java.io.IOException;
import java.io.PrintWriter;


import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import model.Item;
import service.IStockService;
import service.IStockServiceImpl;


@WebServlet("/AddItemSecondServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 1, // 1 MB
maxFileSize = 1024 * 1024 * 10, // 10 MB
maxRequestSize = 1024 * 1024 * 100 // 100 MB
)
public class AddItemSecondServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	

	public AddItemSecondServlet() {
		super();
		// TODO Auto-generated constructor stub
		System.out.println("Addservlet 2 constructor");
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	   System.out.println("This is addstore servlet");
		doGet(request, response);
			
		Item item = new Item();		
		
		
	
		
		int quantity = Integer.parseInt(request.getParameter("quantity"));
		String warrentyType = request.getParameter("warrentyType");
		int warNum = Integer.parseInt(request.getParameter("warNum"));
		String warPeriod = request.getParameter("warPeriod");
		String size = request.getParameter("size");
		String img = request.getParameter("img");
		double price = Double.parseDouble(request.getParameter("price"));
		
		
		
		
		item.setPrice(price);
		item.setStock(quantity);
		item.setWarrentyType(warrentyType);
		item.setWarrentyNumber(warNum);
		item.setWarrantyPeriod(warPeriod);
		item.setSize(size);
		item.setMainImg(img);

		
		//Collection<Part> parts = request.getParts();
		
		IStockService iStockService = new IStockServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("Data saved successfully.");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(iStockService.addStockItems(item));

		out.print(resp);
		
	}
	
}	
	

