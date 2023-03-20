package servlet;

import java.io.IOException;
import java.io.PrintWriter;
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


@WebServlet("/AddEmployeeServlet")
@MultipartConfig(fileSizeThreshold = 1024 * 1024 * 1, // 1 MB
maxFileSize = 1024 * 1024 * 10, // 10 MB
maxRequestSize = 1024 * 1024 * 100 // 100 MB
)
public class AddStoreItemsServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

    public AddStoreItemsServlet() {
        super();
        
    }

	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		doGet(request, response);
		
		Item item = new Item();
		
		item.setName(request.getParameter("stockName"));
		item.setType(request.getParameter("stockCat"));
		item.setBrand(request.getParameter("stockBrand"));
		item.setPrice(Double.parseDouble(request.getParameter("stockPrice")));
		item.setQuantity(Integer.parseInt(request.getParameter("stockQ")));
		item.setDescription(request.getParameter("stockDes"));
		item.setMfDate(request.getParameter("stockMf"));
		item.setExpDate(request.getParameter("stockExp"));
		item.setWarranty(request.getParameter("warrenty-number"+ " " + "warPeriod"));
		
		
		Collection<Part> parts = request.getParts();
		
		IStockService iStockService = new IStockServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(iStockService.addStockItems(item, parts ));

		out.print(resp);
	}

}
