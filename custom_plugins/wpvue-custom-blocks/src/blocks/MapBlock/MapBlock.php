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
class MapBlock extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'map-block';

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
				'heading'=> $this->get_schema_string(),
		        'info'=> $this->get_schema_string(),
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
		//$attributes['attrs'] = $block['attrs'];
		$infoArr = array();
        if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;
		for($i=0;$i<count($block['attrs']['info']);$i++){
			$infoArr[$block['attrs']['info'][$i]['state']] = array(
				'index' => $i,
				'state' => $block['attrs']['info'][$i]['state'],
				'url' => $block['attrs']['info'][$i]['url'],
				'state_type' => $block['attrs']['info'][$i]['state_type'],
			);
		}
		$attributes['heading'] = (isset($block['attrs']['heading']) && !empty($block['attrs']['heading']))?$block['attrs']['heading']:"USA Best Online Casino ".date('Y');
		$attributes['states'] = $infoArr;

		return $attributes;
	}
}
