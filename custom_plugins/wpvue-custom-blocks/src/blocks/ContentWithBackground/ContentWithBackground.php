<?php
/**
 * ContentWithBackground block.
 *
 * @package WPVue/Blocks
 */

defined( 'ABSPATH' ) || exit;

/**
 * ContentWithBackground class.
 */
class ContentWithBackground extends AbstractBlock {

	/**
	 * Block name.
	 *
	 * @var string
	 */
	protected $block_name = 'content-with-background';

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
                'title'    	=> $this->get_schema_string(),
                'subTitle'=> $this->get_schema_string(),
                'block_id' => $this->get_schema_string(),
				'content'=> $this->get_schema_string(),
				'imgID'=> $this->get_schema_string(),
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
		global $wpdb;
		$resource_id = 0;
        if( $block['blockName'] !== $this->namespace . '/' . $this->block_name ) return $content;
		if(!isset($block['attrs']['style']) || empty($block['attrs']['style'])){
			$block['attrs']['style'] = 'background';
		}
		$attributes = $block['attrs'];
		$image_url = wp_get_attachment_url($attributes['imgID']);
		$attributes['image_url'] = $image_url;
		$attributes['content'] = shortcodeReplacement($block['attrs']['content']);
		return $attributes;
	}
	function shortcodeReplacement($rawData){
		$count_matches = array();
		//$filter_content = $rawData;
		preg_match_all("/\\[(.*?)\\]/", $rawData, $matches); 
		$count_matches = $matches[0];
		if(count($count_matches)>0){
			for($j=0;$j<count($count_matches);$j++){
				$shortCodeData = do_shortcode($count_matches[$j]);
				if(!empty($shortCodeData)){
					$filter_content = str_replace($count_matches[$j], $shortCodeData, $rawData);
				}
			}
		}else{
			$filter_content = $rawData;
		}
		return $filter_content;
	}
}
