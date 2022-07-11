<?php
/**
 * Casino Sitemap block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * Sitemap class.
 */
class Sitemap extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'casino-sitemap';

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
		        // 'block_id' => $this->get_schema_string(),
		        // 'section_content'=> $this->get_schema_string(),
		        // 'testimonials'=> $this->get_schema_string(),
		        // 'values'=> $this->get_schema_string(),
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
		$filteredData = $block['attrs'];

	 //    $testimonial_arr = $attributes['values'];
	 //    $selected_id = array();
	 //    if(!empty($testimonial_arr)){
	 //        foreach ($testimonial_arr as $key => $testimonial_val){
	 //            $selected_id[$key] = $testimonial_val['value'];
	 //        }
	 //    }        
  //       $args = array('post_type' => 'testimonials', 'post_status' => 'publish', 'post__in'=>$selected_id, 'orderby'=>'post__in');

		// $testimonial_posts = get_posts( $args );

  //       $testimonial_arr = $atts['values'];
	 //    $selected_id = array();

	 //    if(!empty($testimonial_arr)){
	 //        foreach ($testimonial_arr as $key => $testimonial){
	 //            $selected_id[$key] = $testimonial['value'];
	 //        }
	 //    }
  //       $filteredData = array();
		// $filteredData['sec_title'] = $attributes['section_title'];
		// $filteredData['block_id'] = $attributes['block_id'];
		// $filteredData['sec_content'] = $attributes['section_content'];
		// $testimonial_array = array();
	 //    if( $testimonial_posts ) {
		// 	foreach( $testimonial_posts as $key => $post ) {
		// 		$testimonial_array[$key]['title'] = $post->post_title;
		// 		$testimonial_array[$key]['content'] = $post->post_content;
		// 		$testimonial_array[$key]['slug'] = $post->post_name;
		// 		$testimonial_array[$key]['type'] = $post->post_type;
		// 		$testimonial_array[$key]['image'] = wp_get_attachment_url( get_post_thumbnail_id( $post ) , 'full' );
		// 		$testimonial_array[$key]['age'] = get_field('age', $post->ID );
		// 		$testimonial_array[$key]['location'] = get_field('location', $post->ID );
		// 	}
		// }
		$sitemap_shortcode = "[simple_sitemap post_types='page, free_games, casino-review, payments, casino-software, casino-type' output='json']";
		$filteredData['sitemap_data'] = json_decode(do_shortcode($sitemap_shortcode));
		return $filteredData;
	}
}
