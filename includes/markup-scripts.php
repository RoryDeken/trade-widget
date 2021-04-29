<?php
/*
Scripts

 */

?>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" language="JavaScript"></script>
  <script type="text/javascript" src="<?php echo plugins_url( 'assets/perfect_trade.js', dirname(__FILE__))?>" language="JavaScript"></script>
  <script>
    PerfectTrade();
    /*
var loc = location.href;
    if (loc.indexOf("?") < 0) {
      window.location.href = loc + "?mode=2";
    }
*/
mode = 2;
  </script>
<?php
if($a['alert'] == 'tertiary'){
?>
<script>
DrawHistory();
</script>
<?php
}?>
