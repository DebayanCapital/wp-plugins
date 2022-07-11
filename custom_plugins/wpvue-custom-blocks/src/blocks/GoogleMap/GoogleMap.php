<?php
/**
 * Google Map block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * GoogleMap class.
 */
class GoogleMap extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'google-map';

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
		        'latitude'=> $this->get_schema_string(),
		        'longitude'=> $this->get_schema_string(),
		        'block_id'=> $this->get_schema_string(),
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

		$filteredData['latitude'] = $attributes['latitude'];
		$filteredData['longitude'] = $attributes['longitude'];
		$filteredData['block_id'] = $attributes['block_id'];
		wp_reset_postdata();
		return $filteredData;
	}
}
