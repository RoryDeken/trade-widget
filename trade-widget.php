<?php
/*
* Plugin Name: Trade Widget
* Description: Adds a trade alert widget wherever the shortcode is called. Drop [trade-alert] into any page, post or template with the optional attribute alert="primary" or alert="secondary" to pick which chart to display.
* Version: 1.0.0
* Author: DekenDesign
* Author URI: https://dekendesign.com
* License: This is proprietary software
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

add_filter('widget_text', 'do_shortcode');
add_shortcode('trade-alert', 'trade_alert_run');
function trade_alert_run($options){
  $a = shortcode_atts( array(
        'alert' => 'both',
    ), $options );


    include('includes/markup-styles.php');
    include('includes/markup-begin.php');

if($a['alert'] == 'primary'){

    include('includes/markup-primary.php');

	}elseif($a['alert'] == 'secondary'){

    include('includes/markup-secondary.php');
  }
  else {
	echo '<style>table.data {width:48%;float:left;margin-left:0.5%;} </style>';
    include('includes/markup-primary.php');
    include('includes/markup-secondary.php');
  }
    include('includes/markup-end.php');
    include('includes/markup-scripts.php');

  }


add_shortcode('trade-history', 'trade_alert_history');
function trade_alert_history(){

include('includes/markup-history.php');


}
