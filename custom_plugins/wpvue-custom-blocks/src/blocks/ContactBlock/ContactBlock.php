<?php
/**
 * Contact block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * ContactBlock class.
 */
class ContactBlock extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'contact-block';

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
		        'address'=> $this->get_schema_string(),
		        'facebook'=> $this->get_schema_string(),
		        'twitter'=> $this->get_schema_string(),
		        'recipients'=> $this->get_schema_string(),
		        'site_key'=> $this->get_schema_string(),
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

		$filteredData['title'] = $attributes['title'];
		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['content'] = $attributes['content'];
		$filteredData['address'] = $attributes['address'];
		$filteredData['facebook'] = $attributes['facebook'];
		$filteredData['twitter'] = $attributes['twitter'];
		$filteredData['recipients'] = $attributes['recipients'];
		$filteredData['site_key'] = $attributes['site_key'];
		wp_reset_postdata();
		return $filteredData;
	}
}
