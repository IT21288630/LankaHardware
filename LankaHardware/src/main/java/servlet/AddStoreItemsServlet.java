package servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

import com.google.gson.Gson;

import model.Item;
import service.IStockService;
import service.IStockServiceImpl;


@WebServlet("/AddStoreItemsServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 1, // 1 MB
maxFileSize = 1024 * 1024 * 10, // 10 MB
maxRequestSize = 1024 * 1024 * 100 // 100 MB
)
public class AddStoreItemsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String name = request.getParameter("stockName");
		String cat = request.getParameter("stockCat");
		String brand = request.getParameter("stockBrand");
		double price = Double.parseDouble(request.getParameter("stockPrice"));
		int quantity = Integer.parseInt(request.getParameter("stockQ"));
		String des = request.getParameter("stockDes");
		String mf = request.getParameter("stockMf");
		String exp = request.getParameter("stockExp");
		String warrentyType = request.getParameter("warrentyType");
		String warenty_number = request.getParameter("warrenty-number");
		String warPeriod = request.getParameter("warPeriod");
		
		
		
		// Validate the input fields further if needed
	    if (!isValidName(name)) {
	      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Item Name.");
	    }
	    
	    if (!isValidBrand(brand)) {
		      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Brand Name.");
		   
		    }
	    if (!isValidPrice(price)) {
		      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Price.");
		
		    }
	    
	    if (!isValidQuantity(quantity)) {
		      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Quantity.");
		   
		    }
	    if (!isValidMf(mf)) {
		      response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Modify date.");
		   
		    }
	    
	    
		doGet(request, response);
		
		Item item = new Item();
		
		item.setItemID(request.getParameter("stockID"));
		item.setName(request.getParameter("stockName"));
		item.setType(request.getParameter("stockCat"));
		item.setBrand(request.getParameter("stockBrand"));
		item.setPrice(Double.parseDouble(request.getParameter("stockPrice")));
		item.setQuantity(Integer.parseInt(request.getParameter("stockQ")));
		item.setDescription(request.getParameter("stockDes"));
		item.setMfDate(request.getParameter("stockMf"));
		item.setExpDate(request.getParameter("stockExp"));
		item.setWarrentyType(request.getParameter("warrentyType"));
		item.setWarrentyNumber(Integer.parseInt(request.getParameter("warNum")));
		item.setWarrantyPeriod(request.getParameter("warPeriod"));
		
		
		Collection<Part> parts = request.getParts();
		
		IStockService iStockService = new IStockServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("Data saved successfully.");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(iStockService.addStockItems(item, parts ));

		out.print(resp);
	}






	private boolean isValidMf(String mf) {
		int CurrentYear = Calendar.getInstance().get(Calendar.YEAR);
		int CurrentMonth = Calendar.getInstance().get(Calendar.MONTH);
		String curr = "" + CurrentYear + CurrentMonth;
		
		int year = Integer.parseInt(mf.substring(0, 3));
		int month = Integer.parseInt(mf.substring(5, 6));
		String user = ""+ year + month;
		
		
		return Integer.parseInt(curr) > Integer.parseInt(user);
		
		
	}


	private boolean isValidQuantity(int quantity) {
		// TODO Auto-generated method stub
		return quantity > 0;
	}


	private boolean isValidPrice(double price) {
		// TODO Auto-generated method stub
		return price > 0 && price < 10000000;
	}


	private boolean isValidName(String name) {
		// TODO Auto-generated method stub
		return name != null && !name.isEmpty() && name.length() <= 1;
	}

	private boolean isValidBrand(String brand) {
		// TODO Auto-generated method stub
		return brand != null && !brand.isEmpty() && brand.length() <= 1;
	}
	
	
	
}
