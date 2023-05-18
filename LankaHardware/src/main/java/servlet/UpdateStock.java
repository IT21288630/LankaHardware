package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import service.IStockService;
import service.IStockServiceImpl;




@WebServlet("/UpdateStock")
public class UpdateStock extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UpdateStock() {
        super();
        // TODO Auto-generated constructor stub
        System.out.println("this is the constructor updatestock");
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
		
		String id = request.getParameter("itemID");
		String name = request.getParameter("name");
		String cat = request.getParameter("type");
		String Bra = request.getParameter("brand");
		double pr = Double.valueOf(request.getParameter("price"));
		int quan = Integer.parseInt(request.getParameter("quantity"));
		String Des = request.getParameter("description");
		String mf = request.getParameter("mf");
		String exp = request.getParameter("exp");
		

		String wt = "Available";
	
		
		/*if(warrentyNone == "" || warrentyNone == "None" || warrentyNone == null || warrentyNone == "undefined") {
			wt = "None";
			wn = 0;
			wp = "None";
		}*/
		//System.out.println("warrenty Type in update servlet: " + wt);
		
		//System.out.println(id+name+email+designation+phoneNum+address);
		
		IStockService iStockService = new IStockServiceImpl();
		
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		PrintWriter out = response.getWriter();

		String resp = new Gson().toJson(iStockService.updateStockItems(id, name, cat, Bra, pr, quan, Des, mf, exp));

		out.print(resp);
	}

}
