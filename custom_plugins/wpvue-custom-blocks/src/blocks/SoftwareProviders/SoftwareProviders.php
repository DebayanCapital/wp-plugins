<?php
/**
 * Casino Free Games List block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * FreeGamesList class.
 */
class SoftwareProviders extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'casino-software-list';

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
		        'button_text'=> $this->get_schema_string(),
		        'load_more_qty'=> $this->get_schema_number(),
		        'load_more_text'=> $this->get_schema_string(),
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
		$filteredData = array();
		$qty = $attributes['qty'];
		$filteredData['title'] = $attributes['title'];
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['content'] = $attributes['content'];
		$filteredData['qty'] = $attributes['qty'];
		$filteredData['group_id'] = $attributes['group_id'];
		$filteredData['show_load_more'] = $attributes['show_load_more'];
		$filteredData['load_more_qty'] = $attributes['load_more_qty'];
		$filteredData['load_more_text'] = $attributes['load_more_text'];
		$group_id = $attributes['group_id'];

        $args = array(
          'post_type' => 'casino-software',
          'posts_per_page' => (!empty($qty)) ? $qty : 3,
          'post_status' => 'publish',
        );

		$software_posts = get_posts( $args );

		$softwares_array = array();
		if( $software_posts ) {
			foreach( $software_posts as $key => $each_post) {
				$swid = get_field('software_id', $each_post->ID);
				$software_assets = json_decode(do_shortcode("[cas-software-provider-by-group-id id='$group_id' swid='$swid' pqty='8' asset-category-name='product_logo_400x400' return='json']"));
				$softwares_array[$key]['title'] = ($software_assets[0]->sw_name != '') ? ($software_assets[0]->sw_name.' Casinos') : ($each_post->post_title);
				$softwares_array[$key]['description'] = ($software_assets[0]->sw_overview != '') ? ($software_assets[0]->sw_overview) : ('No Description Found!');
				$softwares_array[$key]['post_id'] = $each_post->ID;
				$softwares_array[$key]['link'] = post_permalink($each_post->ID);
				$softwares_array[$key]['slug'] = $each_post->post_name;
				$softwares_array[$key]['type'] = $each_post->post_type;
				$softwares_array[$key]['image'] = ($software_assets[0]->swa_url != '') ? ($software_assets[0]->swa_url) : (wp_get_attachment_url( get_post_thumbnail_id( $each_post ) , 'full' ));
              	$partner_assets = json_decode(do_shortcode("[cas-toplist-group id='$group_id' softwareprovider-id='$swid' return='json']"));
              	$softwares_array[$key]['partner_assets'] = $partner_assets;
			}
		}
		wp_reset_postdata();

		$filteredData['software_lists'] = $softwares_array;

		return $filteredData;
	}
}
