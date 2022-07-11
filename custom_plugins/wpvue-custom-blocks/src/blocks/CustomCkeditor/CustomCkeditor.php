<?php
/**
 * CustomCkeditor block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * CustomCkeditor class.
 */
class CustomCkeditor extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'custom-ck-editor';

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
				'content' => $this->get_schema_string(),
                'block_id' => $this->get_schema_string(),
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
		global $wpdb;
		$count_matches = array();
		$resource_id = 0;
        if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;

		$shortcode = $block['attrs']['content'];

		preg_match_all("/\\[(.*?)\\]/", $shortcode, $matches); 
		$count_matches = $matches[0];
		if(count($count_matches)>0){
			for($j=0;$j<count($count_matches);$j++){
				$shortCodeData = do_shortcode($count_matches[$j]);
				if(!empty($shortCodeData)){
					$rawdata = str_replace($count_matches[$j], $shortCodeData, $shortcode);
				}
			}
		}else{
			$rawdata = $shortcode;
		}

		$attributes = $block['attrs'];
		$attributes['shortcode_filtered'] = $rawdata;
		return $attributes;
	}
}
