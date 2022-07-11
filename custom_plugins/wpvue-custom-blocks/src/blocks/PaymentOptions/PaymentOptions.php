<?php
/**
 * Casino Free payments List block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * FreepaymentsList class.
 */
class PaymentOptions extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'casino-payment-options';

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
		        'title'=> $this->get_schema_string(),
		        'block_id'=> $this->get_schema_string(),
		        'content'=> $this->get_schema_string(),
		        'imgID'=> $this->get_schema_number(),
		        'qty'=> $this->get_schema_number(),
		        'group_id'=> $this->get_schema_number(),
		        'show_load_more'=> $this->get_schema_boolean(),
		        'load_more_qty'=> $this->get_schema_number(),
		        'load_more_text'=> $this->get_schema_string(),
		        'style'=> $this->get_schema_string(),
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
		$qty = $attributes['qty'];
		$group_id = $attributes['group_id'];
		$filteredData = array();
		$category_list = array();
		// $payments = array();
 		
		$filteredData['title'] = $attributes['title'];
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['content'] = $attributes['content'];
		$filteredData['img_url'] = wp_get_attachment_url($attributes['imgID']);
		$filteredData['qty'] = $attributes['qty'];
		$filteredData['group_id'] = $attributes['group_id'];
		$filteredData['show_load_more'] = $attributes['show_load_more'];
		$filteredData['load_more_qty'] = $attributes['load_more_qty'];
		$filteredData['load_more_text'] = $attributes['load_more_text'];
		$filteredData['style'] = $attributes['style'];

		$payment_categories = get_terms(array(
	        'taxonomy' => 'payment_category',
	        'hide_empty' => FALSE,
	        'parent' => 0
	    )); 

		foreach($payment_categories as $key => $payment_category) {
			$category_list[$payment_category->term_id]['cat_name'] = $payment_category->name;
			$category_list[$payment_category->term_id]['cat_desc'] = $payment_category->description;
	        $args = array(
                'post_type' => 'payments',
                'posts_per_page' => (!empty($qty)) ? $qty : -1,
                'post_status' => 'publish',
                'tax_query' => array(
                    array(
                        'taxonomy' => 'payment_category',
                        'field' => 'term_id',
                        'terms' => array($payment_category->term_id)
                    )
                ) 
            );
			$payment_posts = get_posts( $args );

			$payments_array = array();
			if( $payment_posts ) {
				foreach( $payment_posts as $key => $each_post) {
					$pid = get_field('payment_id', $each_post->ID);
					$payment_assets = json_decode(do_shortcode("[cas-payment-options-meta poid='$pid' toplistgroup='$group_id' return='json']"));
					$partner_assets = json_decode(do_shortcode("[cas-toplist-group id='$group_id' paymentmethod-id='$pid' return='json']"));

					$payments_array[$key]['p_id'] = get_field('payment_id', $each_post->ID);
					$payments_array[$key]['title'] = ($payment_assets->name != '') ? ($payment_assets->name.' Casinos') : ($each_post->post_title);
					$payments_array[$key]['content'] = ($payment_assets->overview != '') ? ($payment_assets->overview) : ('No Description Found!');
					$payments_array[$key]['post_id'] = $each_post->ID;
					$payments_array[$key]['link'] = post_permalink($each_post->ID);
					$payments_array[$key]['slug'] = $each_post->post_name;
					$payments_array[$key]['type'] = $each_post->post_type;
					$payments_array[$key]['image'] = ($payment_assets->url != '') ? ($payment_assets->url) : (wp_get_attachment_url( get_post_thumbnail_id( $each_post ) , 'full' ));
					$payments_array[$key]['partner_assets'] = $partner_assets;
				}
			}
			wp_reset_postdata();

			$category_list[$payment_category->term_id]['post_data'] = $payments_array;
			$filteredData['payments_list'] = $category_list;
		}

		return $filteredData;
	}
}
