<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="org.json.simple.JSONObject"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="org.json.simple.JSONArray"%>
<%@page import="java.sql.*" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
 
 
<%
	Connection con;
	PreparedStatement pst;
	ResultSet rs;
	 
	String lastid = request.getParameter("lastinsetid");
	Class.forName("com.mysql.jdbc.Driver");
	con = DriverManager.getConnection("jdbc:mysql://localhost/lanka_hardware","root","1234");
	pst = con.prepareStatement("select i.id, i.name, i.category, i.brand, i.unit_price, i.quantity, i.description, i.mf_date, i.exp_date, i.warrentyType, i.warrentyNum, i.warrentyPeriod, s.size from item i, item_size s, product prod where i.id = s.id and i.id =?");
	pst.setString(1, lastid);
	rs = pst.executeQuery();
	 
 
if(rs.next()== true)                                  
{
    String id = rs.getString(1);
    String subtotal = rs.getString(2);
    String pay = rs.getString(3);
    String bal = rs.getString(4);
    String price = rs.getString(5);
    String qty = rs.getString(6);
    String total = rs.getString(7);
    String pid = rs.getString(8);
    String pname = rs.getString(9);
    
%>
 
    <html>
    <head>
        <title></title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
 
 
        <style>
            @media print
            {
                .button
                {
                    display: none;
                }
            }
 
            @media print
            {
                @page {
                    margin-top: 0;
                    margin-bottom: 0;
                }
                body  {
                    padding-top: 72px;
                    padding-bottom: 72px ;
                }
            }
 
        </style>
 
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
 
 
    </head>
    <body style='background: #f9f9f9'>
 
 
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <div class='print' style="border: 0px solid #a1a1a1; font-family:monospace; font-size: 14px; width: 88mm; background: white; padding: 10px; margin: 0 auto; text-align: center; ">
                    <div class="invoice-title" align="center">
                        <h3>              
                            <img src="image/tit1.jpg" width="200px" height="100px" alt=""/></h3>
                    </div>
 
                    <div class="invoice-title" align="left">
                        Order #  &nbsp; &nbsp;<b> <%=id %></b>
                    </div>
                    <div class="invoice-title" align="left">
                        Date #  &nbsp; &nbsp;  <b>  
                        <%java.text.DateFormat df = new java.text.SimpleDateFormat("dd/MM/yyyy"); %>
                       <%= df.format(new java.util.Date()) %>
                        </b>
                    </div>
 
                    
                  
                    <br>
 
                    <div>
                        <div>
                            <table class="table table-condensed">
                            <thead>
                                <tr>
                                    <td class="text-center"><strong>No</strong></td>
                                    <td class="text-center"><strong>Pname</strong></td>
                                    <td class="text-center"><strong>Qty</strong></td>
                                    <td class="text-center"><strong>Price</strong></td>
                                    <td class="text-right"><strong>Total</strong></td>
                                </tr>
                              
                                
                                
                                
                                <%      
                                    Class.forName("com.mysql.jdbc.Driver");
                                    con = DriverManager.getConnection("jdbc:mysql://localhost/jsppos","root","");
 
                                    pst = con.prepareStatement("select sales.id,sales.subtotal,sales.pay,sales.bal, salesp.price,salesp.qty,salesp.total, prod.barcode,prod.prodname from sales_product salesp, sales sales, product prod where sales.id = salesp.sales_id and salesp.prod_id = prod.barcode and salesp.sales_id =?");
                                    pst.setString(1, lastid);
                                    rs = pst.executeQuery();
                                     int x = 1;
                                     while(rs.next())
                                     {
                                 %>
                
                                    <tr>
                                        <td class="text-center">
                                             <%= x %>
                                        </td >
                                        
                                        <td class="text-center">
                                           <%=rs.getString("prod.prodname") %>
                                        </td >
                                        <td class="text-center">
                                             <%=rs.getString("salesp.qty") %>
                                            
                                        </td >
                                        
                                        <td class="text-center">
                                           <%=rs.getString("salesp.price") %>
                                        </td>
                                    
                                        <td class="text-center">
                                            <%=rs.getString("salesp.total") %>
                                        </td>
                                    </tr>
 
                                <% x= x + 1; %>      
                                <% } %>      
                                    
                            </table>
 
                        </div>
                    </div>
                    <div  align="right">
                        Sub Total &nbsp;&nbsp;<b> <%=subtotal  %></b>
                    </div>
                    <div align="right">
                        Pay  &nbsp;&nbsp; <b> <%=pay  %></b>
                    </div>
                    <div align="right">
                        Due &nbsp;&nbsp;   <b> <%=bal  %></b>
                    </div>
 
                    <div align="center">
                        <i>60 b bank road India</i>
                    </div>
                </div>
           </div>
            <div>
                <div>
                </div>
 
                <center>
 
  
     <script src="component/jquery/jquery.js" type="text/javascript"></script>
        <script src="component/jquery/jquery.min.js" type="text/javascript"></script>
        <script src="component/jquery.validate.min.js" type="text/javascript"></script>
 
    <script>
 
       myFunction();
        window.onafterprint = function(e)
        {
         closePrintView();
        };
        function myFunction()
        {
           window.print();
        }
        function closePrintView()
        {
           window.location.href = 'ViewStock.jsp';
        }
 
    </script>
    
</body>
    </html>
 
 
<% } %>