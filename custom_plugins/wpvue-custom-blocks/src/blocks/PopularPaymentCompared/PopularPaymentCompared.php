<?php
/**
 * Casino Payment options compared block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * PopularPaymentCompared class.
 */
class PopularPaymentCompared extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'popular-payment-compared';

	/**
	 * Initiate class.
	 *
	 * @return Block Object
	 */
	public function __construct() {
		//parent::__construct();
	}

	/** 
	 * Get block attributes.
	 *
	 * @return array 
	 */
	protected function get_attributes() {
		return array_merge(
			parent::get_attributes(),
			array(
		        'section_title' => $this->get_schema_string(),
		        'block_id' => $this->get_schema_string(),
		        'payments'=> $this->get_schema_string(),
		        'values'=> $this->get_schema_string(),
			)
		);
	}

	/**
	 * Render the block.
	 *
	 * @param array  $attributes Block attributes. Default empty array.
	 * @param string $content    Block content. Default empty string.
	 * @return string Rendered block type output.
	 */
	public function render( $attributes = array(), $content = '' ) {
		return '';
	}

	/**
	 * Render filtered Content for REST.
	 *
	 * @param string $content    Block content. Default empty string.
	 * @param array  $block Block array. Default empty array.
	 * @return array FilteredContent block type output.
	 */
	public function render_filtered_content( $content, $block ) {
		//global $wpdb;
		//$resource_id = 0;
        if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;
		$attributes = $block['attrs'];

	    $payment_arr = $attributes['values'];
	    $selected_id = array();
	    if(!empty($payment_arr)){
	        foreach ($payment_arr as $key => $payment_val){
	            $selected_id[$key] = $payment_val['value'];
	        }
	    }        
        $args = array('post_type' => 'payments', 'post_status' => 'publish', 'post__in'=>$selected_id, 'orderby'=>'post__in');

		$payment_posts = get_posts( $args );

        $payment_arr = $atts['values'];
	    $selected_id = array();

	    if(!empty($payment_arr)){
	        foreach ($payment_arr as $key => $payment){
	            $selected_id[$key] = $payment['value'];
	        }
	    }
        $filteredData = array();
		$filteredData['sec_title'] = $attributes['section_title'];
		$filteredData['block_id'] = $attributes['block_id'];
		$payment_array = array();
	    if( $payment_posts ) {
			foreach( $payment_posts as $key => $payment ) {
				$payment_array[$key]['title'] = $payment->post_title;
				$payment_array[$key]['link'] = $payment->post_name;
				$payment_array[$key]['type'] = $payment->post_type;
				$payment_array[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $payment ) , 'full' );
				$payment_array[$key]['deposit_limit'] = get_field('monthly_deposit_limit', $payment->ID );
				$payment_array[$key]['withdrawal_limit'] = get_field('monthly_withdrawal_limit', $payment->ID );
				$payment_array[$key]['deposit_speed'] = get_field('deposit_typical_speeds', $payment->ID );
				$payment_array[$key]['withdrawal_speed'] = get_field('withdrawal_typical_speeds', $payment->ID );
				$payment_array[$key]['extra_features'] = get_field('extra_features', $payment->ID );
			}
		}
		$filteredData['payment_options'] = $payment_array;
		return $filteredData;
	}
}
