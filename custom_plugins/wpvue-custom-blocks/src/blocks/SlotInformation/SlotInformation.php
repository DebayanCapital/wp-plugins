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
class SlotInformation extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'slot-information';

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
				'block_id'=> $this->get_schema_string(),
		        'title'=> $this->get_schema_string(),
		        'imgID'=> $this->get_schema_string(),
		        'software'=> $this->get_schema_string(),
		        'released'=> $this->get_schema_string(),
		        'rtp'=> $this->get_schema_string(),
		        'volatility'=> $this->get_schema_string(),
		        'max_win'=> $this->get_schema_string(),
		        'min_max_bet'=> $this->get_schema_string(),
		        'layout'=> $this->get_schema_string(),
		        'lines'=> $this->get_schema_string(),
		        'mobile_compatible'=> $this->get_schema_string(),
		        'content'=> $this->get_schema_string(),
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

		$image_url = wp_get_attachment_url($attributes['imgID']);

		$filteredData['block_id'] = $attributes['block_id'];
		$filteredData['title'] = $attributes['title'];
		$filteredData['image_url'] = $image_url;
		$filteredData['software'] = $attributes['software'];
		$filteredData['released'] = $attributes['released'];
		$filteredData['rtp'] = $attributes['rtp'];
		$filteredData['volatility'] = $attributes['volatility'];
		$filteredData['max_win'] = $attributes['max_win'];
		$filteredData['min_max_bet'] = $attributes['min_max_bet'];
		$filteredData['layout'] = $attributes['layout'];
		$filteredData['lines'] = $attributes['lines'];
		$filteredData['mobile_compatible'] = $attributes['mobile_compatible'];
		$filteredData['content'] = $attributes['content'];


		return $filteredData;
	}
}
