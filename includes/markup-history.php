<?php
/*
Historical Data

 */

?>
  <style>
#sp_history_table > table > tbody > tr > td {
vertical-align:top;
}

#sp_history_table table td {border-bottom:none;}
    #sp_history_table    tr.header {
            color: #FFFFFF;
            background-color: #000099;
        }
  	  	#sp_history_table	table.data td {
      		padding: 1px;
      		border: 1px solid black;
			text-align:center;

        }
       #sp_history_table td.time {
            color: #000000;
            background-color: #FFFFFF;
        }
       #sp_history_table td.trigger_buy {
            color: #000000;
            background-color: green;
        }
      #sp_history_table  td.trigger_sell {
            color: #000000;
            background-color: red;
        }
     #sp_history_table   td {
            padding: 2px;
        }

      #sp_history_table  table.data {
            color: #FFFFFF;
            background-color: #111111;
            padding: 3px;
            border-spacing: 1px;
			width:99%;
        }
    </style>
<!-- BEGIN WIDGET -->
<div style="font-family:Arial, Helvetica, sans-serif; font-size:9pt;">

 <span id="sp_history_table">
   <table>
     <tbody>
       <tr class="table-row">
         <td>




     </td>
       </tr>
     </tbody>
   </table>
 </span>
</div>

  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" language="JavaScript"></script>
  <script type="text/javascript" src="<?php echo plugins_url( 'assets/perfect_trade.js', dirname(__FILE__))?>" language="JavaScript"></script>

<script>
DrawHistory();
</script>
